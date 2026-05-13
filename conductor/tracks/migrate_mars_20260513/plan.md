# Plan: migrate_mars_20260513

## Phase 1: Starlight Site Setup
- [ ] Clone mars repo and create `docs/astro-site/` Starlight project (references: REQ-MIG-003)
- [ ] Configure `astro.config.mjs` with Starlight and polyglot plugin (Go handler) (references: REQ-MIG-003)
- [ ] Set up pnpm workspace dependency on starlight-polyglot (references: REQ-MIG-003)

## Phase 2: Content Migration from MkDocs
- [ ] Copy MkDocs Markdown pages from `docs/` to `docs/astro-site/src/content/docs/` (references: REQ-MIG-003)
- [ ] Add Starlight frontmatter (title, description, sidebar) to each migrated page (references: REQ-MIG-003)
- [ ] Reorganize page hierarchy to fit Starlight's sidebar navigation model (references: REQ-MIG-003)
- [ ] Update internal links between pages (references: REQ-MIG-003)
- [ ] Configure polyglot plugin Go handler with `modulePath` pointing at mars Go modules (references: REQ-MIG-003)

## Phase 3: Conductor & CI/CD
- [ ] Create/update `conductor/tech-stack.md` documenting Starlight stack (references: REQ-MIG-005)
- [ ] Create `conductor/tracks/migrate_starlight/` with migration documentation (references: REQ-MIG-006)
- [ ] Create `.github/workflows/docs.yml` for Starlight build + deploy (references: REQ-MIG-003)
- [ ] Add `starlight-links-validator` to CI (references: REQ-MIG-003)
- [ ] Add deprecation notice to `mkdocs.yml` pointing to new Starlight site (references: REQ-MIG-003)

## Phase 4: Verification
- [ ] Build docs site and verify migrated MkDocs content renders correctly (references: REQ-MIG-003)
- [ ] Verify Go handler generates API pages from mars Go source (references: REQ-MIG-003)
- [ ] Verify no broken links (references: REQ-MIG-003)
- [ ] Create PR against mars repo with all migration changes
