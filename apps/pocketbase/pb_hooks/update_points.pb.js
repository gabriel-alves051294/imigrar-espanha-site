/// <reference path="../pb_data/types.d.ts" />
//
// Gamificacao COMIQUICE — incrementa points no profile do autor a cada
// interacao bem-sucedida. Bonus por tempo de conta (+10/mes) NAO eh
// persistido aqui — eh computado no frontend somando ao display.
//
// PB JSVM v0.38: handlers 100% inline (sem closure de funcoes externas).
//
// Pontuacao:
//   chat_messages  +1
//   blog_comments  +2
//   replies        +3   (resposta em topico do forum)
//   posts          +5   (novo topico do forum)
//   blog_posts     +10  (artigo no blog)

// Helper inline em cada handler — increment(profileId, delta) precisa
// ser repetido pra evitar issue de closure. Encapsulado em IIFE pra
// nao poluir global.

onRecordAfterCreateSuccess((e) => {
    const profileId = e.record.get("author");
    if (!profileId) { e.next(); return; }
    try {
        const profile = $app.findRecordById("profiles", profileId);
        const current = profile.get("points") || 0;
        profile.set("points", current + 1);
        $app.save(profile);
    } catch (err) {
        console.log("[update_points/chat] " + err);
    }
    e.next();
}, "chat_messages");

onRecordAfterCreateSuccess((e) => {
    const profileId = e.record.get("author");
    if (!profileId) { e.next(); return; }
    try {
        const profile = $app.findRecordById("profiles", profileId);
        const current = profile.get("points") || 0;
        profile.set("points", current + 2);
        $app.save(profile);
    } catch (err) {
        console.log("[update_points/blog_comment] " + err);
    }
    e.next();
}, "blog_comments");

onRecordAfterCreateSuccess((e) => {
    const profileId = e.record.get("author");
    if (!profileId) { e.next(); return; }
    try {
        const profile = $app.findRecordById("profiles", profileId);
        const current = profile.get("points") || 0;
        profile.set("points", current + 3);
        $app.save(profile);
    } catch (err) {
        console.log("[update_points/reply] " + err);
    }
    e.next();
}, "replies");

onRecordAfterCreateSuccess((e) => {
    const profileId = e.record.get("author");
    if (!profileId) { e.next(); return; }
    try {
        const profile = $app.findRecordById("profiles", profileId);
        const current = profile.get("points") || 0;
        profile.set("points", current + 5);
        $app.save(profile);
    } catch (err) {
        console.log("[update_points/post] " + err);
    }
    e.next();
}, "posts");

onRecordAfterCreateSuccess((e) => {
    const profileId = e.record.get("author");
    if (!profileId) { e.next(); return; }
    try {
        const profile = $app.findRecordById("profiles", profileId);
        const current = profile.get("points") || 0;
        profile.set("points", current + 10);
        $app.save(profile);
    } catch (err) {
        console.log("[update_points/blog_post] " + err);
    }
    e.next();
}, "blog_posts");
