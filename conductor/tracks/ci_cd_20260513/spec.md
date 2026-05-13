# Track: ci_cd_20260513

## Fulfills: REQ-CI-001, REQ-CI-002, REQ-CI-003, REQ-CI-004, REQ-CI-005, REQ-CI-006, REQ-CI-007

## Context / Problem Statement

The CI/CD pipeline is essential for maintaining code quality and automating releases for starlight-polyglot. With 7 language handlers, a plugin core, and a Starlight documentation site, the pipeline must verify every PR across multiple dimensions: linting, type-checking, testing with coverage thresholds, bundle size limits, and build verification. For releases, the pipeline must publish to npm with SLSA Level 3 provenance attestation, create GitHub Releases with changelogs, and deploy the Starlight documentation site to GitHub Pages.

Per DGN-CI-001, the pipeline consists of three workflows: `ci.yml` for PR checks (lint, type-check, test, build), `release.yml` for npm publishing via changesets, and `docs.yml` for documentation deployment. Per REQ-CI-007, Renovate must be configured for grouped, auto-merged dependency updates to keep dependencies fresh without manual intervention.

## Acceptance Criteria

1. `.github/workflows/ci.yml` created — runs on PR and push to main
2. CI workflow executes: install → lint (ESLint) → format check (Prettier) → type-check (tsc --noEmit) → test (Vitest with coverage) → build (tsup)
3. CI fails if line coverage drops below 90% (via Vitest `--coverage.thresholds.lines`) (REQ-CI-002)
4. CI fails if bundle size exceeds 50KB (via `size-limit`) (REQ-CI-003)
5. `.github/workflows/release.yml` created — triggers on version label via Changesets
6. Release workflow publishes to npm with SLSA Level 3 provenance (`--provenance` flag) (REQ-CI-004)
7. Release workflow creates GitHub Release with auto-generated changelog from Changesets (REQ-CI-005)
8. `.github/workflows/docs.yml` created — builds Starlight docs site and deploys to GitHub Pages (REQ-CI-006)
9. `renovate.json` configured with grouped dependencies and auto-merge for patch updates (REQ-CI-007)
10. `.github/dependabot.yml` configured for npm security updates only

## Technical Approach

Create three GitHub Actions workflow files following the architecture defined in DGN-CI-001. `ci.yml` uses a matrix strategy where possible, runs on `ubuntu-latest` with Node.js 22, and uses pnpm for dependency management. `release.yml` uses the `changesets/action` to manage version bumps and changelogs, then publishes via `npm publish --provenance`. `docs.yml` uses `actions/deploy-pages` for GitHub Pages deployment. All workflows include appropriate caching for pnpm store and npm packages. Renovate configuration groups all non-major updates into a single PR per week with auto-merge for patches.

## Files to Create/Modify

- `.github/workflows/ci.yml` — CI workflow
- `.github/workflows/release.yml` — Release workflow
- `.github/workflows/docs.yml` — Documentation deployment workflow
- `renovate.json` — Renovate config (modify from repo_init)
- `.github/dependabot.yml` — Dependabot security updates (modify from repo_init)
- `size-limit.json` — Bundle size config (may already exist from scaffold)

## Dependencies

- All Phase 2 handlers (handler_python, handler_typescript, handler_rust, handler_r, handler_julia, handler_csharp, handler_go)
- plugin_scaffold_20260513 (provides package structure with build config)
- repo_init_20260513 (provides initial renovate.json, dependabot.yml)
