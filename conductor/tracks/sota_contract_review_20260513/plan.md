# Plan: sota_contract_review_20260513

## Phase 1: SOTA Contract Definition
- [ ] Create `conductor/sota-contract.md` with defined categories and criteria (references: REQ-SOTA-001)
- [ ] Code Quality criteria: strict TypeScript, zero ESLint warnings, Prettier compliance, no `any` types (references: REQ-SOTA-001)
- [ ] Testing criteria: >90% coverage, handler contract tests, golden fixture tests, E2E tests (references: REQ-SOTA-001)
- [ ] Documentation criteria: complete getting-started, config reference, handler guide, links-validator pass (references: REQ-SOTA-001)
- [ ] CI/CD criteria: ci.yml passes all gates, release.yml has SLSA provenance, docs.yml deploys (references: REQ-SOTA-001)
- [ ] Security criteria: npm provenance, dependabot, Renovate, no known vulnerabilities (references: REQ-SOTA-001)
- [ ] Performance criteria: bundle size <50KB, subprocess timeout 60s, cache hit <1s (references: REQ-SOTA-001)
- [ ] Governance criteria: semantic commits, changesets, CODEOWNERS, CONTRIBUTING.md, issue templates (references: REQ-SOTA-001)

## Phase 2: Automated Audit Script
- [ ] Create `conductor/scripts/sota-audit.mjs` as a Node.js script (references: REQ-SOTA-004)
- [ ] Implement automated checks for each criterion that can be verified programmatically (references: REQ-SOTA-004)
- [ ] Run `tsc --noEmit` and verify zero errors (references: REQ-SOTA-004)
- [ ] Run ESLint and verify zero warnings (references: REQ-SOTA-004)
- [ ] Run Prettier check and verify pass (references: REQ-SOTA-004)
- [ ] Read Vitest coverage report and verify >=90% (references: REQ-SOTA-004)
- [ ] Read size-limit output and verify <50KB (references: REQ-SOTA-004)
- [ ] Check renovate.json, dependabot.yml, changeset config are present and valid (references: REQ-SOTA-004)
- [ ] Verify CI workflow files exist and contain required steps (references: REQ-SOTA-004)
- [ ] Output structured JSON report to stdout and write to `conductor/audit/report-<date>.json` (references: REQ-SOTA-004)

## Phase 3: Manual Audit & Evidence Collection
- [ ] Review documentation completeness: are all required pages present and comprehensive? (references: REQ-SOTA-002)
- [ ] Review code review practices: are PRs using the defined template? Are reviews thorough? (references: REQ-SOTA-002)
- [ ] Review handler implementations: do all 7 handlers follow the contract and patterns? (references: REQ-SOTA-002)
- [ ] Review migration repos: are migrated docs sites complete and functional? (references: REQ-SOTA-002)
- [ ] Collect evidence files in `conductor/audit/evidence/` for manual checks (references: REQ-SOTA-002)
- [ ] Compile full audit report combining automated and manual results (references: REQ-SOTA-002)

## Phase 4: Gap Analysis & Improvement Tracks
- [ ] Identify any failed criteria from audit results (references: REQ-SOTA-003)
- [ ] For each failed criterion, create `conductor/tracks/sota-gap-<name>/` with metadata, spec, plan (references: REQ-SOTA-003)
- [ ] Each gap track includes: what's broken, how to fix, priority, effort estimate (references: REQ-SOTA-003)
- [ ] Update `conductor/tracks.md` with new gap tracks (references: REQ-SOTA-003)
- [ ] Update `conductor/index.md` to reference SOTA contract and audit results (references: REQ-SOTA-004)

## Phase 5: Repeatability & Sign-off
- [ ] Verify `node conductor/scripts/sota-audit.mjs` runs successfully on demand (references: REQ-SOTA-004)
- [ ] Document how to re-run audit in `conductor/sota-contract.md` (references: REQ-SOTA-004)
- [ ] Commit SOTA contract, audit report, and audit script to repo (references: REQ-SOTA-004)
- [ ] Mark sota_contract_review track as complete after all gap tracks are created (references: REQ-SOTA-002)
