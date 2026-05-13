# Plan: core_router_plugin_20260513

## Phase 1: Plugin Hook & Config Parsing
- [ ] Implement `starlightPolyglot(config)` in `src/core/plugin.ts` with `name` and `hooks.config:setup` (references: REQ-CORE-001, DGN-PLUGIN-001, DGN-CORE-001)
- [ ] Parse user config object mapping `Record<Language, HandlerOptions>` from astro.config.mjs (references: REQ-CORE-002)
- [ ] Check for `astro preview` command and skip generation with log message (references: REQ-CORE-012)
- [ ] Update `index.ts` to export the plugin function and public types (references: DGN-REPO-001)

## Phase 2: Router Dispatch
- [ ] Implement `Router` class with `register()`, `dispatch()`, `enabled()` methods (references: REQ-CORE-003, DGN-PLUGIN-001)
- [ ] Implement dispatch pipeline: instantiate handler → call generate() → collect MDXOutput (references: DGN-CORE-002)
- [ ] Integrate `MDXGenerator` call in dispatch pipeline for AST→MDX transformation (references: DGN-MDX-001)
- [ ] Implement per-language progress logging to console (references: REQ-CORE-008)

## Phase 3: Sidebar Integration
- [ ] Create `src/core/sidebar.ts` with `SidebarIntegrator` (references: REQ-CORE-006, DGN-PLUGIN-001)
- [ ] Transform `SidebarGroup[]` from handlers into Starlight sidebar config items (references: REQ-CORE-006)
- [ ] Auto-generate sidebar groups per language under an "API Reference" parent group
- [ ] Inject sidebar config into `config:setup` hook's `updateConfig()` call (references: DGN-CORE-001)

## Phase 4: Caching Layer
- [ ] Create `src/core/cache.ts` with `CacheManager` class (references: REQ-CORE-009, DGN-HDL-001)
- [ ] Implement SHA-256 content hashing of source files (references: REQ-CORE-009)
- [ ] Store cache index in `.polyglot-cache/cache-index.json` (references: REQ-CORE-009)
- [ ] Implement `get(key)`, `set(key, value)`, `invalidate(key)` methods (references: DGN-PLUGIN-001)
- [ ] Check cache before dispatch, skip generation on cache hit (references: REQ-CORE-009)

## Phase 5: Subprocess Management & Watch Mode
- [ ] Create `src/core/subprocess.ts` with `runSubprocess(command, args, timeout)` utility (references: REQ-CORE-011)
- [ ] Implement `AbortController`-based timeout with configurable duration (default 60s) (references: REQ-CORE-011)
- [ ] Handle subprocess stdout (JSON parse), stderr (log), non-zero exit codes (throw) (references: REQ-HDL-003)
- [ ] Create `src/core/watcher.ts` with file system watcher for `watch: true` mode (references: REQ-CORE-010)
- [ ] Integrate watcher with Router to re-dispatch on source file changes (references: REQ-CORE-010)
- [ ] Debounce re-generation to avoid rapid rebuilds on bulk saves (references: REQ-CORE-010)

## Phase 6: Integration & Verification
- [ ] Wire all components together in `plugin.ts` dispatch lifecycle (references: DGN-CORE-001)
- [ ] Test with mock handlers to verify end-to-end pipeline (references: DGN-CORE-002)
- [ ] Verify preview mode correctly skips generation (references: REQ-CORE-012)
- [ ] Verify cache hit returns immediately without handler invocation (references: REQ-CORE-009)
- [ ] Verify timeout kills hung subprocess and reports error (references: REQ-CORE-011)
