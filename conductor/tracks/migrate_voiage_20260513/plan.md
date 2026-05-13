# Plan: migrate_voiage_20260513

## Phase 1: Starlight Site Setup
- [ ] Clone voiage repo and create `docs/astro-site/` Starlight project (references: REQ-MIG-002)
- [ ] Configure `astro.config.mjs` with Starlight and polyglot plugin (Python + TypeScript handlers) (references: REQ-MIG-002)
- [ ] Set up pnpm workspace dependency on starlight-polyglot (references: REQ-MIG-002)

## Phase 2: Content Migration
- [ ] Audit existing Sphinx RST pages and map to new Starlight structure (references: REQ-MIG-002)
- [ ] Convert RST → MDX for each documentation page (references: REQ-MIG-002)
- [ ] Configure polyglot plugin `handlers.python.entryPoints` pointing at Python modules (references: REQ-MIG-002)
- [ ] Configure polyglot plugin `handlers.typescript.entryPoints` pointing at TypeScript source (references: REQ-MIG-002)
- [ ] Set up sidebar with hand-written docs, Python API group, TypeScript API group (references: REQ-MIG-002)

## Phase 3: Conductor & CI/CD
- [ ] Create/update `conductor/tech-stack.md` documenting Starlight stack (references: REQ-MIG-005)
- [ ] Create `conductor/tracks/migrate_starlight/` with full migration documentation (references: REQ-MIG-006)
- [ ] Create `.github/workflows/docs.yml` for Starlight build + deploy (references: REQ-MIG-002)
- [ ] Add `starlight-links-validator` to CI (references: REQ-MIG-002)

## Phase 4: Verification
- [ ] Build docs site and verify both Python and TypeScript API pages render correctly (references: REQ-MIG-002)
- [ ] Verify old Sphinx docs are deprecated or redirected (references: REQ-MIG-002)
- [ ] Verify no broken links via links-validator (references: REQ-MIG-002)
- [ ] Create PR against voiage repo with all migration changes
