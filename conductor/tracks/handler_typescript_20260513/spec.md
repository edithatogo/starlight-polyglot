# Track: handler_typescript_20260513

## Fulfills: REQ-TS-001, REQ-TS-002

## Context / Problem Statement

The TypeScript handler provides first-class support for TypeScript/JavaScript API documentation. Unlike other handlers that use subprocess invocation, the TypeScript handler uses TypeDoc directly as a JavaScript library (not a subprocess), enabling in-process reflection without a separate compilation step. This approach is more performant and allows tighter integration with the plugin's build lifecycle.

Per REQ-TS-001, the handler imports TypeDoc programmatically and uses `typedoc.application.convert()` to generate reflection data. Per REQ-TS-002, it accepts a `tsconfig` path option to control TypeScript compiler configuration. The handler must transform TypeDoc's `Reflection` objects into the standardized intermediate format consumed by the MDX Generator. This handler also serves as the dogfood target for the project's own documentation (REQ-DOC-002).

## Acceptance Criteria

1. `TypeScriptHandler` implements the `Handler` interface from `src/core/types.ts`
2. Handler uses TypeDoc programmatically via `import { Application, TSConfigReader } from 'typedoc'` — no subprocess invocation
3. Handler accepts `entryPoints` as file paths (e.g., `['src/index.ts']`) and `tsconfig` path option
4. Handler invokes `Application.convert()` to produce `Reflection[]` from entry points
5. Handler transforms TypeDoc reflections (modules, classes, interfaces, functions, variables, type aliases) into standardized AST
6. Handler handles missing TypeDoc peer dependency with a clear error message
7. Handler respects the `tsconfig` option to customize TypeScript compilation (default: `tsconfig.json`)
8. Handler handles empty source directories returning empty results

## Technical Approach

Create `TypeScriptHandler` class implementing `Handler` in `src/handlers/typescript.ts`. The `generate(options)` method programmatically creates a TypeDoc `Application`, configures it with entry points and tsconfig path, runs `convert()`, and walks the resulting `ProjectReflection` to extract symbol metadata and docstrings. TypeDoc's `Comment` objects contain summary, block tags, and parameter descriptions that map directly to the standardized AST format. The handler reuses patterns from `starlight-typedoc` but strips out page generation (the plugin's MDX generator handles that) to focus purely on reflection extraction.

## Files to Create/Modify

- `packages/starlight-polyglot/src/handlers/typescript.ts` — TypeScriptHandler class
- `packages/starlight-polyglot/src/handlers/typescript.test.ts` — Unit tests
- `packages/starlight-polyglot/src/handlers/index.ts` — Export all handlers (modify)
- `packages/starlight-polyglot/src/core/types.ts` — May need Language type update (modify)

## Dependencies

- core_mdx_generator_20260513 (provides MDXOutput types and MDXGenerator)
- core_router_plugin_20260513 (provides Handler interface, Router)
