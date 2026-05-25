# Contributing to Imigrar Espanha

Thank you for your interest in contributing! Before you start, please read this guide and the [LICENSE](../LICENSE) carefully.

> **Important:** All contributions are subject to the Contributor License Agreement defined in [LICENSE](../LICENSE). By submitting a PR, you irrevocably assign all rights in your contribution to the Author (Gabriel Alves Izaias).

---

## Table of Contents

- [Before You Start](#before-you-start)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Development Setup](#development-setup)
- [Commit Convention](#commit-convention)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)
- [What We Accept](#what-we-accept)
- [What We Do Not Accept](#what-we-do-not-accept)

---

## Before You Start

- Check if there's an existing [Issue](../../issues) or [Pull Request](../../pulls) for your topic before opening a new one.
- For significant changes, **open an issue first** to discuss the approach. This avoids wasted effort on PRs that won't be merged.
- Read the [Code of Conduct](./CODE_OF_CONDUCT.md). All contributors are expected to follow it.

---

## Reporting Bugs

Use the **Bug Report** issue template. Include:

1. Exact steps to reproduce the issue
2. Expected behavior vs. actual behavior
3. Browser/Node/OS version
4. Relevant logs from the PocketBase console or browser DevTools
5. Screenshots or screen recordings when applicable

> For **security vulnerabilities**, do NOT open a public issue. Follow [SECURITY.md](./SECURITY.md) instead.

---

## Suggesting Features

Use the **Feature Request** issue template. Explain:

- The problem or gap you've identified in the immigration hub
- Your proposed solution
- Any alternatives you considered
- Why this benefits the broader community (not just your use case)

---

## Development Setup

```bash
# 1. Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/imigrar-espanha-site.git
cd imigrar-espanha-site

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Configure environment
cp .env.example .env
# Edit .env with your local values

# 4. Download PocketBase binary (see README Quick Start section)

# 5. Run the full stack
npm run dev
```

Create a branch for your work:

```bash
git checkout -b fix/short-description-of-fix
# or
git checkout -b feat/short-description-of-feature
```

---

## Commit Convention

This project follows **[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)**.

### Format

```
<type>(<scope>): <short description>

[optional body]

[optional footer: Closes #<issue-number>]
```

### Types

| Type | Use for |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, whitespace (no logic change) |
| `refactor` | Code restructuring without feature/fix |
| `perf` | Performance improvements |
| `test` | Adding or fixing tests |
| `chore` | Build process, dependency updates |
| `ci` | CI/CD configuration |
| `revert` | Reverting a previous commit |

### Scopes (examples)

`auth`, `forum`, `chat`, `blog`, `gamification`, `moderation`, `webhook`, `deploy`, `docs`, `ui`

### Examples

```bash
feat(chat): add message pinning for moderators
fix(moderation): handle OpenAI quota exhaustion gracefully
docs(readme): update Quick Start with Windows instructions
chore(deps): upgrade pocketbase to v0.39
refactor(gamification): extract point calculation to shared utility
```

### Breaking Changes

Add `!` after the type and include a `BREAKING CHANGE:` footer:

```
feat(auth)!: replace Google OAuth flow with PKCE

BREAKING CHANGE: requires updating VITE_POCKETBASE_URL env variable
```

---

## Code Style

### JavaScript / JSX (Frontend)

- **ESLint** config is in `apps/web/eslint.config.mjs` — run `npm run lint` before pushing
- Use **functional components** and **React hooks** exclusively
- Prefer named exports over default exports for components
- Keep components focused; extract logic to custom hooks in `src/hooks/`
- Use **Tailwind CSS** utility classes; avoid inline styles

### PocketBase JSVM Hooks

- Every `onRecord*` handler must be **100% self-contained inline** — no top-level helper functions (PB v0.38 JSVM does not preserve closures across hook callbacks)
- Always use **atomic SQL** for numeric field updates (`UPDATE ... SET field = field + N`)
- Log errors with `console.error()` including hook name and collection for traceability
- Test hooks locally with PocketBase Admin UI before pushing

### General

- No commented-out dead code in PRs
- No `console.log` debug statements (use `console.error` for error paths only)
- Environment-specific values must go in `.env`, never hardcoded

---

## Pull Request Process

1. **Branch off `main`** — never push directly to `main`
2. **Keep PRs focused** — one feature or fix per PR
3. **Fill out the PR template completely** — PRs with incomplete templates will be closed
4. **Link the related issue** — use `Closes #<number>` in the PR description
5. **All lint checks must pass** before requesting review
6. **Describe your changes clearly** — what changed, why, and how to test it
7. **Be patient** — reviews are done by a single maintainer in spare time

PRs that include unrelated changes, lack issue linkage, or violate the license terms will be closed without review.

---

## What We Accept

- Bug fixes with clear reproduction steps
- Performance improvements with measurable impact
- Documentation corrections and improvements
- Accessibility improvements
- Security fixes (coordinate via [SECURITY.md](./SECURITY.md) first)
- Dependency updates that resolve known vulnerabilities

## What We Do Not Accept

- Refactors purely for style preference with no functional benefit
- New dependencies without prior discussion in an issue
- Changes to the LICENSE, business logic, pricing, or affiliate system
- UI/UX overhauls without prior design discussion
- AI-generated PRs submitted without human review and understanding of the code

---

## Questions?

Open a [GitHub Discussion](../../discussions) or reach out directly:  
**gabrielalves051294@gmail.com**
