/// <reference path="../pb_data/types.d.ts" />
//
// Mirrors every new auth user (email/password OR OAuth) into the public
// "profiles" collection with the SAME id so that posts/replies/chat_messages
// FK to profile.id continue to work using the user's token id.
//
// PocketBase JSVM v0.23+ APIs used:
//   onRecordAfterCreateSuccess, $app.findCollectionByNameOrId, new Record, $app.save
//
// NOTA: o nome `onRecordAfterCreateRequest` é da API JSVM antiga (≤0.22)
// e foi removido em 0.23+. A função correta agora é `onRecordAfterCreateSuccess`.

onRecordAfterCreateSuccess((e) => {
    const user = e.record;

    // Skip if a profile already exists (idempotent: re-running migrations / reseeds).
    try {
        const existing = $app.findRecordById("profiles", user.id);
        if (existing) {
            e.next();
            return;
        }
    } catch (err) {
        // Not found → proceed to create.
    }

    let profilesCollection;
    try {
        profilesCollection = $app.findCollectionByNameOrId("profiles");
    } catch (err) {
        console.log("[sync_profile] 'profiles' collection not found, skipping");
        e.next();
        return;
    }

    const profile = new Record(profilesCollection);

    // Use the same id as the user so relations align automatically.
    profile.set("id", user.id);

    // Best-effort: pull a display name from oauth meta or fall back to email prefix.
    const oauthName = user.get("name");
    const email = user.get("email") || "";
    const fallback = email ? email.split("@")[0] : ("user_" + user.id.substr(0, 6));
    profile.set("name", oauthName || fallback);

    profile.set("bio", "");
    profile.set("toxic_strikes", 0);
    profile.set("is_banned", false);

    try {
        $app.save(profile);
    } catch (err) {
        console.log("[sync_profile] failed to create profile for user " + user.id + ": " + err);
    }

    e.next();
}, "users");

// ────────────────────────────────────────────────────────────────────
// On user delete → cascade-delete the matching profile to keep things tidy.
// PocketBase doesn't enforce FK from profiles→users since profiles is a
// standalone base collection, so we delete here explicitly.
// ────────────────────────────────────────────────────────────────────
onRecordAfterDeleteSuccess((e) => {
    try {
        const profile = $app.findRecordById("profiles", e.record.id);
        if (profile) $app.delete(profile);
    } catch (err) {
        // No profile to delete — fine.
    }
    e.next();
}, "users");
