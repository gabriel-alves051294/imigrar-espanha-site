/// <reference path="../pb_data/types.d.ts" />
//
// Gamificacao COMIQUICE — incrementa pontos no profile do autor.
//
// CRITICO 1: SQL UPDATE direto pra increment atomico (evita race condition
//            em saves paralelos).
// CRITICO 2: PB JSVM v0.38 NAO preserva escopo entre callbacks. Cada
//            handler precisa ser 100% inline (zero referencia a funcao
//            externa). Sem helpers compartilhados!
//
// Pontuacao:
//   chat_messages  +1
//   blog_comments  +2
//   replies        +3
//   posts          +5
//   blog_posts     +10
//
// Mensagens ofensivas sao BLOQUEADAS pelo hook moderate ANTES do create
// -> nao chegam a ganhar ponto. Pontos nunca sao reduzidos.

onRecordAfterCreateSuccess((e) => {
    const id = e.record.get("author");
    if (id) {
        try {
            $app.db()
                .newQuery("UPDATE profiles SET points = COALESCE(points, 0) + 1 WHERE id = {:id}")
                .bind({ id: id })
                .execute();
        } catch (err) { console.log("[points/chat] " + err); }
    }
    e.next();
}, "chat_messages");

onRecordAfterCreateSuccess((e) => {
    const id = e.record.get("author");
    if (id) {
        try {
            $app.db()
                .newQuery("UPDATE profiles SET points = COALESCE(points, 0) + 2 WHERE id = {:id}")
                .bind({ id: id })
                .execute();
        } catch (err) { console.log("[points/blog_comment] " + err); }
    }
    e.next();
}, "blog_comments");

onRecordAfterCreateSuccess((e) => {
    const id = e.record.get("author");
    if (id) {
        try {
            $app.db()
                .newQuery("UPDATE profiles SET points = COALESCE(points, 0) + 3 WHERE id = {:id}")
                .bind({ id: id })
                .execute();
        } catch (err) { console.log("[points/reply] " + err); }
    }
    e.next();
}, "replies");

onRecordAfterCreateSuccess((e) => {
    const id = e.record.get("author");
    if (id) {
        try {
            $app.db()
                .newQuery("UPDATE profiles SET points = COALESCE(points, 0) + 5 WHERE id = {:id}")
                .bind({ id: id })
                .execute();
        } catch (err) { console.log("[points/post] " + err); }
    }
    e.next();
}, "posts");

onRecordAfterCreateSuccess((e) => {
    const id = e.record.get("author");
    if (id) {
        try {
            $app.db()
                .newQuery("UPDATE profiles SET points = COALESCE(points, 0) + 10 WHERE id = {:id}")
                .bind({ id: id })
                .execute();
        } catch (err) { console.log("[points/blog_post] " + err); }
    }
    e.next();
}, "blog_posts");
