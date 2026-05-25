/// <reference path="../pb_data/types.d.ts" />
//
// Mirror auth user → profile (mesmo ID). Inline pra evitar closure issues.

onRecordAfterCreateSuccess((e) => {
    const user = e.record;

    // Idempotente
    try {
        const existing = $app.findRecordById("profiles", user.id);
        if (existing) { e.next(); return; }
    } catch (err) {
        // not found, continua
    }

    let profilesCollection;
    try {
        profilesCollection = $app.findCollectionByNameOrId("profiles");
    } catch (err) {
        console.log("[sync_profile] 'profiles' collection not found");
        throw new Error("Profiles collection missing");
    }

    const profile = new Record(profilesCollection);
    profile.set("id", user.id);

    const oauthName = user.get("name");
    const email = user.get("email") || "";
    const fallback = email ? email.split("@")[0] : ("user_" + user.id.substr(0, 6));
    profile.set("name", oauthName || fallback);
    profile.set("bio", "");
    profile.set("toxic_strikes", 0);
    profile.set("is_banned", false);

    try {
        $app.save(profile);
        console.log("[sync_profile] created profile for " + user.id + " (" + email + ")");
    } catch (err) {
        console.log("[sync_profile] FATAL: failed to create profile for " + user.id + ": " + err);
        throw err;
    }
    e.next();
}, "users");

onRecordAfterDeleteSuccess((e) => {
    try {
        const profile = $app.findRecordById("profiles", e.record.id);
        if (profile) $app.delete(profile);
    } catch (err) { /* no profile */ }
    e.next();
}, "users");
