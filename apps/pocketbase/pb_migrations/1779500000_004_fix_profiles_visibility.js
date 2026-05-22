/// <reference path="../pb_data/types.d.ts" />
//
// Profiles must be publicly readable so the forum / chat can display the
// author's name and avatar for every post. Without this, threads render with
// blank author info because listRule/viewRule were locked to the owner only.
//
// We only relax LIST and VIEW. Update/Delete remain owner-only.
//
// Forward: open profiles. Backward: re-lock to owner.

migrate((app) => {
    const collection = app.findCollectionByNameOrId("profiles");

    // Public read access — needed for forum to render author info.
    collection.listRule = "";
    collection.viewRule = "";

    // Owner-only mutation rules — keep as-is (defensive re-assertion).
    collection.createRule = "@request.auth.id != ''";
    collection.updateRule = "id = @request.auth.id";
    collection.deleteRule = "id = @request.auth.id";

    return app.save(collection);
}, (app) => {
    const collection = app.findCollectionByNameOrId("profiles");
    collection.listRule = "id = @request.auth.id";
    collection.viewRule = "id = @request.auth.id";
    return app.save(collection);
});
