/// <reference path="../pb_data/types.d.ts" />
//
// Server-side rate limiting. Client-side em apps/web/src/lib/moderation.js
// é bypass-trivial, então re-enforce aqui.
//
// PB JSVM v0.38 isola callbacks de funções top-level do mesmo arquivo,
// então tudo vai dentro de uma IIFE pra closure consistente.
//
// Limits (overridable via env):
//   - chat_messages: 10 in 60s
//   - posts:         3  in 300s
//   - replies:       15 in 300s
//   - blog_comments: 5  in 300s

(function () {
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
})();
