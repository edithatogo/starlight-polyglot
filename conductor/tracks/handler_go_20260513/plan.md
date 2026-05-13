# Plan: handler_go_20260513

## Phase 1: Gomarkdoc Subprocess Integration
- [ ] Create `src/handlers/go.ts` with `GoHandler` class implementing `Handler` (references: REQ-GO-001, DGN-CONTRACT-001)
- [ ] Implement subprocess call: `gomarkdoc --output json ./...` in modulePath (references: REQ-GO-001)
- [ ] Accept `modulePath` option pointing to Go module directory (references: REQ-GO-002)
- [ ] Integrate with `runSubprocess` for timeout support (references: REQ-CORE-011)
- [ ] Handle missing `gomarkdoc` CLI with install instruction: 'go install github.com/princjef/gomarkdoc@latest' (references: REQ-HDL-003)

## Phase 2: JSON Parsing & Symbol Extraction
- [ ] Parse gomarkdoc JSON output into intermediate symbol tree (references: REQ-GO-001)
- [ ] Transform exported functions, types (structs, interfaces), methods, variables, constants into standardized AST (references: DGN-CONTRACT-001)
- [ ] Map Go doc comment conventions: summary line → description, indented blocks → code examples (references: REQ-GO-001)
- [ ] Resolve struct field and interface method members for nested type documentation (references: REQ-GO-001)

## Phase 3: Edge Cases & Error Handling
- [ ] Handle modules with no exported symbols returning empty result (references: REQ-HDL-002)
- [ ] Handle missing `go.mod` with clear error message (references: REQ-HDL-003)
- [ ] Handle malformed gomarkdoc JSON with descriptive error (references: REQ-HDL-003)
- [ ] Handle Go not installed with actionable installation message (references: REQ-HDL-003)
- [ ] Add `go` to Language type union if not already present

## Phase 4: Registration & Verification
- [ ] Export `GoHandler` from `src/handlers/index.ts` (references: DGN-REPO-001)
- [ ] Create `src/handlers/go.test.ts` with fixture gomarkdoc JSON output (references: REQ-QA-005, REQ-QA-006)
- [ ] Verify handler contract compliance (references: REQ-HDL-001)
- [ ] Test with a real Go module end-to-end
