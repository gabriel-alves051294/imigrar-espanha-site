/// <reference path="../pb_data/types.d.ts" />
// TEMPORARIO: endpoint debug para confirmar env vars no runtime PB.
// REMOVER apos validar.

routerAdd("GET", "/debug/env", (e) => {
    const key = $os.getenv("OPENAI_API_KEY");
    const out = {
        has_openai_key: !!key,
        openai_key_length: key ? key.length : 0,
        openai_key_prefix: key ? key.substring(0, 7) : null,
        has_pb_enc_key: !!$os.getenv("PB_ENCRYPTION_KEY"),
        has_pb_su_email: !!$os.getenv("PB_SUPERUSER_EMAIL"),
        node_env: $os.getenv("NODE_ENV") || null,
        port: $os.getenv("PORT") || null,
    };
    return e.json(200, out);
});

// Testa conectividade real com OpenAI
routerAdd("GET", "/debug/openai-ping", (e) => {
    const key = $os.getenv("OPENAI_API_KEY");
    if (!key) return e.json(500, { error: "OPENAI_API_KEY not set" });
    try {
        const resp = $http.send({
            url: "https://api.openai.com/v1/moderations",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + key
            },
            body: JSON.stringify({ model: "omni-moderation-latest", input: "ping" }),
            timeout: 10
        });
        return e.json(200, {
            status: resp.statusCode,
            raw_first_300: resp.raw ? String(resp.raw).substring(0, 300) : null
        });
    } catch (err) {
        return e.json(500, { error: String(err) });
    }
});
