# Track: plugin_scaffold_20260513

## Fulfills: REQ-CORE-001

## Context / Problem Statement

The starlight-polyglot plugin needs a proper npm package scaffold that establishes the TypeScript project structure, build tooling, and the Handler interface contract that all language-specific handlers will implement. Without this foundation, no plugin code can be written, tested, or bundled. This track creates the directory layout, configuration files, and core type definitions that every subsequent track depends on.

The package structure follows the monorepo pattern with all source code under `packages/starlight-polyglot/`, a core layer for routing and MDX generation, and a handlers directory for language-specific extraction. The scaffold must align with Starlight plugin conventions, using `config:setup` hook registration as defined in DGN-REPO-001 and DGN-PLUGIN-001.

## Acceptance Criteria

1. `packages/starlight-polyglot/package.json` created with correct name, version `0.0.0`, exports map for ESM+CJS dual output, and all dependencies from tech-stack.md
2. `packages/starlight-polyglot/tsconfig.json` created with `strict: true`, `exactOptionalPropertyTypes: true`, `noUncheckedIndexedAccess: true`, path aliases (`@core/*`, `@handlers/*`)
3. `packages/starlight-polyglot/tsup.config.ts` created for ESM+CJS dual bundle output to `dist/`
4. `packages/starlight-polyglot/index.ts` created as the public entry point exporting `starlightPolyglot()` plugin function
5. `packages/starlight-polyglot/src/core/types.ts` created with the `Handler` interface and `MDXOutput`, `HandlerOptions`, `Language` types per DGN-CONTRACT-001
6. All directory structure created: `src/core/`, `src/handlers/`, `src/scripts/`
7. `packages/starlight-polyglot/.eslintrc.cjs` (or eslint.config.mjs flat config) configured with strict rules
8. `packages/starlight-polyglot/.prettierrc` configured with single quotes, 2-space indent, 100-char line length
9. Root `pnpm-workspace.yaml` includes the `packages/*` directory

## Technical Approach

Create the npm package scaffold inside `packages/starlight-polyglot/` using the standard Astro/Starlight plugin layout. The index.ts will export a function `starlightPolyglot(config)` that returns a StarlightPlugin object with `name` and `hooks` properties. The Handler interface will be defined in `src/core/types.ts` with generic type parameters for extensibility. Build configuration uses tsup for dual ESM/CJS output with TypeScript strict mode enforced.

## Files to Create/Modify

- `packages/starlight-polyglot/package.json` — npm package manifest
- `packages/starlight-polyglot/tsconfig.json` — TypeScript strict config
- `packages/starlight-polyglot/tsup.config.ts` — Build bundler config
- `packages/starlight-polyglot/index.ts` — Plugin entry point
- `packages/starlight-polyglot/src/core/types.ts` — Handler interface + types
- `packages/starlight-polyglot/src/core/plugin.ts` — Plugin registration stub
- `packages/starlight-polyglot/src/core/router.ts` — Router class stub
- `packages/starlight-polyglot/src/core/mdx-generator.ts` — MDX generator stub
- `packages/starlight-polyglot/eslint.config.mjs` — ESLint flat config
- `packages/starlight-polyglot/.prettierrc` — Prettier config (single quotes, 2-space)
- Root `pnpm-workspace.yaml` — workspace definition (modify if exists)

## Dependencies

- conductor_setup_20260513
