/// <reference path="../pb_data/types.d.ts" />
//
// Server-side rate limiting. Cada handler 100% inline (sem helpers externos)
// porque PB JSVM v0.38 não preserva closure de callbacks.

onRecordCreateRequest((e) => {
    // Aumentado pra 60/60s — gamificacao exige permitir muitos posts validos.
    // Override via env RL_CHAT_MAX se quiser endurecer/relaxar.
    const max = Number($os.getenv("RL_CHAT_MAX") || 60);
    const win = Number($os.getenv("RL_CHAT_WINDOW") || 60);
    const authorId = e.record.get("author");
    if (authorId) {
        const sinceIso = new Date(Date.now() - win * 1000).toISOString().replace('T', ' ');
        const records = $app.findRecordsByFilter("chat_messages", "author = {:uid} && created >= {:since}", "-created", 500, 0, { uid: authorId, since: sinceIso });
        if (records.length >= max) {
            throw new BadRequestError("Limite de envios atingido. Aguarde " + Math.ceil(win / 60) + " min e tente novamente.");
        }
    }
    e.next();
}, "chat_messages");

onRecordCreateRequest((e) => {
    const max = Number($os.getenv("RL_POST_MAX") || 3);
    const win = Number($os.getenv("RL_POST_WINDOW") || 300);
    const authorId = e.record.get("author");
    if (authorId) {
        const sinceIso = new Date(Date.now() - win * 1000).toISOString().replace('T', ' ');
        const records = $app.findRecordsByFilter("posts", "author = {:uid} && created >= {:since}", "-created", 500, 0, { uid: authorId, since: sinceIso });
        if (records.length >= max) {
            throw new BadRequestError("Limite de envios atingido. Aguarde " + Math.ceil(win / 60) + " min e tente novamente.");
        }
    }
    e.next();
}, "posts");

onRecordCreateRequest((e) => {
    const max = Number($os.getenv("RL_REPLY_MAX") || 15);
    const win = Number($os.getenv("RL_REPLY_WINDOW") || 300);
    const authorId = e.record.get("author");
    if (authorId) {
        const sinceIso = new Date(Date.now() - win * 1000).toISOString().replace('T', ' ');
        const records = $app.findRecordsByFilter("replies", "author = {:uid} && created >= {:since}", "-created", 500, 0, { uid: authorId, since: sinceIso });
        if (records.length >= max) {
            throw new BadRequestError("Limite de envios atingido. Aguarde " + Math.ceil(win / 60) + " min e tente novamente.");
        }
    }
    e.next();
}, "replies");

onRecordCreateRequest((e) => {
    const max = Number($os.getenv("RL_COMMENT_MAX") || 5);
    const win = Number($os.getenv("RL_COMMENT_WINDOW") || 300);
    const authorId = e.record.get("author");
    if (authorId) {
        const sinceIso = new Date(Date.now() - win * 1000).toISOString().replace('T', ' ');
        const records = $app.findRecordsByFilter("blog_comments", "author = {:uid} && created >= {:since}", "-created", 500, 0, { uid: authorId, since: sinceIso });
        if (records.length >= max) {
            throw new BadRequestError("Limite de envios atingido. Aguarde " + Math.ceil(win / 60) + " min e tente novamente.");
        }
    }
    e.next();
}, "blog_comments");
