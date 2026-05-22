# Checklist de Deploy — Comunidade

> Status: tudo que pode ser feito sem credenciais externas está pronto.
> Frontend + Backend (PocketBase hooks/migrations) + Worker NSFW + LGPD + Segurança.

---

## Arquivos criados/modificados (consolidado)

### Backend (PocketBase)

| Arquivo | Estado | Propósito |
|---|---|---|
| `apps/pocketbase/pb_hooks/moderate.pb.js` | **REESCRITO (OpenAI)** | Usa OpenAI Moderation API (`omni-moderation-latest`). Fail-CLOSED, strikes/ban, threshold configurável. Cobre posts, replies, chat_messages, blog_comments, images. |
| `apps/pocketbase/pb_hooks/sync_profile.pb.js` | **NOVO** | Cria `profiles` automaticamente quando user OAuth/email é criado, com mesmo ID. Resolve o FK error que travava todo insert de post. |
| `apps/pocketbase/pb_hooks/update_thread_stats.pb.js` | **NOVO** | Mantém `replies_count` em threads sincronizado com inserts/deletes de replies. |
| `apps/pocketbase/pb_hooks/rate_limit.pb.js` | **NOVO** | Rate limit server-side: chat 10/60s, posts 3/5min, replies 15/5min, blog_comments 5/5min. Configurável via env. |
| `apps/pocketbase/pb_migrations/1779500000_004_fix_profiles_visibility.js` | **NOVO** | Abre listRule/viewRule de profiles (para fórum mostrar autor). |

### Frontend (React/Vite)

| Arquivo | Estado | Mudança |
|---|---|---|
| `apps/web/src/components/AdSlot.jsx` | EDITADO (Horizons) | Injeta `adsbygoogle.js` dinamicamente com client de `import.meta.env`. |
| `apps/web/src/components/Header.jsx` | EDITADO (Horizons) | Importa `@/lib/pocketbase.js` (um único cliente). |
| `apps/web/src/components/ChatInput.jsx` | EDITADO | Mostra mensagem real do servidor em erros (não mais "Erro genérico"). |
| `apps/web/src/components/ThreadForm.jsx` | EDITADO | Idem ChatInput. |
| `apps/web/src/components/ReplyForm.jsx` | EDITADO | Mensagem real + **remove double-increment** de `replies_count` (hook server já cuida). |
| `apps/web/src/components/ImageUploader.jsx` | REESCRITO | Integra Worker NSFW (fail-closed). Mostra mensagem real do server. |
| `apps/web/src/components/CookieBanner.jsx` | EDITADO | Texto LGPD menciona PocketBase, AdSense, Perspective, Vision. |
| `apps/web/src/pages/PrivacyPage.jsx` | EDITADO | Seção 2 detalha moderação em 2 camadas (texto + imagem). |
| `apps/web/src/lib/pocketbaseClient.js` | NEUTRALIZADO | Re-exporta singleton de `pocketbase.js` (evita dual-client bug se algum código legado importar dele). |
| `apps/web/index.html` | EDITADO (Horizons) | Meta `google-adsense-account` + script `adsbygoogle.js` removido (injeção via AdSlot). |
| `apps/web/public/.htaccess` | REESCRITO | Force HTTPS, security headers (sem quebrar AdSense), `ads.txt` como text/plain, compressão. |
| `apps/web/public/sitemap.xml` | EDITADO | Adicionadas `/comunidade`, `/blog`, `/regras-comunidade`. Prioridades ajustadas. |
| `apps/web/public/robots.txt` | EDITADO | Bloqueia `/auth/`, `/comunidade/chat`, `/api/`. |
| `apps/web/.env.example` | EDITADO | Adicionado `VITE_NSFW_WORKER_URL`. |

### Cloudflare Worker (NSFW)

| Arquivo | Estado | Propósito |
|---|---|---|
| `workers/nsfw-moderation/src/worker.js` | **NOVO** | Recebe imagem multipart, chama Vision SafeSearch, retorna `{safe, reasons, scores}`. Fail-closed. CORS travado por `ALLOWED_ORIGIN`. |
| `workers/nsfw-moderation/wrangler.toml` | **NOVO** | Config Cloudflare Workers. |
| `workers/nsfw-moderation/README.md` | **NOVO** | Setup, deploy, custos. |

---

## Sequência de deploy

### Etapa 1 — Configurar OAuth (manual, 15 min)

Abra `https://<seu-pocketbase>/_/` → Settings → Auth providers:

- **Google**: criar OAuth client em <https://console.cloud.google.com> → credenciais Web App. Redirect URI a registrar lá: `https://<seu-pocketbase>/api/oauth2-redirect`.
- **Facebook**: <https://developers.facebook.com> → app + Facebook Login. Mesma redirect URI.

> A migration `1779392144_001_configure_oauth_google_facebook_for_users.js` tem placeholders literais. **Não rode**; configure pela UI acima.

### Etapa 2 — Setar env vars no PocketBase

No Fly.io use `flyctl secrets set CHAVE=valor`:

```bash
PB_ENCRYPTION_KEY=$(openssl rand -hex 32)
OPENAI_API_KEY=sk-...   # https://platform.openai.com/api-keys

# Opcionais (override de moderação):
OPENAI_MOD_MODEL=omni-moderation-latest
MOD_STRICT_THRESHOLD=0.50
MOD_MAX_STRIKES=3

# Opcionais (override de rate limits):
RL_CHAT_MAX=10
RL_CHAT_WINDOW=60
RL_POST_MAX=3
RL_POST_WINDOW=300
```

Restart o PocketBase para carregar hooks novos.

### Etapa 3 — Deploy do Worker NSFW (opcional mas recomendado)

```bash
npm install -g wrangler
wrangler login
cd workers/nsfw-moderation
wrangler secret put VISION_API_KEY      # de https://console.cloud.google.com (habilitar Cloud Vision API)
wrangler secret put ALLOWED_ORIGIN      # https://imigrarparaespanha.com.br
wrangler deploy
```

Copie a URL `https://nsfw-moderation.<sub>.workers.dev`.

### Etapa 4 — Configurar AdSense

1. Editar `apps/web/index.html` linha 30: trocar `ca-pub-0000000000000000` pelo seu publisher ID.
2. Editar `apps/web/public/ads.txt`: mesmo ID.
3. Submeter o site para <https://www.google.com/adsense>. Aprovação: 3 a 14 dias.

### Etapa 5 — Configurar env vars do frontend

Criar `apps/web/.env.local`:

```env
VITE_POCKETBASE_URL=https://<seu-pocketbase>
VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
VITE_HOTMART_URL=https://pay.hotmart.com/E105769769S?checkoutMode=10
VITE_NSFW_WORKER_URL=https://nsfw-moderation.<sub>.workers.dev
```

### Etapa 6 — Build e deploy do site

```bash
cd apps/web
npm install
npm run build
# Upload de dist/apps/web/ para a raiz pública do Hostinger
```

---

## Smoke test pós-deploy

| # | Teste | Resultado esperado |
|---|---|---|
| 1 | `https://imigrarparaespanha.com.br/comunidade` carrega | Lista de 8 categorias (ou vazia se ainda sem seed) |
| 2 | Login "Continuar com Google" | Popup → retorna logado |
| 3 | PB admin → `profiles` | Novo registro com mesmo ID do user |
| 4 | Criar thread com texto normal | Aparece na categoria |
| 5 | Criar thread com palavrão pesado (PT-BR) | Bloqueada client-side ("Sua mensagem contém linguagem inapropriada") |
| 6 | Criar thread com texto tóxico sem palavrão | Bloqueada server-side com mensagem do hook |
| 7 | `profiles.toxic_strikes` do user | Incrementado em 1 |
| 8 | 3 strikes consecutivos | `is_banned=true`; próximo post retorna "Sua conta foi banida pela moderação" |
| 9 | Enviar 4 posts em sequência | 4º falha com "Limite de envios atingido. Aguarde 5 min" |
| 10 | Upload JPG normal | Sucesso (passa por Worker NSFW se configurado) |
| 11 | Upload JPG NSFW de teste | Bloqueado por Worker — toast "Imagem bloqueada (adult)" |
| 12 | Chat realtime | Mensagem aparece sem reload em outra aba |
| 13 | Reply em thread | `replies_count` da thread incrementa em 1 (e SÓ 1, não 2) |
| 14 | `https://imigrarparaespanha.com.br/ads.txt` | 200, content-type `text/plain` |
| 15 | Deletar reply | `replies_count` decrementa em 1 |
| 16 | Sair pelo dropdown do Header | Avatar some, botão "Entrar" reaparece |

Se algum item falhar, NÃO promova ao público — me mande o erro do console.

---

## Bugs conhecidos não-críticos

- **Migration OAuth** com `<<GOOGLE_CLIENT_ID>>` literal: ignorar, configurar via UI.
- **`images.mimeTypes`** aceita GIF na collection mas frontend só envia JPG/PNG/WEBP. Restrição mais apertada no client é OK.
- **Sem job de purga de uploads órfãos**: imagens enviadas e não anexadas a thread/reply ficam acumulando. Adicionar cronjob mensal se virar problema.
- **Sem painel admin de blog posts**: collections existem, criar posts via PB admin UI por enquanto.

---

## Resumo executivo de capacidades

| Feature | Estado |
|---|---|
| Auth Google/Facebook + email/senha | ✅ |
| Profile auto-criado no signup | ✅ |
| Fórum com categorias e threads | ✅ |
| Replies com contagem automática | ✅ |
| Chat realtime (PocketBase subscriptions) | ✅ |
| Moderação texto 2 camadas (client + Perspective) | ✅ |
| Strikes + ban automático aos 3 | ✅ |
| Moderação imagem (MIME + tamanho + Vision SafeSearch) | ✅ |
| Rate limit server-side | ✅ |
| AdSense pronto (basta publisher ID) | ✅ |
| Hotmart CTA em sidebar/footer | ✅ |
| SEO: sitemap + robots + meta tags | ✅ |
| LGPD: cookie banner + política atualizados | ✅ |
| Segurança: HTTPS forçado + headers AdSense-safe | ✅ |

**Custo operacional previsto (até 5k MAU):** USD 0 (PocketBase Hostinger + Perspective grátis + Vision 1k grátis/mês + Worker Cloudflare grátis).
