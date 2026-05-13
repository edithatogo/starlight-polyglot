# Track: tests_20260513

## Fulfills: REQ-QA-001, REQ-QA-002, REQ-QA-003, REQ-QA-004, REQ-QA-005, REQ-QA-006, REQ-QA-007, REQ-HDL-001, REQ-HDL-002, REQ-HDL-003

## Context / Problem Statement

A comprehensive test suite is critical for a polyglot documentation plugin that spans 7 language toolchains. Each handler must be validated against a standard contract (REQ-HDL-001), must handle empty sources gracefully (REQ-HDL-002), and must report meaningful errors on failure (REQ-HDL-003). Beyond handler-specific tests, the test suite must enforce >90% line coverage (REQ-QA-001), TypeScript strict mode compliance (REQ-QA-002), ESLint zero-warnings (REQ-QA-003), Prettier formatting (REQ-QA-004), and include both contract validation tests (REQ-QA-005) and golden fixture tests (REQ-QA-006) for each handler.

The test strategy uses Vitest for unit and integration tests, with golden fixture files containing expected MDX output per handler. Playwright E2E tests (REQ-QA-007) verify that the plugin works end-to-end in a real Starlight site with rendered MDX pages. Per DGN-CONTRACT-001, the Handler interface contract is validated through a shared contract test suite that all handler implementations must pass.

## Acceptance Criteria

1. Contract validation test suite exists that all 7 handlers must pass (REQ-HDL-001, REQ-QA-005)
2. Contract tests verify: `Handler` interface shape, `generate()` returns `MDXOutput`, `name` property is correct `Language`
3. Each handler has golden fixture tests: known input → expected MDX output (REQ-QA-006)
4. Golden fixtures stored in `fixtures/<language>/` (source input) and `golden/<language>/` (expected MDX)
5. Empty source tests for each handler return empty result without crashing (REQ-HDL-002)
6. Error case tests verify meaningful error messages on toolchain failure (REQ-HDL-003)
7. Core router tests verify dispatch, caching, timeout, sidebar integration
8. MDX generator tests verify frontmatter correctness, content structure, output path
9. Overall line coverage >=90% (REQ-QA-001)
10. Playwright E2E test builds full Starlight site and verifies rendered MDX pages (REQ-QA-007)

## Technical Approach

Create a `tests/` directory structure alongside the package source. Contract validation tests use a shared `describeContract('Handler')` function that each handler test file calls. Golden fixture tests use Vitest's snapshot testing but with explicit fixture files for readability. Playwright E2E tests build a minimal Starlight site configured with all 7 handlers and verify the rendered HTML output. The test suite integrates with `ci.yml` to enforce coverage thresholds and type checking.

## Files to Create/Modify

- `packages/starlight-polyglot/src/handlers/__tests__/contract.test.ts` — Handler contract validation suite
- `packages/starlight-polyglot/src/handlers/__tests__/python.test.ts` — Python handler tests (or co-located)
- `packages/starlight-polyglot/src/handlers/__tests__/typescript.test.ts` — TypeScript handler tests
- `packages/starlight-polyglot/src/handlers/__tests__/rust.test.ts` — Rust handler tests
- `packages/starlight-polyglot/src/handlers/__tests__/r.test.ts` — R handler tests
- `packages/starlight-polyglot/src/handlers/__tests__/julia.test.ts` — Julia handler tests
- `packages/starlight-polyglot/src/handlers/__tests__/csharp.test.ts` — C# handler tests
- `packages/starlight-polyglot/src/handlers/__tests__/go.test.ts` — Go handler tests
- `packages/starlight-polyglot/src/core/__tests__/router.test.ts` — Router tests
- `packages/starlight-polyglot/src/core/__tests__/mdx-generator.test.ts` — MDX generator tests
- `packages/starlight-polyglot/src/core/__tests__/cache.test.ts` — Cache tests
- `fixtures/python/`, `fixtures/typescript/`, `fixtures/rust/`, etc. — Source fixtures
- `golden/python/`, `golden/typescript/`, `golden/rust/`, etc. — Expected MDX output
- `e2e/` — Playwright E2E test site and tests
- `vitest.config.ts` — Vitest configuration with coverage thresholds

## Dependencies

- All Phase 2 handlers (handler_python through handler_go)
- core_mdx_generator_20260513, core_router_plugin_20260513
- ci_cd_20260513 (provides CI workflow that runs tests)
