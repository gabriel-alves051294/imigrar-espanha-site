# Guia para leigo — Como colocar a comunidade no ar

> Sem código, sem terminal. Só chats e formulários no navegador.
> Tempo total: ~1h30 espalhados em 3 a 14 dias (o AdSense demora pra aprovar).

---

## Em 4 linhas

- Seu site React já está pronto e está no Hostinger.
- O "cérebro" da comunidade (login, fórum, chat, fotos) precisa rodar num programa chamado **PocketBase**.
- O Hostinger Horizons hospeda esse PocketBase pra você — só precisa **ativar e configurar 3 chaves grátis**.
- Você não precisa programar nada. Tudo é colar texto em formulário.

---

## Vocabulário rápido (só pra você não se perder)

| Palavra | O que é |
|---|---|
| **PocketBase** | É como o "Excel" da sua comunidade: guarda usuários, posts, fotos. Tem uma tela de admin onde você vê tudo. |
| **OAuth Google** | Botão "Entrar com Google" do seu site. Você precisa pedir permissão pro Google pra usar isso. |
| **Perspective API** | Robô do Google que lê uma mensagem e diz se ela é tóxica. Grátis até 1 mensagem por segundo. |
| **AdSense** | Programa que coloca anúncios no seu site e te paga. Demora 3 a 14 dias pra aprovar seu site. |
| **Chave / Token / ID** | Senha técnica que você cola em um campo. Tipo "abc-123-xyz". |

---

## ETAPA 1 — Pedir pro Horizons ativar o PocketBase (5 min)

**Volte no chat do Hostinger Horizons.** Cole esta mensagem exatamente:

```
Preciso da URL do painel admin do PocketBase deste projeto.
Também crie pra mim uma conta de superuser com:
- Email: gabrielalves051294@gmail.com
- Me mande a senha temporária no chat

Confirme também que os hooks abaixo já estão ativos no PocketBase do projeto:
- moderate.pb.js
- sync_profile.pb.js
- update_thread_stats.pb.js
- rate_limit.pb.js
E que as migrations rodaram (collections profiles, categories, posts, replies, chat_messages, blog_posts, blog_comments, images existem).
```

Ele vai te responder com **uma URL** (tipo `https://meu-projeto.pockethost.io/_/` ou parecido) e **uma senha temporária**.

**Anote essa URL e essa senha.** Você vai precisar.

---

## ETAPA 2 — Criar conta no Google Cloud e pegar a Perspective API key (10 min, grátis)

A Perspective API é o que vai bloquear mensagens tóxicas automaticamente.

1. Abra <https://console.cloud.google.com> e faça login com sua conta Google.
2. No topo, clique no seletor de projeto → **"Novo projeto"** → nome: `imigrar-espanha` → criar.
3. No menu de busca da página, procure **"Perspective Comment Analyzer API"** → clique em **Ativar**.
4. Menu lateral → **APIs e Serviços → Credenciais** → **Criar credencial → Chave de API**.
5. Vai aparecer uma chave tipo `AIzaSyXXXXXXXXXXXXXXXXXXXX`. **Copie e cole num bloco de notas.** Vou chamar de `PERSPECTIVE_KEY`.

> Não compartilhe essa chave em chat público. Trate como senha.

---

## ETAPA 3 — Configurar "Entrar com Google" (15 min, grátis)

1. Ainda em <https://console.cloud.google.com>, mesmo projeto, vá em **APIs e Serviços → Tela de permissão OAuth**.
2. Tipo: **Externo** → Criar. Preencha:
   - Nome do app: `Comunidade Imigrar para Espanha`
   - Email de suporte: o seu
   - Logo: opcional
   - Domínios autorizados: `imigrarparaespanha.com.br`
   - Email de contato do desenvolvedor: o seu
3. Salvar e continuar (pode pular Scopes e Test users).
4. Agora vá em **Credenciais → Criar credencial → ID do cliente OAuth**.
5. Tipo de aplicativo: **Aplicativo da Web**. Nome: `Comunidade`.
6. **URIs de redirecionamento autorizados** → Adicionar URI:

   Cole a URL do PocketBase da Etapa 1 e adicione `/api/oauth2-redirect` no final. Exemplo:

   ```
   https://meu-projeto.pockethost.io/api/oauth2-redirect
   ```

7. Clique Criar. Aparecem dois valores:
   - **ID do cliente** (termina com `.apps.googleusercontent.com`) — copie como `GOOGLE_CLIENT_ID`
   - **Chave secreta do cliente** (string aleatória) — copie como `GOOGLE_CLIENT_SECRET`

---

## ETAPA 4 — Colar as chaves no painel do PocketBase (10 min)

1. Abra a URL do admin PocketBase (da Etapa 1) no navegador.
2. Faça login com email e a senha temporária. **Mude a senha** ao entrar.
3. No menu lateral, **Settings → Auth providers → Google**:
   - Ative o switch
   - Client ID: cole o `GOOGLE_CLIENT_ID` da Etapa 3
   - Client Secret: cole o `GOOGLE_CLIENT_SECRET` da Etapa 3
   - Salvar.
4. **Para a Perspective API key:** volte ao chat do Horizons e cole:

   ```
   Configure a variável de ambiente PERSPECTIVE_API_KEY do PocketBase com este valor:
   AIzaSyXXXXXXXXXXXXXXXX
   ```
   (Troque pelo seu valor real da Etapa 2.)

   O Horizons vai cuidar de injetar isso no serviço PocketBase e reiniciar.

---

## ETAPA 5 — Inscrever no Google AdSense (espera 3 a 14 dias)

Você pode fazer isso em paralelo com tudo acima.

1. Abra <https://www.google.com/adsense>.
2. Adicione seu site: `imigrarparaespanha.com.br`.
3. Preencha endereço, dados de pagamento.
4. O Google vai te dar um código `ca-pub-XXXXXXXXXXXXXXXX` (já está no seu site como `ca-pub-0000000000000000` provisório).
5. **Espere o email de aprovação.** Pode levar de 3 dias a 2 semanas. Eles avaliam se o site tem conteúdo suficiente (criar uns 3 a 5 posts de blog ajuda muito).
6. Quando aprovar, volte ao chat do Horizons e cole:

   ```
   Substitua a string ca-pub-0000000000000000 por ca-pub-SEUNÚMEROAQUI em todos os arquivos: index.html, public/ads.txt.
   Depois publique o site.
   ```

---

## ETAPA 6 — Publicar o site (2 min)

No chat do Horizons:

```
Publique o site agora. Quero ver as mudanças em https://imigrarparaespanha.com.br
```

---

## ETAPA 7 — Testar (10 min)

Abra <https://imigrarparaespanha.com.br/comunidade> num navegador anônimo:

| Teste | Esperado |
|---|---|
| Clica em "Entrar" no canto superior direito | Popup com "Continuar com Google" |
| Login com sua conta Google | Você vê seu avatar no canto |
| Cria um tópico de teste | Aparece na lista |
| Tenta criar um post com a palavra "filhadaputa" | Bloqueado com mensagem de moderação |
| Acessa `/comunidade/chat/geral` | Caixa de chat aparece |

Se algo falhar, abra o console do navegador (`F12` → aba **Console**) e me mande o erro vermelho — eu te ajudo a destravar.

---

## O que adiar pra depois

Estas coisas ESTÃO PRONTAS no código, mas você não precisa ativar agora:

- **Filtro de imagens nudes (Cloudflare Worker)** — só ative se virem trolls subindo foto inadequada. Por enquanto, o site bloqueia formatos errados e arquivos grandes; é o suficiente pra começar.
- **Login com Facebook** — começa só com Google. Você pode adicionar Facebook depois pelo mesmo painel (Settings → Auth providers → Facebook).
- **Login com Apple** — só vale se ver usuários iPhone reclamando. Custa USD 99/ano de Apple Developer.

---

## Se travar em algum passo

- **Horizons reclamar que "não pode acessar PocketBase"**: peça pra ele te mandar a URL e a senha. Ele tem acesso.
- **Google Cloud pedir cartão de crédito**: Perspective API é gratuita, mas o Google pede um cartão pra ativar APIs em geral. **Não vai cobrar nada até passar de 1 requisição/segundo** (você não vai chegar perto disso). Pode adicionar o cartão sem medo.
- **OAuth retornar "redirect_uri_mismatch"**: você errou a URL do passo 3.6. Reabra e confira que termina exatamente com `/api/oauth2-redirect`.
- **Algum erro vermelho no console**: tire print do erro e me mande. Eu reviso o código.

---

## Resumo das chaves que você vai gerar

Anote tudo num bloco de notas seguro:

```
PERSPECTIVE_KEY    = AIzaSy...                              (Etapa 2)
GOOGLE_CLIENT_ID   = 123456-abc.apps.googleusercontent.com  (Etapa 3)
GOOGLE_CLIENT_SECRET = GOCSPX-XxXxXxXx                      (Etapa 3)
ADSENSE_ID         = ca-pub-1234567890123456                (Etapa 5, após aprovação)
URL_POCKETBASE     = https://meu-projeto.pockethost.io      (Etapa 1)
SENHA_PB_ADMIN     = (a que você definiu no passo 4.2)
```

**Nunca compartilhe `GOOGLE_CLIENT_SECRET` nem `PERSPECTIVE_KEY` em chat público.**

---

## Custo previsto

| Serviço | Custo |
|---|---|
| Hostinger | já pago |
| PocketBase no Horizons | incluso |
| Perspective API | USD 0 |
| Google AdSense | USD 0 (vai ser sua **receita**) |
| Cloudflare Worker (se ativar) | USD 0 |
| **Total novo** | **USD 0** |
