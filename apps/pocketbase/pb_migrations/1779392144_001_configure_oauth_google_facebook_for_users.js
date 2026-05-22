/// <reference path="../pb_data/types.d.ts" />
//
// OAuth providers (Google, Facebook) DEVEM ser configurados via PocketBase Admin UI
// → Settings → Auth providers, ou via variáveis de ambiente injetadas pelo runtime.
//
// Esta migration ficou neutralizada porque escrevia placeholders literais
// (<<GOOGLE_CLIENT_ID>>) que sobrescreviam credenciais reais a cada deploy.
//
// Comportamento:
//   - up:  apenas garante que oauth2.enabled = true e configura mappedFields
//          (id→"", name→name, avatarURL→avatar). NÃO toca nos providers.
//   - down: no-op.
//
// Para registrar Google/Facebook:
//   1) Crie o OAuth Client no console do provedor.
//      Redirect URI:  https://<seu-pocketbase>/api/oauth2-redirect
//   2) Cole clientId/clientSecret em https://<seu-pocketbase>/_/#/settings/auth-providers
//   3) Marque "Enabled" para o provedor.

migrate((app) => {
  try {
    const collection = app.findCollectionByNameOrId("users");

    // Garante mapeamento padrão sem sobrescrever providers existentes.
    collection.oauth2.enabled = true;
    collection.oauth2.mappedFields = {
      id: "",
      name: "name",
      username: "",
      avatarURL: "avatar"
    };

    return app.save(collection);
  } catch (e) {
    if (e.message && e.message.includes("no rows in result set")) {
      console.log("[oauth migration] users collection not found, skipping");
      return;
    }
    throw e;
  }
}, (app) => {
  // no-op: rollback não desfaz mapeamento de campos
  return;
})
