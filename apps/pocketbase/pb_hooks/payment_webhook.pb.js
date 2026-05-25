/// <reference path="../pb_data/types.d.ts" />
//
// Webhook de pagamento — POST /api/webhooks/payment
//
// Body esperado (JSON):
//   {
//     "email": "user@example.com",
//     "event": "approved" | "refunded" | "chargeback"
//   }
//
// Header obrigatorio:
//   X-Webhook-Secret: <valor do env PAYMENT_WEBHOOK_SECRET>
//
// Setar segredo:
//   flyctl secrets set PAYMENT_WEBHOOK_SECRET=<aleatorio-32-chars> -a imigrar-espanha-pb
//
// Comportamento:
//   approved             → profile.has_purchased = true
//   refunded|chargeback  → profile.has_purchased = false
//
// Resposta:
//   200 { ok:true, profileId, has_purchased }
//   401 secret invalido
//   400 payload malformado
//   404 user/profile nao encontrado pelo email

routerAdd("POST", "/api/webhooks/payment", (e) => {
    // ─── Auth ────────────────────────────────────────────────
    const expected = ($os.getenv("PAYMENT_WEBHOOK_SECRET") || "").trim();
    const received = (e.request.header.get("X-Webhook-Secret") || "").trim();
    if (!expected) {
        return e.json(500, { error: "PAYMENT_WEBHOOK_SECRET nao configurada no servidor" });
    }
    if (received !== expected) {
        return e.json(401, { error: "secret invalido" });
    }

    // ─── Parse body ──────────────────────────────────────────
    let body;
    try {
        body = $apis.requestInfo(e).body || {};
    } catch (err) {
        return e.json(400, { error: "body invalido: " + String(err) });
    }
    const email = (body.email || "").trim().toLowerCase();
    const event = (body.event || "").trim().toLowerCase();
    if (!email || !event) {
        return e.json(400, { error: "email e event sao obrigatorios" });
    }

    const VALID = ["approved", "refunded", "chargeback"];
    if (VALID.indexOf(event) === -1) {
        return e.json(400, { error: "event invalido (esperado: approved|refunded|chargeback)" });
    }

    // ─── Localiza user pelo email ────────────────────────────
    let user;
    try {
        user = $app.findFirstRecordByFilter("users", "email = {:e}", { e: email });
    } catch (err) {
        return e.json(404, { error: "user nao encontrado para email: " + email });
    }

    // ─── Localiza profile (mesmo id do user) ─────────────────
    let profile;
    try {
        profile = $app.findRecordById("profiles", user.id);
    } catch (err) {
        return e.json(404, { error: "profile nao encontrado para user: " + user.id });
    }

    // ─── Aplica flag ─────────────────────────────────────────
    const newValue = event === "approved";
    profile.set("has_purchased", newValue);

    try {
        $app.save(profile);
    } catch (err) {
        return e.json(500, { error: "falha ao salvar profile: " + String(err) });
    }

    console.log("[payment_webhook] " + email + " event=" + event + " has_purchased=" + newValue);

    return e.json(200, {
        ok: true,
        profileId: profile.id,
        email: email,
        event: event,
        has_purchased: newValue
    });
});
