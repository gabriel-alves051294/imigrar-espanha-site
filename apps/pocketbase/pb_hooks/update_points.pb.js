/// <reference path="../pb_data/types.d.ts" />
//
// Gamificacao COMIQUICE — incrementa pontos no profile do autor.
//
// CRITICO: usa SQL UPDATE direto pra increment atomico. Caso contrario,
// 6 mensagens em paralelo causam race condition (todas leem mesmo valor,
// ultima escrita vence -> +1 ponto em vez de +6).
//
// Pontuacao:
//   chat_messages  +1
//   blog_comments  +2
//   replies        +3
//   posts          +5
//   blog_posts     +10
//
// IMPORTANTE: nunca reduz pontos. Mensagens ofensivas sao BLOQUEADAS
// pelo hook moderate ANTES do create -> nao chegam a ganhar ponto.

function bumpPoints(authorId, delta) {
    if (!authorId || !delta) return;
    try {
        $app.db()
            .newQuery("UPDATE profiles SET points = COALESCE(points, 0) + {:d} WHERE id = {:id}")
            .bind({ d: delta, id: authorId })
            .execute();
    } catch (err) {
        console.log("[update_points] SQL failed for " + authorId + ": " + err);
    }
}

onRecordAfterCreateSuccess((e) => {
    bumpPoints(e.record.get("author"), 1);
    e.next();
}, "chat_messages");

onRecordAfterCreateSuccess((e) => {
    bumpPoints(e.record.get("author"), 2);
    e.next();
}, "blog_comments");

onRecordAfterCreateSuccess((e) => {
    bumpPoints(e.record.get("author"), 3);
    e.next();
}, "replies");

onRecordAfterCreateSuccess((e) => {
    bumpPoints(e.record.get("author"), 5);
    e.next();
}, "posts");

onRecordAfterCreateSuccess((e) => {
    bumpPoints(e.record.get("author"), 10);
    e.next();
}, "blog_posts");
