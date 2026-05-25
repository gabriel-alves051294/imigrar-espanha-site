/// <reference path="../pb_data/types.d.ts" />
//
// Mirrors every new auth user (email/password OR OAuth) into the public
// "profiles" collection with the SAME id so that posts/replies/chat_messages
// FK to profile.id continue to work using the user's token id.
//
// Mudanças vs versão anterior:
//   1. IIFE wrapper para consistência com moderate/rate_limit (escopo JSVM).
//   2. FAIL-LOUD no $app.save: se profile não puder ser criado, lança
//      Error pra que o user.create também falhe (evita user órfão sem profile).
//      Caso contrário, o user logaria mas todos os creates dele (chat, posts,
//      replies) falhariam silenciosamente com FK violation.

(function () {
    onRecordAfterCreateSuccess((e) => {
        const user = e.record;

        // Idempotente: se já existe, segue.
        try {
            const existing = $app.findRecordById("profiles", user.id);
            if (existing) {
                e.next();
                return;
            }
        } catch (err) {
            // Not found → criar abaixo.
        }

        let profilesCollection;
        try {
            profilesCollection = $app.findCollectionByNameOrId("profiles");
        } catch (err) {
            console.log("[sync_profile] 'profiles' collection not found — abortando user create");
            throw new Error("Profiles collection missing — server misconfigured");
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
            console.log("[sync_profile] created profile for user " + user.id + " (" + email + ")");
        } catch (err) {
            console.log("[sync_profile] FATAL: failed to create profile for user " + user.id + ": " + err);
            // FAIL-LOUD: propaga o erro pra que user.create falhe também.
            // Melhor falhar no signup que ter user órfão sem profile.
            throw err;
        }

        e.next();
    }, "users");

    // Cascade delete profile quando user é removido.
    onRecordAfterDeleteSuccess((e) => {
        try {
            const profile = $app.findRecordById("profiles", e.record.id);
            if (profile) $app.delete(profile);
        } catch (err) {
            // No profile to delete — fine.
        }
        e.next();
    }, "users");
})();
