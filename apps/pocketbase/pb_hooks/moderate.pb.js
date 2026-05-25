/// <reference path="../pb_data/types.d.ts" />
//
// Moderação de texto via OpenAI Moderation API (gratuita).
// Cobre: posts, replies, chat_messages, blog_comments. Para `images`,
// apenas valida que o uploader não está banido.
//
// IMPORTANTE: Em PocketBase JSVM v0.23+ (e principalmente v0.38),
// callbacks de onRecordCreateRequest não enxergam funções top-level
// declaradas no mesmo arquivo (escopo isolado). Por isso TODAS as
// helpers são definidas DENTRO de uma factory IIFE que retorna os
// handlers já com closure capturada.
//
// Política:
//   - FAIL-CLOSED: se a API for inalcançável OU retornar não-200,
//     o conteúdo é rejeitado.
//   - Bloqueio se `flagged=true` OU se qualquer category_score >= STRICT_THRESHOLD.
//   - Strike por bloqueio; >= MAX_STRIKES → profile.is_banned = true.

(function () {
    const OPENAI_MOD_URL = "https://api.openai.com/v1/moderations";
    const MAX_TEXT_LEN = 8000;
    const CHAT_MAX_LEN = 1000;

    function getStrictThreshold() {
        const raw = $os.getenv("MOD_STRICT_THRESHOLD");
        const n = raw ? Number(raw) : 0.50;
        return isNaN(n) ? 0.50 : n;
    }
    function getMaxStrikes() {
        const raw = $os.getenv("MOD_MAX_STRIKES");
        const n = raw ? parseInt(raw, 10) : 3;
        return isNaN(n) || n <= 0 ? 3 : n;
    }
    function getModel() {
        return $os.getenv("OPENAI_MOD_MODEL") || "omni-moderation-latest";
    }

    function moderateText(text) {
        if (!text || !text.trim()) {
            throw new BadRequestError("Conteúdo não pode estar vazio");
        }
        if (text.length > MAX_TEXT_LEN) {
            throw new BadRequestError("Conteúdo excede o limite de " + MAX_TEXT_LEN + " caracteres");
        }

        const key = $os.getenv("OPENAI_API_KEY");
        if (!key) {
            console.log("[moderate] OPENAI_API_KEY ausente — bloqueando por segurança.");
            throw new BadRequestError("Moderação indisponível, tente novamente em instantes");
        }

        let response;
        try {
            response = $http.send({
                url: OPENAI_MOD_URL,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + key
                },
                body: JSON.stringify({
                    model: getModel(),
                    input: text
                }),
                timeout: 8
            });
        } catch (err) {
            console.log("[moderate] openai network error: " + err);
            throw new BadRequestError("Moderação indisponível, tente novamente em instantes");
        }

        if (response.statusCode !== 200) {
            console.log("[moderate] openai non-200: " + response.statusCode + " body=" + response.raw);
            throw new BadRequestError("Moderação indisponível, tente novamente em instantes");
        }

        const parsed = response.json || {};
        const results = parsed.results || [];
        if (!results.length) {
            console.log("[moderate] openai vazio: " + response.raw);
            throw new BadRequestError("Moderação indisponível, tente novamente em instantes");
        }

        const r = results[0];
        const scores = r.category_scores || {};

        let maxScore = 0;
        for (const k in scores) {
            const v = Number(scores[k]) || 0;
            if (v > maxScore) maxScore = v;
        }

        if (r.flagged === true) {
            return Math.max(maxScore, getStrictThreshold());
        }
        return maxScore;
    }

    function ensureNotBanned(profileId) {
        if (!profileId) return null;
        let profile;
        try {
            profile = $app.findRecordById("profiles", profileId);
        } catch (e) {
            return null;
        }
        if (profile.get("is_banned")) {
            throw new BadRequestError("Sua conta foi banida pela moderação");
        }
        return profile;
    }

    function applyStrike(profile) {
        if (!profile) return;
        const current = profile.get("toxic_strikes") || 0;
        const next = current + 1;
        profile.set("toxic_strikes", next);
        if (next >= getMaxStrikes()) {
            profile.set("is_banned", true);
        }
        try {
            $app.save(profile);
        } catch (err) {
            console.log("[moderate] falha ao salvar strike no profile " + profile.id + ": " + err);
        }
    }

    function runModeration(e, textGetter) {
        const profileId = e.record.get("author");
        const profile = ensureNotBanned(profileId);
        const text = textGetter(e.record);
        const score = moderateText(text);
        if (score >= getStrictThreshold()) {
            applyStrike(profile);
            throw new BadRequestError("Conteúdo bloqueado pela moderação automática");
        }
        e.next();
    }

    // ─── POSTS ────────────────────────────────────────────────────
    onRecordCreateRequest((e) => {
        runModeration(e, (r) => ((r.get("title") || "") + " " + (r.get("content") || "")).trim());
    }, "posts");

    // ─── REPLIES ──────────────────────────────────────────────────
    onRecordCreateRequest((e) => {
        runModeration(e, (r) => (r.get("content") || "").trim());
    }, "replies");

    // ─── CHAT_MESSAGES ────────────────────────────────────────────
    onRecordCreateRequest((e) => {
        const profileId = e.record.get("author");
        const profile = ensureNotBanned(profileId);

        const text = (e.record.get("content") || "").trim();
        if (!text) throw new BadRequestError("Mensagem não pode estar vazia");
        if (text.length > CHAT_MAX_LEN) {
            throw new BadRequestError("Mensagem excede " + CHAT_MAX_LEN + " caracteres");
        }

        const score = moderateText(text);
        if (score >= getStrictThreshold()) {
            applyStrike(profile);
            throw new BadRequestError("Mensagem bloqueada pela moderação automática");
        }

        e.next();
    }, "chat_messages");

    // ─── BLOG_COMMENTS ────────────────────────────────────────────
    onRecordCreateRequest((e) => {
        runModeration(e, (r) => (r.get("content") || "").trim());
    }, "blog_comments");

    // ─── IMAGES — só confere ban ──────────────────────────────────
    onRecordCreateRequest((e) => {
        const uploaderId = e.record.get("uploader");
        ensureNotBanned(uploaderId);
        e.next();
    }, "images");
})();
