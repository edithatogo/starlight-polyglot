# Plan: ci_cd_20260513

## Phase 1: CI Workflow
- [ ] Create `.github/workflows/ci.yml` with pnpm setup, Node.js 22, dependency caching (references: REQ-CI-001, DGN-CI-001)
- [ ] Add ESLint + Prettier check step to CI (references: REQ-QA-003, REQ-QA-004)
- [ ] Add TypeScript strict type-check step (`tsc --noEmit`) (references: REQ-QA-002)
- [ ] Add Vitest test step with 90% line coverage threshold (references: REQ-CI-002, REQ-QA-001)
- [ ] Add size-limit bundle check step with 50KB threshold (references: REQ-CI-003, REQ-QA-008)
- [ ] Add tsup build step to verify package builds (references: REQ-CI-001)

## Phase 2: Release Workflow
- [ ] Create `.github/workflows/release.yml` triggered by Changesets version PR merge (references: REQ-CI-005, DGN-CI-001)
- [ ] Configure `changesets/action` for version management and changelog generation (references: REQ-CI-005)
- [ ] Add npm publish step with `--provenance` flag for SLSA Level 3 (references: REQ-CI-004)
- [ ] Add GitHub Release creation step via Changesets (references: REQ-CI-005)
- [ ] Configure OIDC identity provider for npm provenance (references: REQ-CI-004)

## Phase 3: Docs Deployment Workflow
- [ ] Create `.github/workflows/docs.yml` triggered on main branch pushes (references: REQ-CI-006, DGN-CI-001)
- [ ] Add Starlight docs build step with Starlight dependencies installed (references: REQ-CI-006)
- [ ] Add `starlight-links-validator` check during docs build (references: REQ-DOC-003)
- [ ] Add GitHub Pages deployment via `actions/deploy-pages` (references: REQ-CI-006)

## Phase 4: Dependency Automation
- [ ] Configure `renovate.json` with grouped non-major updates, auto-merge patches, weekly schedule (references: REQ-CI-007)
- [ ] Configure `.github/dependabot.yml` for npm security alerts only (references: REQ-CI-007)
- [ ] Verify `size-limit.json` thresholds are set correctly (references: REQ-CI-003, REQ-QA-008)
- [ ] Test all workflows with dry runs before final sign-off
