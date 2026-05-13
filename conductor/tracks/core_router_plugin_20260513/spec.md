# Track: core_router_plugin_20260513

## Fulfills: REQ-CORE-002, REQ-CORE-003, REQ-CORE-006, REQ-CORE-008, REQ-CORE-009, REQ-CORE-010, REQ-CORE-011, REQ-CORE-012

## Context / Problem Statement

The Router and Plugin Hook are the central nervous system of starlight-polyglot. The Router dispatches each configured language to its corresponding handler, manages subprocess lifecycle with timeouts, handles caching to skip unchanged sources, and supports watch mode for dev server rebuilds. The Plugin Hook integrates with Starlight's `config:setup` lifecycle, reading the user's polyglot configuration from `astro.config.mjs`, orchestrating the full generation pipeline, and injecting generated pages into Starlight's sidebar configuration.

Per DGN-CORE-001 and DGN-CORE-002, the Router maintains a `Map<Language, Handler>` registry and provides `dispatch()`, `register()`, and `enabled()` methods. The Starlight plugin function uses the `config:setup` hook to trigger generation, check for `preview` mode, and update the Starlight config with sidebar entries and page collections. Caching (REQ-CORE-009) uses content hashing of source files to skip re-generation. Subprocess timeout (REQ-CORE-011) defaults to 60s with `AbortController`. Watch mode (REQ-CORE-010) uses file system watchers to trigger re-generation on source changes.

## Acceptance Criteria

1. `Router` class implements `register(language, handler)` and `dispatch(language, options)` methods per DGN-PLUGIN-001
2. `starlightPolyglot(config)` plugin function registers via Starlight's `config:setup` hook
3. Plugin reads user config object mapping language keys to handler options (REQ-CORE-002)
4. Router dispatches each configured language to its registered handler's `generate()` method (REQ-CORE-003)
5. Generated MDX pages are automatically registered in Starlight sidebar config (REQ-CORE-006)
6. Plugin checks for `astro preview` command and skips generation with a console message (REQ-CORE-012)
7. `CacheManager` implements content-hash-based caching, returning cached results for unchanged sources (REQ-CORE-009)
8. Subprocess timeout implemented via `AbortController` with configurable `timeout` option (default 60s) (REQ-CORE-011)
9. Progress reporting logs each language's status to console during generation (REQ-CORE-008)
10. Watch mode uses `chokidar` or Node.js built-in `fs.watch` to detect source file changes and re-trigger generation (REQ-CORE-010)

## Technical Approach

Implement the `Router` class in `src/core/router.ts` with a handler registry and dispatch logic. The Starlight plugin function lives in `src/core/plugin.ts` and uses Starlight's `config:setup` hook to intercept the build lifecycle. The cache layer uses SHA-256 hashing of source file contents stored in a `.polyglot-cache/` directory. Subprocess spawning uses `child_process.spawn()` wrapped with `AbortSignal` for timeout enforcement. Watch mode uses `chokidar` (lightweight, Starlight-ecosystem standard) to watch all configured entry points. The sidebar integration augments the Starlight sidebar config with auto-generated groups per language.

## Files to Create/Modify

- `packages/starlight-polyglot/src/core/router.ts` — Router class with dispatch + registry
- `packages/starlight-polyglot/src/core/plugin.ts` — Starlight plugin function with config:setup hook
- `packages/starlight-polyglot/src/core/cache.ts` — CacheManager for content-hash caching
- `packages/starlight-polyglot/src/core/subprocess.ts` — Subprocess runner with timeout support
- `packages/starlight-polyglot/src/core/sidebar.ts` — Sidebar config integrator
- `packages/starlight-polyglot/src/core/watcher.ts` — File watcher for dev mode
- `packages/starlight-polyglot/index.ts` — Export new modules (modify)

## Dependencies

- plugin_scaffold_20260513 (provides base types, Handler interface, directory structure)
- core_mdx_generator_20260513 (provides MDXGenerator used in pipeline) — logical dependency, can develop in parallel
