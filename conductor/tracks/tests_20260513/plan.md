# Plan: tests_20260513

## Phase 1: Test Infrastructure
- [ ] Create `vitest.config.ts` with coverage thresholds (lines: 90, branches: 80, functions: 85) (references: REQ-QA-001)
- [ ] Create fixture directories: `fixtures/python/`, `fixtures/typescript/`, `fixtures/rust/`, `fixtures/r/`, `fixtures/julia/`, `fixtures/csharp/`, `fixtures/go/` (references: REQ-QA-006)
- [ ] Create golden directories: `golden/python/`, `golden/typescript/`, `golden/rust/`, etc. (references: REQ-QA-006)
- [ ] Create Playwright E2E test site scaffold in `e2e/` directory (references: REQ-QA-007)

## Phase 2: Handler Contract Validation
- [ ] Create `contract.test.ts` with `describeContract()` function that validates Handler interface (references: REQ-HDL-001, REQ-QA-005)
- [ ] Contract tests verify: `name` is correct Language, `generate` returns Promise<MDXOutput>, required properties exist (references: DGN-CONTRACT-001)
- [ ] Contract tests verify: empty source handling returns empty array without throw (references: REQ-HDL-002)
- [ ] Contract tests verify: invalid input produces actionable error messages (references: REQ-HDL-003)

## Phase 3: Handler Golden Fixture Tests
- [ ] Create Python test with griffe JSON fixture verifying AST→MDX transformation (references: REQ-QA-006)
- [ ] Create TypeScript test with TypeDoc reflection fixture (references: REQ-QA-006)
- [ ] Create Rust test with rustdoc JSON fixture (references: REQ-QA-006)
- [ ] Create R test with R script JSON fixture (references: REQ-QA-006)
- [ ] Create Julia test with Julia script JSON fixture (references: REQ-QA-006)
- [ ] Create C# test with XML doc fixture (references: REQ-QA-006)
- [ ] Create Go test with gomarkdoc JSON fixture (references: REQ-QA-006)
- [ ] Fixture tests compare actual MDX output against golden file content (references: REQ-QA-006)

## Phase 4: Core Module Tests
- [ ] Create router tests: dispatch to correct handler, cache hit/miss, timeout, preview mode skip (references: REQ-CORE-003, REQ-CORE-009, REQ-CORE-011, REQ-CORE-012)
- [ ] Create MDX generator tests: frontmatter fields, content structure, output path, pagination (references: REQ-CORE-004, REQ-CORE-005, REQ-CORE-007)
- [ ] Create cache tests: SHA hashing, cache hit returns data, invalidation works (references: REQ-CORE-009)
- [ ] Create subprocess tests: timeout abort, error output capture, non-zero exit handling (references: REQ-CORE-011)

## Phase 5: E2E & Formatting Tests
- [ ] Create Playwright E2E test: build full Starlight site with polyglot plugin (references: REQ-QA-007)
- [ ] E2E test verifies: pages are generated, sidebar contains API entries, page content renders (references: REQ-QA-007)
- [ ] Add ESLint configuration test: lint passes with zero warnings (references: REQ-QA-003)
- [ ] Add Prettier formatting test: `prettier --check` passes (references: REQ-QA-004)
- [ ] Verify tsc --noEmit passes with strict mode, zero errors (references: REQ-QA-002)
- [ ] Run full test suite and verify >90% line coverage (references: REQ-QA-001)
