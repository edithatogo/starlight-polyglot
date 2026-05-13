# Plan: migrate_innovate_20260513

## Phase 1: Starlight Site Setup
- [ ] Clone innovate repo and create `docs/astro-site/` Starlight project (references: REQ-MIG-001)
- [ ] Configure `astro.config.mjs` with Starlight and polyglot plugin (Python handler) (references: REQ-MIG-001)
- [ ] Set up pnpm workspace or direct dependency on starlight-polyglot (references: REQ-MIG-001)

## Phase 2: Content Migration
- [ ] Audit existing Sphinx RST pages and map to new Starlight structure (references: REQ-MIG-001)
- [ ] Convert RST → MDX for each documentation page (references: REQ-MIG-001)
- [ ] Set up sidebar navigation matching old structure where possible (references: REQ-MIG-001)
- [ ] Configure polyglot plugin `entryPoints` pointing at innovate's Python source modules (references: REQ-MIG-001)
- [ ] Build and verify auto-generated API docs alongside hand-written content (references: REQ-MIG-001)

## Phase 3: Conductor & CI/CD
- [ ] Create `conductor/tech-stack.md` in innovate repo documenting Starlight stack (references: REQ-MIG-005)
- [ ] Create `conductor/tracks/migrate_starlight/` with metadata, spec, plan documenting the migration (references: REQ-MIG-006)
- [ ] Create `.github/workflows/docs.yml` for Starlight build + deploy to Pages (references: REQ-MIG-001)
- [ ] Add `starlight-links-validator` to CI workflow (references: REQ-MIG-001)

## Phase 4: Transition & Verification
- [ ] Add deprecation notice to old Sphinx docs or set up redirect (references: REQ-MIG-001)
- [ ] Run full docs build and verify no broken links (references: REQ-MIG-001)
- [ ] Verify polyglot plugin generates correct Python API pages (references: REQ-MIG-001)
- [ ] Create PR against innovate repo with all migration changes
