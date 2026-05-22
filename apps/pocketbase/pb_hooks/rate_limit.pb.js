/// <reference path="../pb_data/types.d.ts" />
//
// Server-side rate limiting. Client-side check in apps/web/src/lib/moderation.js
// is bypass-trivial, so we re-enforce here with a per-author + per-collection
// counter using PocketBase's record store as the rolling window.
//
// Limits (overridable via env):
//   - chat_messages: max 10 in 60s.
//   - posts:         max 3  in 5min.
//   - replies:       max 15 in 5min.
//   - blog_comments: max 5  in 5min.
//
// We count records authored by the same user in the relevant collection in the
// last N seconds. If the window is exceeded, throw 429-equivalent BadRequest.

function countRecentByAuthor(collectionName, authorField, authorId, seconds) {
    if (!authorId) return 0;
    const sinceIso = new Date(Date.now() - seconds * 1000).toISOString().replace('T', ' ');
    const records = $app.findRecordsByFilter(
        collectionName,
        authorField + " = {:uid} && created >= {:since}",
        "-created",
        500,
        0,
        { uid: authorId, since: sinceIso }
    );
    return records.length;
}

function enforce(collectionName, authorField, authorId, max, windowSec) {
    const count = countRecentByAuthor(collectionName, authorField, authorId, windowSec);
    if (count >= max) {
        throw new BadRequestError(
            "Limite de envios atingido. Aguarde " + Math.ceil(windowSec / 60) + " min e tente novamente."
        );
    }
}

onRecordCreateRequest((e) => {
    const max = Number($os.getenv("RL_CHAT_MAX")    || 10);
    const win = Number($os.getenv("RL_CHAT_WINDOW") || 60);
    enforce("chat_messages", "author", e.record.get("author"), max, win);
    e.next();
}, "chat_messages");

onRecordCreateRequest((e) => {
    const max = Number($os.getenv("RL_POST_MAX")    || 3);
    const win = Number($os.getenv("RL_POST_WINDOW") || 300);
    enforce("posts", "author", e.record.get("author"), max, win);
    e.next();
}, "posts");

onRecordCreateRequest((e) => {
    const max = Number($os.getenv("RL_REPLY_MAX")    || 15);
    const win = Number($os.getenv("RL_REPLY_WINDOW") || 300);
    enforce("replies", "author", e.record.get("author"), max, win);
    e.next();
}, "replies");

onRecordCreateRequest((e) => {
    const max = Number($os.getenv("RL_COMMENT_MAX")    || 5);
    const win = Number($os.getenv("RL_COMMENT_WINDOW") || 300);
    enforce("blog_comments", "author", e.record.get("author"), max, win);
    e.next();
}, "blog_comments");
