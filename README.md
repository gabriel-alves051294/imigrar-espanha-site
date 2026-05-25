# Imigrar Espanha — Do Brasil para a Espanha

> Hub completo de imigração para a Espanha: guia, comunidade (fórum, chat em tempo real, blog), gamificação e área de afiliados.

[![Site](https://img.shields.io/badge/site-live-success)](https://imigrar-espanha-site-web.vercel.app)
[![Backend](https://img.shields.io/badge/pocketbase-v0.38-blue)](https://pocketbase.io/)
[![Frontend](https://img.shields.io/badge/react-18-61dafb)](https://react.dev/)
[![Hosting](https://img.shields.io/badge/fly.io%20%2B%20vercel-deployed-purple)]()

---

## Visão geral

Plataforma full-stack que centraliza informação confiável sobre o processo de imigração legal para a Espanha (FP — Formación Profesional, NIE, TIE, residência), com uma camada social ativa para acelerar a curva de aprendizado dos novos imigrantes.

**Produção:**
- Frontend: https://imigrar-espanha-site-web.vercel.app
- Backend API: https://imigrar-espanha-pb.fly.dev
- Admin PocketBase: https://imigrar-espanha-pb.fly.dev/_/

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 18 + Vite + TailwindCSS + shadcn/ui |
| Roteamento | React Router 6 |
| Backend | PocketBase v0.38 (Go + SQLite + JSVM hooks) |
| Auth | OAuth2 (Google) — Facebook preparado |
| Realtime | Server-Sent Events nativo do PocketBase |
| Moderação | OpenAI Moderation API (kill-switch via env) |
| Hosting backend | Fly.io (`gru` region, persistent volume) |
| Hosting frontend | Vercel (Edge Network) |
| Monorepo | npm workspaces |

---

## Funcionalidades

### Auth & Perfis
- Login social Google (OAuth2)
- Sincronização automática `users` → `profiles` (mesmo ID via hook)
- Upload de foto de perfil (JPG/PNG/GIF/WEBP, máx 5 MB)
- Ban granular (`is_banned`) com bloqueio de novas interações

### Comunidade
- **Fórum** com categorias, threads, replies em realtime
- **Chat ao vivo** por sala (subscribe via SSE), TTL visual de 6h para look "clean"
- **Blog** com editor rich-text, posts publicados/rascunho, comentários

### Gamificação COMIQUICE (5 ranques)
Sistema de pontos atômico (SQL `UPDATE points = points + N`) com bypass para clientes:

| Tier | Faixa | Identidade visual |
|---|---|---|
| 🛬 Imigrante sem Papel | 0–50 pts | Avatar opaco, badge tracejado cinza |
| 🇪🇸 Turista Estourado | 51–200 pts | Badge amber sólido |
| 🎓 Estudante de Intercâmbio | 201–600 pts | Avatar com borda emerald, badge gradient azul-teal |
| 📂 Residente com Arraigo | 601–1500 pts | Avatar `animate-pulse`, badge gradient purple-indigo |
| 👑 Cidadão Europeu | 1500+ pts ou cliente | Aura dourada animada, layout "Passaporte Biométrico" |

Pontuação por interação (atomic, sem race condition):
- Mensagem no chat: +1 · Comentário no blog: +2 · Resposta no fórum: +3
- Novo tópico no fórum: +5 · Artigo no blog: +10
- Bônus de tempo: +10 por mês de cadastro (computado client-side)

### Moderação
- Hook OpenAI Moderation que bloqueia conteúdo ofensivo **antes** do create
- FAIL-CLOSED (sem API key/quota → bloqueia preventivamente)
- Kill-switch via `MODERATION_ENABLED=false`
- Rate limiting server-side por collection
- Admin pode deletar mensagens individuais ou em bulk via PB Admin UI

### Pagamento & afiliados
- Webhook `POST /api/webhooks/payment` para integração com Hotmart/plataformas
- Header `X-Webhook-Secret` para autenticação
- Eventos: `approved` → `has_purchased = true` · `refunded`/`chargeback` → `false`

---

## Estrutura do monorepo

```
.
├── apps/
│   ├── pocketbase/
│   │   ├── pb_hooks/           # Hooks JSVM (cada handler 100% inline)
│   │   │   ├── moderate.pb.js          # OpenAI moderation
│   │   │   ├── rate_limit.pb.js        # Throttling por author
│   │   │   ├── sync_profile.pb.js      # users → profiles
│   │   │   ├── update_points.pb.js     # Atomic SQL increment
│   │   │   ├── payment_webhook.pb.js   # /api/webhooks/payment
│   │   │   └── update_thread_stats.pb.js
│   │   └── pb_migrations/      # Schema versionado
│   └── web/                    # React + Vite
│       ├── src/
│       │   ├── components/     # UI, RankBadge, RankedAvatar, etc.
│       │   ├── pages/          # Rotas (HomePage, ChatRoom, ProfilePage…)
│       │   ├── lib/            # pocketbase.js, rank.js
│       │   └── contexts/       # AuthContext
│       └── vercel.json
├── Dockerfile                  # PocketBase v0.38 alpine
├── fly.toml                    # Fly.io config (gru, volume, healthcheck)
├── deploy-hooks.ps1            # Deploy automatizado (git push + flyctl)
└── package.json                # npm workspaces
```

---

## Desenvolvimento local

**Pré-requisitos:** Node 22+, PowerShell ou bash, conta Fly.io (deploy).

```bash
# 1. Instalar dependências
npm install --legacy-peer-deps

# 2. Baixar binário PocketBase (uma vez)
cd apps/pocketbase
# Windows: baixe pocketbase_0.38.0_windows_amd64.zip de github.com/pocketbase/pocketbase
# Linux/macOS:
wget https://github.com/pocketbase/pocketbase/releases/download/v0.38.0/pocketbase_0.38.0_linux_amd64.zip
unzip pocketbase_0.38.0_linux_amd64.zip
chmod +x pocketbase

# 3. Variáveis de ambiente local
cat > .env <<EOF
OPENAI_API_KEY=sk-proj-...
PB_ENCRYPTION_KEY=$(openssl rand -hex 32)
MODERATION_ENABLED=true
EOF

# 4. Iniciar tudo (backend + frontend em paralelo)
cd ../..
npm run dev
```

Frontend em `http://localhost:5173`, backend em `http://localhost:8090`.

---

## Deploy

### Backend (PocketBase no Fly.io)

```powershell
# Primeira vez (criar app + volume + secrets)
flyctl auth login
flyctl apps create imigrar-espanha-pb
flyctl volumes create pb_data --size 1 --region gru
flyctl secrets set `
  PB_ENCRYPTION_KEY=$(openssl rand -hex 32) `
  PB_SUPERUSER_EMAIL=admin@example.com `
  PB_SUPERUSER_PASSWORD=<senha-forte> `
  OPENAI_API_KEY=sk-proj-... `
  PAYMENT_WEBHOOK_SECRET=<aleatorio-32-chars>

# Deploy contínuo (script automatizado)
.\deploy-hooks.ps1
```

### Frontend (Vercel)

Push para `main` → Vercel auto-deploy via integração GitHub.
Configurar env: `VITE_POCKETBASE_URL=https://imigrar-espanha-pb.fly.dev`.

---

## Variáveis de ambiente

| Variável | Onde | Função |
|---|---|---|
| `OPENAI_API_KEY` | Fly secret | OpenAI Moderation API |
| `MODERATION_ENABLED` | Fly secret | `false` desabilita hook (sem créditos OpenAI) |
| `PB_ENCRYPTION_KEY` | Fly secret | Cifra dados sensíveis no SQLite |
| `PB_SUPERUSER_EMAIL/PASSWORD` | Fly secret | Bootstrap do admin |
| `PAYMENT_WEBHOOK_SECRET` | Fly secret | Auth do webhook Hotmart |
| `RL_CHAT_MAX` | Fly env (opt) | Override do rate limit chat (default 60/min) |
| `VITE_POCKETBASE_URL` | Vercel env | URL do backend |

---

## Endpoints

### REST padrão (PocketBase)
- `POST /api/collections/users/auth-with-oauth2` — login Google
- `GET/POST /api/collections/{posts|replies|blog_posts|blog_comments|chat_messages}/records`
- `GET /api/collections/users/auth-methods` — providers ativos
- Realtime: `GET /api/realtime` (SSE)

### Custom
- `POST /api/webhooks/payment` — webhook Hotmart (requer header `X-Webhook-Secret`)
- `GET /api/health` — healthcheck

---

## Decisões técnicas relevantes

- **PB JSVM v0.38 não preserva closure entre callbacks** — todo handler `onRecord*` é escrito 100% inline, sem helpers top-level (lição custosa: `ReferenceError` no log).
- **Race condition em incrementos paralelos** — `points` é atualizado via `UPDATE` SQL atômico, não via `record.set + save`.
- **TTL chat é client-side** — backend mantém histórico (para preservar pontos contabilizados); frontend filtra `created >= now - 6h` + sweep periódico.
- **Pontos nunca são reduzidos** — mensagens ofensivas são bloqueadas pelo hook moderate ANTES do create, então nunca chegam a ganhar ponto.
- **Sync `users` → `profiles` fail-loud** — se profile não puder ser criado, signup falha (evita user órfão sem profile = FK violation em todos os creates futuros).

---

## Licença

Código proprietário © 2026 Gabriel Alves. Todos os direitos reservados.
