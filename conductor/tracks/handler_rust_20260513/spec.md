# Track: handler_rust_20260513

## Fulfills: REQ-RS-001, REQ-RS-002

## Context / Problem Statement

Rust generates rich JSON documentation via `rustdoc` when invoked with `--output-format json` on the nightly toolchain. This JSON output contains the complete crate documentation including structs, enums, functions, traits, implementations, and their doc comments. The Rust handler must parse this JSON output and transform it into the standardized intermediate format for MDX generation.

Per REQ-RS-001, the handler runs `cargo +nightly rustdoc --output-format json` and parses the resulting JSON. Per REQ-RS-002, it accepts a `cratePath` option pointing to the Cargo project directory. Rust's doc comments support markdown, code examples (doctests), and intra-doc-links (`[`Type`]`) which must be preserved in translation. The handler requires the nightly Rust toolchain for JSON output and should detect its absence with a clear installation instruction.

## Acceptance Criteria

1. `RustHandler` implements the `Handler` interface from `src/core/types.ts`
2. Handler runs `cargo +nightly rustdoc --output-format json` in the specified crate directory
3. Handler accepts `cratePath` option pointing to a Cargo project directory
4. Handler parses `rustdoc` JSON output (items, paths, docs) and transforms into standardized AST
5. Handler extracts all public items: structs, enums, functions, traits, type aliases, constants, impl blocks
6. Handler preserves intra-doc-links (`[`Type`]`) as reference links in descriptions
7. Handler handles missing Rust nightly toolchain with actionable error: 'Install Rust nightly: rustup toolchain install nightly'
8. Handler handles crates without public items returning empty results

## Technical Approach

Create `RustHandler` class in `src/handlers/rust.ts`. The `generate(options)` method runs `cargo +nightly rustdoc --output-format json` in the crate directory, reads the generated JSON file from `target/doc/<crate_name>.json`, and parses it. Rustdoc's JSON schema includes items with `id`, `name`, `kind`, `docs`, `span`, `links`, and `inner` items. The transform step walks this item tree, extracting public API surfaces (filtering out private items marked with `visibility: { code: "public" }` or equivalent). Doc comments are extracted from the `docs` field as raw markdown. Intra-doc-links are parsed and converted to reference format for the MDX generator.

## Files to Create/Modify

- `packages/starlight-polyglot/src/handlers/rust.ts` — RustHandler class
- `packages/starlight-polyglot/src/handlers/rust.test.ts` — Unit tests
- `packages/starlight-polyglot/src/handlers/index.ts` — Export all handlers (modify)
- `packages/starlight-polyglot/src/core/types.ts` — May need Language type update (modify)

## Dependencies

- core_mdx_generator_20260513 (provides MDXOutput types)
- core_router_plugin_20260513 (provides Handler interface, subprocess utility)
