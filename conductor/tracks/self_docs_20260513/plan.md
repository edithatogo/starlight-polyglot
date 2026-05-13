# Plan: self_docs_20260513

## Phase 1: Docs Site Scaffold
- [ ] Create `docs/astro-site/package.json` with astro, @astrojs/starlight, starlight-polyglot as workspace deps (references: REQ-DOC-001)
- [ ] Create `docs/astro-site/astro.config.mjs` with Starlight config and polyglot plugin pointing at plugin source (references: REQ-DOC-002)
- [ ] Create `docs/astro-site/tsconfig.json` with strict mode (references: REQ-DOC-001)
- [ ] Update root `pnpm-workspace.yaml` to include `docs/astro-site` (references: REQ-DOC-001)

## Phase 2: Hand-Written Documentation
- [ ] Create `src/content/docs/index.md` — landing page with project overview and quick install (references: REQ-DOC-005)
- [ ] Create `src/content/docs/getting-started.md` — installation, configuration, first handler setup (references: REQ-DOC-005)
- [ ] Create `src/content/docs/configuration.md` — full config reference with all handler options (references: REQ-DOC-005)
- [ ] Create `src/content/docs/handler-development.md` — guide for building custom handlers (references: REQ-DOC-005)
- [ ] Add sidebar configuration to astro.config.mjs for hand-written pages (references: REQ-DOC-005)

## Phase 3: Dogfood API Documentation
- [ ] Configure polyglot plugin in astro.config.mjs with TypeScript handler for plugin source (references: REQ-DOC-002)
- [ ] Set entryPoints to `../../packages/starlight-polyglot/src/index.ts` (references: REQ-DOC-002)
- [ ] Set output to `src/content/docs/api/` for generated API pages (references: REQ-DOC-002)
- [ ] Configure sidebar to include auto-generated API reference group alongside hand-written pages (references: REQ-DOC-002)
- [ ] Build site and verify API pages are generated with correct frontmatter and content (references: REQ-DOC-002)

## Phase 4: Docs Plugins & Polish
- [ ] Install and configure `starlight-links-validator` for broken link detection (references: REQ-DOC-003)
- [ ] Install and configure `starlight-versions` for versioned documentation (references: REQ-DOC-004)
- [ ] Optionally install `starlight-llms-txt` for LLM-friendly output (references: REQ-DOC-006)
- [ ] Add favicon, logo, and brand assets to `public/` directory (references: REQ-DOC-001)
- [ ] Configure docs.yml CI workflow to build and deploy docs site (references: REQ-CI-006)
- [ ] Verify full site build: hand-written pages + API docs + link validation pass (references: REQ-DOC-003)
