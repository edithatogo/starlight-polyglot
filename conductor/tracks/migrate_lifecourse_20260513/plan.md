# Plan: migrate_lifecourse_20260513

## Phase 1: Starlight Site Setup (Greenfield)
- [ ] Clone lifecourse repo and create `docs/astro-site/` Starlight project (references: REQ-MIG-004)
- [ ] Configure `astro.config.mjs` with Starlight and polyglot plugin (Julia + optionally R handler) (references: REQ-MIG-004)
- [ ] Set up pnpm workspace dependency on starlight-polyglot (references: REQ-MIG-004)

## Phase 2: Hand-Written Documentation
- [ ] Create landing page: project overview, purpose, key features (references: REQ-MIG-004)
- [ ] Create getting started guide: installation, quick start, basic usage (references: REQ-MIG-004)
- [ ] Create usage guide: examples and common workflows (references: REQ-MIG-004)
- [ ] Create API reference overview pointing to auto-generated pages (references: REQ-MIG-004)
- [ ] Configure sidebar navigation for hand-written pages (references: REQ-MIG-004)

## Phase 3: Polyglot Plugin Integration
- [ ] Configure polyglot plugin `handlers.julia.entryPoints` pointing at lifecourse Julia modules (references: REQ-MIG-004)
- [ ] Optionally configure `handlers.r.entryPoints` for R source (references: REQ-MIG-004)
- [ ] Build site and verify auto-generated Julia API pages render correctly (references: REQ-MIG-004)
- [ ] Integrate auto-generated API sidebar group with hand-written pages (references: REQ-MIG-004)

## Phase 4: Conductor & CI/CD
- [ ] Create `conductor/tech-stack.md` documenting Starlight + polyglot stack (references: REQ-MIG-005)
- [ ] Create `conductor/tracks/migrate_starlight/` with documentation setup track (references: REQ-MIG-006)
- [ ] Create `.github/workflows/docs.yml` for Starlight build + deploy (references: REQ-MIG-004)
- [ ] Add `starlight-links-validator` to CI (references: REQ-MIG-004)

## Phase 5: Verification
- [ ] Build full docs site and verify all pages render correctly (references: REQ-MIG-004)
- [ ] Verify Julia handler generates complete API documentation (references: REQ-MIG-004)
- [ ] Verify no broken links across the site (references: REQ-MIG-004)
- [ ] Create PR against lifecourse repo with all documentation setup changes
