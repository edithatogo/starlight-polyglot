# Track: handler_julia_20260513

## Fulfills: REQ-JL-001, REQ-JL-002

## Context / Problem Statement

Julia is a high-performance scientific computing language with built-in documentation support via `Base.Docs`. Julia functions and types can have docstrings attached using the `"""` syntax, and the `Base.Docs` module provides programmatic access to documented symbols. The Julia handler extracts these docstrings by running a bundled Julia script that uses Julia's introspection capabilities to dump documentation as JSON.

Per REQ-JL-001, the handler runs `julia extract.jl` with the given entry points and parses the JSON output. Per REQ-JL-002, it accepts `entryPoints` as Julia module paths or file paths. Julia's documentation model is function-centric: functions (including multiple dispatch methods), types (structs, abstract types, primitive types), and constants can all have docstrings. Julia docstrings support markdown, LaTeX math (`$...$`), and cross-references.

## Acceptance Criteria

1. `JuliaHandler` implements the `Handler` interface from `src/core/types.ts`
2. Handler runs `julia <bundled_script_path>/extract.jl` with the given entry points as arguments
3. Handler accepts `entryPoints` as Julia module paths (e.g., `['MyModule', 'MyModule.SubModule']`)
4. Handler parses JSON stdout from the Julia script into standardized AST format
5. Handler extracts functions (with method signatures), structs, abstract types, and constants
6. Handler preserves markdown formatting, LaTeX math syntax, and cross-references in docstrings
7. Handler includes a bundled `extract.jl` script that uses `Base.Docs.docsh` for introspection
8. Handler handles missing Julia installation with a clear error message
9. Handler handles modules with no docstrings returning empty results

## Technical Approach

Create `JuliaHandler` class in `src/handlers/julia.ts`. The handler ships with `extract.jl` in `src/scripts/` that uses Julia's `Base.Docs.docsh` (internal docs storage) to extract docstrings for all exported symbols. The `generate(options)` method invokes `julia extract.jl <module_name>`, parses the JSON stdout, and transforms the symbol data into standardized AST. Julia's multiple dispatch means a single function name may have multiple methods with different signatures — the handler groups these under a single function symbol with multiple signatures in the AST.

## Files to Create/Modify

- `packages/starlight-polyglot/src/handlers/julia.ts` — JuliaHandler class
- `packages/starlight-polyglot/src/scripts/extract.jl` — Julia extraction script
- `packages/starlight-polyglot/src/handlers/julia.test.ts` — Unit tests
- `packages/starlight-polyglot/src/handlers/index.ts` — Export all handlers (modify)
- `packages/starlight-polyglot/src/core/types.ts` — May need Language type update (modify)

## Dependencies

- core_mdx_generator_20260513 (provides MDXOutput types)
- core_router_plugin_20260513 (provides Handler interface, subprocess utility)
