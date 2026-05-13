# Plan: plugin_scaffold_20260513

## Phase 1: Package Foundation
- [ ] Create `packages/starlight-polyglot/package.json` with name `starlight-polyglot`, version `0.0.0`, exports map, all dependencies from tech-stack.md (references: REQ-CORE-001)
- [ ] Create `packages/starlight-polyglot/tsconfig.json` with strict mode, path aliases, ESM module resolution (references: DGN-REPO-001)
- [ ] Create `packages/starlight-polyglot/tsup.config.ts` for ESM+CJS dual bundle output (references: REQ-CORE-001)
- [ ] Update root `pnpm-workspace.yaml` to include `packages/*` (references: DGN-REPO-001)

## Phase 2: Core Type Definitions
- [ ] Create directory structure: `src/core/`, `src/handlers/`, `src/scripts/` (references: DGN-REPO-001)
- [ ] Create `src/core/types.ts` with `Language` union type, `Handler` interface, `HandlerOptions`, `MDXOutput`, `MDXPage` types (references: DGN-CONTRACT-001, REQ-HDL-001)
- [ ] Create `src/core/plugin.ts` with stub `starlightPolyglot()` function returning StarlightPlugin shape (references: DGN-PLUGIN-001, REQ-CORE-001)
- [ ] Create `src/core/router.ts` with `Router` class stub (references: DGN-CORE-001)
- [ ] Create `src/core/mdx-generator.ts` with `MDXGenerator` class stub (references: DGN-MDX-001)

## Phase 3: Entry Point & Configuration
- [ ] Create `packages/starlight-polyglot/index.ts` as public entry point exporting `starlightPolyglot` (references: DGN-REPO-001)
- [ ] Create `packages/starlight-polyglot/eslint.config.mjs` with strict TypeScript rules (references: REQ-QA-003)
- [ ] Create `packages/starlight-polyglot/.prettierrc` with single quotes, 2-space indent, 100-char width (references: REQ-QA-004)

## Phase 4: Verification
- [ ] Run `pnpm install` at root to verify dependency resolution (references: REQ-CORE-001)
- [ ] Run `tsc --noEmit` on package to verify zero type errors in strict mode (references: REQ-QA-002)
- [ ] Run `pnpm build` to verify tsup dual output (references: REQ-CI-001)
