# Plan: handler_julia_20260513

## Phase 1: Julia Extraction Script
- [ ] Create `src/scripts/extract.jl` with Base.Docs introspection logic (references: REQ-JL-001)
- [ ] Script accepts module names as command-line arguments (references: REQ-JL-002)
- [ ] Script uses `Base.Docs.docsh` to access documented symbols (references: REQ-JL-001)
- [ ] Script outputs structured JSON: function names with method signatures, types, constants, docstrings (references: REQ-JL-001)

## Phase 2: Handler Class & Subprocess Integration
- [ ] Create `src/handlers/julia.ts` with `JuliaHandler` class implementing `Handler` (references: REQ-JL-001, DGN-CONTRACT-001)
- [ ] Implement `generate(options)` constructing `julia` command with bundled script path (references: REQ-JL-001)
- [ ] Accept `entryPoints` as Julia module paths (references: REQ-JL-002)
- [ ] Integrate with `runSubprocess` for timeout support (references: REQ-CORE-011)

## Phase 3: Parsing & Transformation
- [ ] Parse Julia script JSON stdout into intermediate symbol tree (references: REQ-JL-001)
- [ ] Transform functions, structs, abstract types, constants into standardized AST (references: DGN-CONTRACT-001)
- [ ] Group multiple dispatch methods under single function symbol with multiple signatures (references: REQ-JL-001)
- [ ] Preserve LaTeX math syntax and markdown in docstrings (references: REQ-JL-001)

## Phase 4: Edge Cases & Verification
- [ ] Handle modules with no docstrings returning empty result (references: REQ-HDL-002)
- [ ] Handle missing Julia installation with actionable error (references: REQ-HDL-003)
- [ ] Handle malformed Julia output with descriptive error (references: REQ-HDL-003)
- [ ] Add `julia` to Language type union if not already present
- [ ] Export `JuliaHandler` from `src/handlers/index.ts` (references: DGN-REPO-001)
- [ ] Create `src/handlers/julia.test.ts` with fixture JSON output (references: REQ-QA-005, REQ-QA-006)
