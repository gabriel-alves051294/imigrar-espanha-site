/// <reference path="../pb_data/types.d.ts" />
//
// Cria o superuser inicial a partir de variáveis de ambiente.
//
// Comportamento:
//   - Se PB_SUPERUSER_EMAIL e PB_SUPERUSER_PASSWORD estiverem setadas:
//     cria o superuser (idempotente — não falha se já existe).
//   - Se NÃO estiverem setadas: pula silenciosamente. Crie via UI em
//     https://<seu-pocketbase>/_/ após o primeiro deploy.
//
// Esta migration era hostile no original: sem as env vars o boot do PB
// inteiro falhava. Agora ela é fail-OPEN para deploy automatizado.

migrate((app) => {
    const email = $os.getenv("PB_SUPERUSER_EMAIL");
    const password = $os.getenv("PB_SUPERUSER_PASSWORD");

    if (!email || !password) {
        console.log("[create_superuser] PB_SUPERUSER_EMAIL/PASSWORD ausentes — pulando criação. Crie via UI em /_/.");
        return;
    }

    const superusers = app.findCollectionByNameOrId("_superusers");

    // Idempotente: se já existe superuser com esse e-mail, não recria.
    try {
        const existing = app.findFirstRecordByData("_superusers", "email", email);
        if (existing) {
            console.log("[create_superuser] superuser " + email + " já existe — pulando.");
            return;
        }
    } catch (e) {
        // Registro não encontrado — segue para criação.
    }

    const record = new Record(superusers);
    record.set("email", email);
    record.set("password", password);
    app.save(record);
    console.log("[create_superuser] superuser " + email + " criado com sucesso.");
}, (app) => {
    // Rollback: deliberadamente no-op. Não remove superuser por segurança.
});
