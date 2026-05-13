# Track: handler_go_20260513

## Fulfills: REQ-GO-001, REQ-GO-002

## Context / Problem Statement

Go has a built-in documentation culture centered around `godoc` and `go doc`. The `gomarkdoc` tool extends this by outputting structured JSON documentation for Go packages, including exported functions, types, methods, and their doc comments. Go's documentation model is package-oriented: each package has a set of exported symbols (functions, types, variables, constants) with doc comments written directly above the declaration.

Per REQ-GO-001, the handler runs `gomarkdoc --output json ./...` in the specified module and parses the JSON output. Per REQ-GO-002, it accepts a `modulePath` option pointing to the Go module directory. Go's doc comments follow simple conventions: a summary line followed by a blank line and detailed description, with code examples in indented blocks. The handler must preserve these conventions while transforming them into the standardized AST format.

## Acceptance Criteria

1. `GoHandler` implements the `Handler` interface from `src/core/types.ts`
2. Handler runs `gomarkdoc --output json ./...` in the specified module path as a subprocess
3. Handler accepts `modulePath` option pointing to a Go module directory (containing `go.mod`)
4. Handler parses gomarkdoc JSON output and transforms into standardized AST format
5. Handler extracts all exported symbols: functions, types, structs, interfaces, methods, variables, constants
6. Handler preserves Go doc comment conventions (summary line, indented code examples)
7. Handler handles missing `gomarkdoc` CLI with a clear installation message: `go install github.com/princjef/gomarkdoc@latest`
8. Handler handles modules with no exported symbols returning empty results

## Technical Approach

Create `GoHandler` class in `src/handlers/go.ts`. The `generate(options)` method runs `gomarkdoc --output json ./...` in the module directory, captures JSON stdout, and parses the result. gomarkdoc's JSON output includes package information, functions, types with their methods and fields, and nested types. The transform step maps gomarkdoc's structure to the standardized AST: Go types (struct, interface) become typed symbols, functions become function symbols, and package-level vars/consts become variable symbols. The handler also resolves the module path to auto-discover the correct import path if needed.

## Files to Create/Modify

- `packages/starlight-polyglot/src/handlers/go.ts` — GoHandler class
- `packages/starlight-polyglot/src/handlers/go.test.ts` — Unit tests
- `packages/starlight-polyglot/src/handlers/index.ts` — Export all handlers (modify)
- `packages/starlight-polyglot/src/core/types.ts` — May need Language type update (modify)

## Dependencies

- core_mdx_generator_20260513 (provides MDXOutput types)
- core_router_plugin_20260513 (provides Handler interface, subprocess utility)
