/// <reference path="../pb_data/types.d.ts" />
//
// Moderação OpenAI — cada handler é 100% self-contained (zero referência a
// funções externas), porque PB JSVM v0.38 não preserva closure de callbacks
// registrados em onRecordCreateRequest (perde escopo léxico do arquivo).
//
// FAIL-CLOSED: se OpenAI indisponível, bloqueia.
// Bloqueio em flagged=true OU max(category_scores) >= STRICT_THRESHOLD.
// Strike no profile; >= MAX_STRIKES → is_banned = true.

// ─────────────────────────────────────────────────────────────────────
// POSTS
// ─────────────────────────────────────────────────────────────────────
onRecordCreateRequest((e) => {
    const STRICT_THRESHOLD = (function () { const r = $os.getenv("MOD_STRICT_THRESHOLD"); const n = r ? Number(r) : 0.50; return isNaN(n) ? 0.50 : n; })();
    const MAX_STRIKES = (function () { const r = $os.getenv("MOD_MAX_STRIKES"); const n = r ? parseInt(r, 10) : 3; return isNaN(n) || n <= 0 ? 3 : n; })();
    const MODEL = $os.getenv("OPENAI_MOD_MODEL") || "omni-moderation-latest";
    const MAX_TEXT_LEN = 8000;

    const profileId = e.record.get("author");
    let profile = null;
    if (profileId) {
        try { profile = $app.findRecordById("profiles", profileId); } catch (er) { profile = null; }
        if (profile && profile.get("is_banned")) throw new BadRequestError("Sua conta foi banida pela moderação");
    }

    const text = ((e.record.get("title") || "") + " " + (e.record.get("content") || "")).trim();
    if (!text) throw new BadRequestError("Conteúdo não pode estar vazio");
    if (text.length > MAX_TEXT_LEN) throw new BadRequestError("Conteúdo excede o limite de " + MAX_TEXT_LEN + " caracteres");

    // Strip caracteres de controle (\x00-\x1F, \x7F) que vazam ao setar secret via CLI
    const key = ($os.getenv("OPENAI_API_KEY") || "").replace(/[\x00-\x1F\x7F]/g, "").trim();
    if (!key) throw new BadRequestError("Moderação indisponível, tente novamente em instantes");

    let resp;
    try {
        resp = $http.send({ url: "https://api.openai.com/v1/moderations", method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key }, body: JSON.stringify({ model: MODEL, input: text }), timeout: 8 });
    } catch (er) { throw new BadRequestError("Moderação indisponível, tente novamente em instantes"); }

    if (resp.statusCode !== 200) throw new BadRequestError("Moderação indisponível, tente novamente em instantes");
    const results = (resp.json || {}).results || [];
    if (!results.length) throw new BadRequestError("Moderação indisponível, tente novamente em instantes");

    const r0 = results[0];
    const scores = r0.category_scores || {};
    let maxScore = 0;
    for (const k in scores) { const v = Number(scores[k]) || 0; if (v > maxScore) maxScore = v; }
    const score = r0.flagged === true ? Math.max(maxScore, STRICT_THRESHOLD) : maxScore;

    if (score >= STRICT_THRESHOLD) {
        if (profile) {
            const next = (profile.get("toxic_strikes") || 0) + 1;
            profile.set("toxic_strikes", next);
            if (next >= MAX_STRIKES) profile.set("is_banned", true);
            try { $app.save(profile); } catch (er) {}
        }
        throw new BadRequestError("Conteúdo bloqueado pela moderação automática");
    }
    e.next();
}, "posts");

// ─────────────────────────────────────────────────────────────────────
// REPLIES
// ─────────────────────────────────────────────────────────────────────
onRecordCreateRequest((e) => {
    const STRICT_THRESHOLD = (function () { const r = $os.getenv("MOD_STRICT_THRESHOLD"); const n = r ? Number(r) : 0.50; return isNaN(n) ? 0.50 : n; })();
    const MAX_STRIKES = (function () { const r = $os.getenv("MOD_MAX_STRIKES"); const n = r ? parseInt(r, 10) : 3; return isNaN(n) || n <= 0 ? 3 : n; })();
    const MODEL = $os.getenv("OPENAI_MOD_MODEL") || "omni-moderation-latest";
    const MAX_TEXT_LEN = 8000;

    const profileId = e.record.get("author");
    let profile = null;
    if (profileId) {
        try { profile = $app.findRecordById("profiles", profileId); } catch (er) { profile = null; }
        if (profile && profile.get("is_banned")) throw new BadRequestError("Sua conta foi banida pela moderação");
    }

    const text = (e.record.get("content") || "").trim();
    if (!text) throw new BadRequestError("Conteúdo não pode estar vazio");
    if (text.length > MAX_TEXT_LEN) throw new BadRequestError("Conteúdo excede o limite de " + MAX_TEXT_LEN + " caracteres");

    // Strip caracteres de controle (\x00-\x1F, \x7F) que vazam ao setar secret via CLI
    const key = ($os.getenv("OPENAI_API_KEY") || "").replace(/[\x00-\x1F\x7F]/g, "").trim();
    if (!key) throw new BadRequestError("Moderação indisponível, tente novamente em instantes");

    let resp;
    try {
        resp = $http.send({ url: "https://api.openai.com/v1/moderations", method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key }, body: JSON.stringify({ model: MODEL, input: text }), timeout: 8 });
    } catch (er) { throw new BadRequestError("Moderação indisponível, tente novamente em instantes"); }

    if (resp.statusCode !== 200) throw new BadRequestError("Moderação indisponível, tente novamente em instantes");
    const results = (resp.json || {}).results || [];
    if (!results.length) throw new BadRequestError("Moderação indisponível, tente novamente em instantes");

    const r0 = results[0];
    const scores = r0.category_scores || {};
    let maxScore = 0;
    for (const k in scores) { const v = Number(scores[k]) || 0; if (v > maxScore) maxScore = v; }
    const score = r0.flagged === true ? Math.max(maxScore, STRICT_THRESHOLD) : maxScore;

    if (score >= STRICT_THRESHOLD) {
        if (profile) {
            const next = (profile.get("toxic_strikes") || 0) + 1;
            profile.set("toxic_strikes", next);
            if (next >= MAX_STRIKES) profile.set("is_banned", true);
            try { $app.save(profile); } catch (er) {}
        }
        throw new BadRequestError("Resposta bloqueada pela moderação automática");
    }
    e.next();
}, "replies");

// ─────────────────────────────────────────────────────────────────────
// CHAT_MESSAGES (limite menor)
// ─────────────────────────────────────────────────────────────────────
onRecordCreateRequest((e) => {
    const STRICT_THRESHOLD = (function () { const r = $os.getenv("MOD_STRICT_THRESHOLD"); const n = r ? Number(r) : 0.50; return isNaN(n) ? 0.50 : n; })();
    const MAX_STRIKES = (function () { const r = $os.getenv("MOD_MAX_STRIKES"); const n = r ? parseInt(r, 10) : 3; return isNaN(n) || n <= 0 ? 3 : n; })();
    const MODEL = $os.getenv("OPENAI_MOD_MODEL") || "omni-moderation-latest";
    const CHAT_MAX_LEN = 1000;

    const profileId = e.record.get("author");
    let profile = null;
    if (profileId) {
        try { profile = $app.findRecordById("profiles", profileId); } catch (er) { profile = null; }
        if (profile && profile.get("is_banned")) throw new BadRequestError("Sua conta foi banida pela moderação");
    }

    const text = (e.record.get("content") || "").trim();
    if (!text) throw new BadRequestError("Mensagem não pode estar vazia");
    if (text.length > CHAT_MAX_LEN) throw new BadRequestError("Mensagem excede " + CHAT_MAX_LEN + " caracteres");

    // Strip caracteres de controle (\x00-\x1F, \x7F) que vazam ao setar secret via CLI
    const key = ($os.getenv("OPENAI_API_KEY") || "").replace(/[\x00-\x1F\x7F]/g, "").trim();
    if (!key) throw new BadRequestError("Moderação indisponível, tente novamente em instantes");

    let resp;
    try {
        resp = $http.send({ url: "https://api.openai.com/v1/moderations", method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key }, body: JSON.stringify({ model: MODEL, input: text }), timeout: 8 });
    } catch (er) { throw new BadRequestError("Moderação indisponível, tente novamente em instantes"); }

    if (resp.statusCode !== 200) throw new BadRequestError("Moderação indisponível, tente novamente em instantes");
    const results = (resp.json || {}).results || [];
    if (!results.length) throw new BadRequestError("Moderação indisponível, tente novamente em instantes");

    const r0 = results[0];
    const scores = r0.category_scores || {};
    let maxScore = 0;
    for (const k in scores) { const v = Number(scores[k]) || 0; if (v > maxScore) maxScore = v; }
    const score = r0.flagged === true ? Math.max(maxScore, STRICT_THRESHOLD) : maxScore;

    if (score >= STRICT_THRESHOLD) {
        if (profile) {
            const next = (profile.get("toxic_strikes") || 0) + 1;
            profile.set("toxic_strikes", next);
            if (next >= MAX_STRIKES) profile.set("is_banned", true);
            try { $app.save(profile); } catch (er) {}
        }
        throw new BadRequestError("Mensagem bloqueada pela moderação automática");
    }
    e.next();
}, "chat_messages");

// ─────────────────────────────────────────────────────────────────────
// BLOG_COMMENTS
// ─────────────────────────────────────────────────────────────────────
onRecordCreateRequest((e) => {
    const STRICT_THRESHOLD = (function () { const r = $os.getenv("MOD_STRICT_THRESHOLD"); const n = r ? Number(r) : 0.50; return isNaN(n) ? 0.50 : n; })();
    const MAX_STRIKES = (function () { const r = $os.getenv("MOD_MAX_STRIKES"); const n = r ? parseInt(r, 10) : 3; return isNaN(n) || n <= 0 ? 3 : n; })();
    const MODEL = $os.getenv("OPENAI_MOD_MODEL") || "omni-moderation-latest";
    const MAX_TEXT_LEN = 8000;

    const profileId = e.record.get("author");
    let profile = null;
    if (profileId) {
        try { profile = $app.findRecordById("profiles", profileId); } catch (er) { profile = null; }
        if (profile && profile.get("is_banned")) throw new BadRequestError("Sua conta foi banida pela moderação");
    }

    const text = (e.record.get("content") || "").trim();
    if (!text) throw new BadRequestError("Comentário não pode estar vazio");
    if (text.length > MAX_TEXT_LEN) throw new BadRequestError("Comentário excede o limite de " + MAX_TEXT_LEN + " caracteres");

    // Strip caracteres de controle (\x00-\x1F, \x7F) que vazam ao setar secret via CLI
    const key = ($os.getenv("OPENAI_API_KEY") || "").replace(/[\x00-\x1F\x7F]/g, "").trim();
    if (!key) throw new BadRequestError("Moderação indisponível, tente novamente em instantes");

    let resp;
    try {
        resp = $http.send({ url: "https://api.openai.com/v1/moderations", method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key }, body: JSON.stringify({ model: MODEL, input: text }), timeout: 8 });
    } catch (er) { throw new BadRequestError("Moderação indisponível, tente novamente em instantes"); }

    if (resp.statusCode !== 200) throw new BadRequestError("Moderação indisponível, tente novamente em instantes");
    const results = (resp.json || {}).results || [];
    if (!results.length) throw new BadRequestError("Moderação indisponível, tente novamente em instantes");

    const r0 = results[0];
    const scores = r0.category_scores || {};
    let maxScore = 0;
    for (const k in scores) { const v = Number(scores[k]) || 0; if (v > maxScore) maxScore = v; }
    const score = r0.flagged === true ? Math.max(maxScore, STRICT_THRESHOLD) : maxScore;

    if (score >= STRICT_THRESHOLD) {
        if (profile) {
            const next = (profile.get("toxic_strikes") || 0) + 1;
            profile.set("toxic_strikes", next);
            if (next >= MAX_STRIKES) profile.set("is_banned", true);
            try { $app.save(profile); } catch (er) {}
        }
        throw new BadRequestError("Comentário bloqueado pela moderação automática");
    }
    e.next();
}, "blog_comments");

// ─────────────────────────────────────────────────────────────────────
// IMAGES — só confere ban
// ─────────────────────────────────────────────────────────────────────
onRecordCreateRequest((e) => {
    const uploaderId = e.record.get("uploader");
    if (uploaderId) {
        let profile = null;
        try { profile = $app.findRecordById("profiles", uploaderId); } catch (er) { profile = null; }
        if (profile && profile.get("is_banned")) throw new BadRequestError("Sua conta foi banida pela moderação");
    }
    e.next();
}, "images");
