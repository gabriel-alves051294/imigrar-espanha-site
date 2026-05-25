/// <reference path="../pb_data/types.d.ts" />
// TEMPORARIO: endpoint debug para confirmar env vars no runtime PB.
// REMOVER apos validar.

routerAdd("GET", "/debug/env", (e) => {
    const key = $os.getenv("OPENAI_API_KEY") || "";
    const trimmed = key.trim();
    // Mapeia byte codes pra identificar caracteres invalidos
    const lastBytes = [];
    for (let i = Math.max(0, key.length - 5); i < key.length; i++) {
        lastBytes.push({ idx: i, code: key.charCodeAt(i) });
    }
    const firstBytes = [];
    for (let i = 0; i < Math.min(5, key.length); i++) {
        firstBytes.push({ idx: i, code: key.charCodeAt(i) });
    }
    const out = {
        has_openai_key: !!key,
        raw_length: key.length,
        trimmed_length: trimmed.length,
        prefix: key.substring(0, 7),
        first_bytes: firstBytes,
        last_bytes: lastBytes,
        has_pb_enc_key: !!$os.getenv("PB_ENCRYPTION_KEY"),
        port: $os.getenv("PORT") || null,
    };
    return e.json(200, out);
});

// Testa conectividade real com OpenAI
routerAdd("GET", "/debug/openai-ping", (e) => {
    const key = ($os.getenv("OPENAI_API_KEY") || "").replace(/[\x00-\x1F\x7F]/g, "").trim();
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
