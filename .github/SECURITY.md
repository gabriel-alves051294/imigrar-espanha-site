# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| `main` branch (latest) | ✅ Active |
| Older commits | ❌ No backports |

Only the current `main` branch receives security fixes.

---

## Scope

This security policy covers:

- **Authentication & session handling** (PocketBase OAuth2 flows, JWT tokens)
- **API key exposure** (OpenAI API key, PB encryption key, webhook secrets)
- **Injection vulnerabilities** (SQLite via PocketBase ORM, JSVM hook inputs)
- **Moderation bypass** (circumventing the OpenAI moderation hook)
- **Authorization flaws** (accessing records beyond one's permission scope)
- **Webhook authentication** (Hotmart payment webhook `X-Webhook-Secret` bypass)
- **SSRF / data exfiltration** via JSVM hooks
- **Rate limiting bypass** affecting platform stability

---

## Reporting a Vulnerability

> ⚠️ **Do NOT open a public GitHub Issue for security vulnerabilities.**  
> Public disclosure before a fix is available puts all users at risk.

### Preferred Channel

Send a detailed report via **private email**:

**gabrielalves051294@gmail.com**

Use the subject line: `[SECURITY] <short description>`

### What to Include

Please provide as much of the following as possible:

1. **Vulnerability type** (e.g., IDOR, XSS, API key leakage, auth bypass)
2. **Affected component** (e.g., `pb_hooks/moderate.pb.js`, frontend auth flow)
3. **Steps to reproduce** — clear, minimal reproduction steps
4. **Proof of concept** — code snippet, request/response logs, or screenshots
5. **Impact assessment** — what an attacker could do with this vulnerability
6. **Suggested fix** (optional but appreciated)

### PGP Encryption (Optional)

If your report contains highly sensitive information (e.g., proof of credential extraction), you may request a PGP public key before sending.

---

## Response Timeline

| Phase | Target Time |
|---|---|
| Acknowledgment of report | ≤ 48 hours |
| Initial assessment | ≤ 5 business days |
| Fix or mitigation published | ≤ 30 days (critical: ≤ 7 days) |
| Public disclosure (coordinated) | After fix is deployed |

The maintainer will keep you informed at each stage.

---

## Disclosure Policy

This project follows **responsible coordinated disclosure**:

1. Reporter submits privately
2. Maintainer confirms and reproduces the issue
3. Fix is developed and deployed
4. Reporter is credited (unless they prefer anonymity)
5. A security advisory is published on GitHub (if severity warrants it)

We ask reporters to refrain from public disclosure until:
- A fix has been deployed to production, **or**
- 90 days have passed since the initial report (whichever comes first)

---

## Out of Scope

The following are **not** considered security vulnerabilities for this project:

- Issues requiring physical access to the server or Fly.io account
- Self-XSS that requires the attacker to attack themselves
- Rate limiting on non-security-critical endpoints
- Clickjacking on pages with no sensitive actions
- Missing security headers that don't lead to exploitable impact
- Social engineering attacks
- Issues in third-party services (Fly.io, Vercel, OpenAI, Hotmart) — report those directly to the respective vendors

---

## Security Best Practices for Local Development

When running this project locally:

- **Never commit `.env` files** — they are gitignored by default
- **Use dummy API keys** for local testing (`MODERATION_ENABLED=false`)
- **Rotate all secrets** if you accidentally push them to any public branch
- **Use `openssl rand -hex 32`** to generate strong `PB_ENCRYPTION_KEY` and `PAYMENT_WEBHOOK_SECRET` values

---

## Recognition

Reporters who responsibly disclose valid vulnerabilities will be credited in the release notes and may be listed in a `SECURITY_HALL_OF_FAME.md` file (with consent).

Thank you for helping keep this platform safe for the immigration community. 🛡️
