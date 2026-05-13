# Track: handler_r_20260513

## Fulfills: REQ-R-001, REQ-R-002

## Context / Problem Statement

R is widely used in statistical computing, bioinformatics, and data science. R packages use roxygen2-style docstrings (special comments starting with `#'`) that include tags like `@param`, `@return`, `@export`, and `@examples`. The R handler must extract these docstrings by running an R script that parses the package's documentation and outputs JSON.

Per REQ-R-001, the handler runs `Rscript extract.R` with the given entry points and parses the JSON output. Per REQ-R-002, it accepts `entryPoints` pointing to `.R` source files or package directories. The handler includes a bundled `extract.R` script that uses `roxygen2` and custom parsing to produce structured JSON output. R's documentation model includes functions, formal arguments (parameters), S3/S4 generics and methods, and R6 classes.

## Acceptance Criteria

1. `RHandler` implements the `Handler` interface from `src/core/types.ts`
2. Handler runs `Rscript <bundled_script_path>/extract.R` with the given entry points as arguments
3. Handler accepts `entryPoints` as paths to `.R` files or R package directories
4. Handler parses JSON stdout from the R script into standardized AST format
5. Handler extracts functions, formal arguments, S3/S4 generics, R6 classes, and their docstrings
6. Handler maps roxygen2 tags (`@param`, `@return`, `@export`, `@examples`) to structured fields
7. Handler includes a bundled `extract.R` script that uses `roxygen2::parse_text()` or equivalent
8. Handler handles missing R/Rscript installation with a clear error message
9. Handler handles `.R` files with no roxygen2 comments returning empty results

## Technical Approach

Create `RHandler` class in `src/handlers/r.ts`. The handler ships with `extract.R` in `src/scripts/` that uses `roxygen2` to parse documentation from `.R` files. The `generate(options)` method writes a temporary R script path, invokes `Rscript`, and parses the JSON output. The R script iterates through entry points, parses roxygen2 comments, and outputs a JSON array of symbols with docstrings, parameter descriptions, examples, and return values. The TypeScript handler then transforms this JSON into the standardized AST format for MDX generation.

## Files to Create/Modify

- `packages/starlight-polyglot/src/handlers/r.ts` — RHandler class
- `packages/starlight-polyglot/src/scripts/extract.R` — R extraction script
- `packages/starlight-polyglot/src/handlers/r.test.ts` — Unit tests
- `packages/starlight-polyglot/src/handlers/index.ts` — Export all handlers (modify)
- `packages/starlight-polyglot/src/core/types.ts` — May need Language type update (modify)

## Dependencies

- core_mdx_generator_20260513 (provides MDXOutput types)
- core_router_plugin_20260513 (provides Handler interface, subprocess utility)
