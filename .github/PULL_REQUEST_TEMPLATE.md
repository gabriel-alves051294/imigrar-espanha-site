## Summary

<!-- Provide a concise description of what this PR does.
     One paragraph maximum. If it needs more, the PR is probably too large. -->

## Related Issue

<!-- Every PR must be linked to an issue. Use one of:
     - Closes #<issue-number>   (auto-closes the issue on merge)
     - Fixes #<issue-number>
     - Refs #<issue-number>     (for partial work)
-->

Closes #

## Type of Change

<!-- Check all that apply. -->

- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] ✨ New feature (non-breaking change that adds functionality)
- [ ] 💥 Breaking change (fix or feature that changes existing behavior)
- [ ] 📝 Documentation update
- [ ] ♻️ Refactor (no functional change)
- [ ] ⚡ Performance improvement
- [ ] 🔒 Security fix
- [ ] 🏗️ Infrastructure / CI change

## What Changed

<!-- List the specific files/components changed and what was done.
     Be precise — the reviewer should not need to read all the code to understand the changes. -->

- `apps/web/src/...` — 
- `apps/pocketbase/pb_hooks/...` — 

## How to Test

<!-- Provide step-by-step instructions for the reviewer to validate this change locally. -->

1. 
2. 
3. 

**Expected result:**

## Pre-submission Checklist

<!-- Complete all items before requesting review. Unchecked required items = PR will not be reviewed. -->

### Code Quality
- [ ] `npm run lint` passes with no errors
- [ ] No `console.log` debug statements left in the code
- [ ] No commented-out dead code
- [ ] No hardcoded secrets, API keys, or environment-specific values

### PocketBase Hooks (if modified)
- [ ] All hook handlers are 100% self-contained inline (no top-level helpers)
- [ ] Numeric field updates use atomic SQL (`UPDATE ... SET field = field + N`)
- [ ] Hooks tested locally with PocketBase Admin UI
- [ ] Error paths log with `console.error()` including hook name

### Documentation
- [ ] README updated (if the change affects setup, architecture, or features)
- [ ] `.env.example` updated (if new environment variables were added)
- [ ] Inline code comments added for non-obvious logic

### Legal
- [ ] I have read the [LICENSE](../LICENSE) and understand the Contributor License Agreement
- [ ] I confirm this contribution is my original work and I have the right to assign its copyright to the Author

## Screenshots (if applicable)

<!-- For UI changes, include before/after screenshots. -->

| Before | After |
|---|---|
| | |

## Additional Notes

<!-- Anything else the reviewer should know? Performance implications, known limitations, follow-up work needed? -->
