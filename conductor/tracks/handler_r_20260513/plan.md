# Plan: handler_r_20260513

## Phase 1: R Extraction Script
- [ ] Create `src/scripts/extract.R` with roxygen2 parsing logic (references: REQ-R-001)
- [ ] Script accepts entry points as command-line arguments (references: REQ-R-002)
- [ ] Script parses roxygen2 comments from `.R` files using `roxygen2::parse_text()` (references: REQ-R-001)
- [ ] Script outputs structured JSON to stdout: symbol name, type, docstring, params, return, examples (references: REQ-R-001)
- [ ] Handle R package directories by finding `.R` files recursively

## Phase 2: Handler Class & Subprocess Integration
- [ ] Create `src/handlers/r.ts` with `RHandler` class implementing `Handler` (references: REQ-R-001, DGN-CONTRACT-001)
- [ ] Implement `generate(options)` constructing `Rscript` command with bundled script path (references: REQ-R-001)
- [ ] Accept `entryPoints` as paths to `.R` files or package directories (references: REQ-R-002)
- [ ] Integrate with `runSubprocess` for timeout support (references: REQ-CORE-011)

## Phase 3: Parsing & Transformation
- [ ] Parse R script JSON stdout into intermediate symbol tree (references: REQ-R-001)
- [ ] Transform functions, S3/S4 generics, R6 classes into standardized AST (references: DGN-CONTRACT-001)
- [ ] Map roxygen2 tags (`@param`, `@return`, `@export`, `@examples`) to structured fields (references: REQ-R-001)
- [ ] Handle missing R/Rscript with actionable installation message (references: REQ-HDL-003)

## Phase 4: Edge Cases & Verification
- [ ] Handle files with no roxygen2 comments returning empty result (references: REQ-HDL-002)
- [ ] Handle malformed R script output with descriptive error (references: REQ-HDL-003)
- [ ] Add `r` to Language type union if not already present
- [ ] Export `RHandler` from `src/handlers/index.ts` (references: DGN-REPO-001)
- [ ] Create `src/handlers/r.test.ts` with fixture `.R` files and expected JSON output (references: REQ-QA-005, REQ-QA-006)
