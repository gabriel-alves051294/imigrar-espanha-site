/// <reference path="../pb_data/types.d.ts" />
//
// Keeps thread (posts) statistics in sync:
//   - replies_count: incremented when a reply is created, decremented on delete.
//   - updated:        autodate already covers it, but we force a touch via save()
//                     so listings ordered by "updated DESC" reflect activity.
//
// PocketBase JSVM v0.23+ APIs used:
//   onRecordAfterCreateSuccess, onRecordAfterDeleteSuccess, $app.findRecordById, $app.save
//
// NOTA: nomes `onRecord*Request` são da API antiga (≤0.22) e foram
// removidos em 0.23+. Use `Success`/`Error` no lugar.

function touchThread(threadId, delta) {
    if (!threadId) return;
    let thread;
    try {
        thread = $app.findRecordById("posts", threadId);
    } catch (err) {
        return; // thread no longer exists
    }

    const current = thread.get("replies_count") || 0;
    const next = Math.max(0, current + delta);
    thread.set("replies_count", next);

    try {
        $app.save(thread);
    } catch (err) {
        console.log("[update_thread_stats] save failed for " + threadId + ": " + err);
    }
}

onRecordAfterCreateSuccess((e) => {
    const threadId = e.record.get("post");
    touchThread(threadId, +1);
    e.next();
}, "replies");

onRecordAfterDeleteSuccess((e) => {
    const threadId = e.record.get("post");
    touchThread(threadId, -1);
    e.next();
}, "replies");

// Optional: increment view count on blog posts.
// Not registered here — handled at the endpoint level by frontend
// (or add a $http route if needed).
