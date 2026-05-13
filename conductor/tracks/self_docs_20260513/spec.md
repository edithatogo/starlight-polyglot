# Track: self_docs_20260513

## Fulfills: REQ-DOC-001, REQ-DOC-002, REQ-DOC-003, REQ-DOC-004, REQ-DOC-005, REQ-DOC-006

## Context / Problem Statement

The starlight-polyglot plugin needs its own documentation site to serve as the authoritative reference for users. This site must dogfood the plugin by generating API documentation from the plugin's own TypeScript source code (REQ-DOC-002), demonstrating its value and serving as a real-world integration test. The docs site must include getting started guides, a configuration reference, and a handler development guide (REQ-DOC-005).

Per REQ-DOC-003, the site uses `starlight-links-validator` to ensure no broken links in CI. Per REQ-DOC-004, it uses `starlight-versions` for versioned documentation. Per REQ-DOC-006, it optionally provides LLM-friendly docs via `starlight-llms-txt`. The documentation site lives in `docs/astro-site/` as a separate Starlight project within the monorepo that references the plugin as a workspace dependency.

## Acceptance Criteria

1. Starlight documentation site created at `docs/astro-site/` with `@astrojs/starlight` installed
2. Site configured with `starlight-polyglot` plugin pointing at the plugin's own TypeScript source (dogfooding) (REQ-DOC-002)
3. Documentation pages include: Getting Started, Configuration Reference, Handler Development Guide (REQ-DOC-005)
4. `starlight-links-validator` integrated and passing in CI (REQ-DOC-003)
5. `starlight-versions` configured for versioned documentation (REQ-DOC-004)
6. `starlight-llms-txt` optionally configured for LLM-friendly output (REQ-DOC-006)
7. `astro.config.mjs` configured with the polyglot plugin and appropriate sidebar groups
8. Site deploys via `docs.yml` workflow to GitHub Pages (via ci_cd_20260513)
9. Dogfooding generates MDX pages from the plugin's `src/` directory showing API reference

## Technical Approach

Create a standalone Starlight Astro project in `docs/astro-site/` with its own `package.json`, `astro.config.mjs`, and content collection. The project references `starlight-polyglot` as a workspace dependency (via pnpm workspace protocol). The astro config includes the polyglot plugin configured to generate docs from `../../packages/starlight-polyglot/src/` with output in `src/content/docs/api/`. The sidebar is organized into logical groups: Getting Started, Configuration, Handler Development, API Reference (auto-generated). Hand-written documentation pages use `Starlight`'s Markdown/MDX content system alongside the auto-generated API pages.

## Files to Create/Modify

- `docs/astro-site/package.json` — Docs site npm manifest
- `docs/astro-site/astro.config.mjs` — Astro + Starlight config with polyglot plugin
- `docs/astro-site/tsconfig.json` — TypeScript config for docs site
- `docs/astro-site/src/content/docs/getting-started.md` — Getting started guide
- `docs/astro-site/src/content/docs/configuration.md` — Configuration reference
- `docs/astro-site/src/content/docs/handler-development.md` — Handler dev guide
- `docs/astro-site/src/content/docs/index.md` — Landing page
- `docs/astro-site/public/` — Static assets (favicon, logo)
- Root `pnpm-workspace.yaml` — Add docs site (modify)

## Dependencies

- ci_cd_20260513 (provides docs.yml deployment workflow)
- core_mdx_generator_20260513, core_router_plugin_20260513 (dogfood targets)
- handler_typescript_20260513 (dogfood target for TS handler)
