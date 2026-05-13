# Track: repo_init_20260513

## Fulfills: REQ-CORE-001

## Objective
Initialize the GitHub repository with SOTA configuration: .gitignore, LICENSE, README, CODEOWNERS, issue templates, security policy, renovate, pre-commit hooks, changesets, and branch protection rules.

## Acceptance Criteria
1. `.gitignore` excludes node_modules, dist, .DS_Store, .env, coverage
2. `LICENSE` — MIT
3. `README.md` — badge bar, npm installation, one-line usage, links to docs
4. `.github/CODEOWNERS` — default owner
5. `.github/ISSUE_TEMPLATE/bug_report.md` — structured bug report
6. `.github/ISSUE_TEMPLATE/feature_request.md` — structured feature request + handler language checkbox
7. `SECURITY.md` — vulnerability reporting policy
8. `.github/dependabot.yml` — npm security updates (Renovate handles feature updates)
9. `renovate.json` — grouped deps, auto-merge for patches
10. `.changeset/config.json` — changeset configuration
11. `pnpm-workspace.yaml` — workspace definition
12. `pre-commit-config.yaml` — commit hooks

## Dependencies
- None (this is the root track)
