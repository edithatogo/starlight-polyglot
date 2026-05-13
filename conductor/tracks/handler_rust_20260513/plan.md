# Plan: handler_rust_20260513

## Phase 1: Rustdoc Subprocess Invocation
- [ ] Create `src/handlers/rust.ts` with `RustHandler` class implementing `Handler` (references: REQ-RS-001, DGN-CONTRACT-001)
- [ ] Implement subprocess call: `cargo +nightly rustdoc --output-format json` in cratePath (references: REQ-RS-001)
- [ ] Accept `cratePath` option defaulting to current directory (references: REQ-RS-002)
- [ ] Handle missing Rust nightly with install suggestion error (references: REQ-HDL-003)

## Phase 2: JSON Parsing & Symbol Extraction
- [ ] Locate and read generated JSON file at `target/doc/<crate_name>.json` (references: REQ-RS-001)
- [ ] Walk rustdoc JSON item tree extracting public items only (references: REQ-RS-001)
- [ ] Transform structs, enums, functions, traits, type aliases, constants, impls into standardized AST (references: DGN-CONTRACT-001)
- [ ] Map doc comments from `docs` field preserving markdown formatting (references: REQ-RS-001)
- [ ] Parse and preserve intra-doc-links (`[`Type`]`) as reference links (references: REQ-RS-001)

## Phase 3: Edge Cases & Error Handling
- [ ] Handle crates with no public items returning empty result (references: REQ-HDL-002)
- [ ] Handle malformed rustdoc JSON with descriptive error (references: REQ-HDL-003)
- [ ] Handle `cargo` not found in PATH with actionable message (references: REQ-HDL-003)
- [ ] Handle subprocess timeout with 'Rust handler timed out' error (references: REQ-CORE-011)
- [ ] Add `rust` to Language type union if not already present

## Phase 4: Registration & Verification
- [ ] Export `RustHandler` from `src/handlers/index.ts` (references: DGN-REPO-001)
- [ ] Create `src/handlers/rust.test.ts` with fixture rustdoc JSON output (references: REQ-QA-005, REQ-QA-006)
- [ ] Verify handler contract compliance (references: REQ-HDL-001)
- [ ] Test with a real Rust crate to verify end-to-end extraction
