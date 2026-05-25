/// <reference path="../pb_data/types.d.ts" />
//
// Thread stats sync — inline pra evitar closure issues do JSVM v0.38.

onRecordAfterCreateSuccess((e) => {
    const threadId = e.record.get("post");
    if (threadId) {
        let thread;
        try { thread = $app.findRecordById("posts", threadId); } catch (err) { e.next(); return; }
        const current = thread.get("replies_count") || 0;
        thread.set("replies_count", Math.max(0, current + 1));
        try { $app.save(thread); } catch (err) {
            console.log("[update_thread_stats] save failed for " + threadId + ": " + err);
        }
    }
    e.next();
}, "replies");

onRecordAfterDeleteSuccess((e) => {
    const threadId = e.record.get("post");
    if (threadId) {
        let thread;
        try { thread = $app.findRecordById("posts", threadId); } catch (err) { e.next(); return; }
        const current = thread.get("replies_count") || 0;
        thread.set("replies_count", Math.max(0, current - 1));
        try { $app.save(thread); } catch (err) {
            console.log("[update_thread_stats] save failed for " + threadId + ": " + err);
        }
    }
    e.next();
}, "replies");
