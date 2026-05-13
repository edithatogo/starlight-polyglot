# Project Workflow

## Guiding Principles
1. **The Plan is the Source of Truth:** All work tracked in `plan.md`
2. **Test-Driven Development:** Red → Green → Refactor
3. **>90% Code Coverage:** Enforced in CI, checked at every phase checkpoint
4. **Conventional Commits:** `feat:`, `fix:`, `test:`, `docs:`, `chore:`, `refactor:`
5. **Handler Contract First:** Every handler must pass the `Handler` interface validation tests before implementation is accepted
6. **Conductor Review at Each Checkpoint:** `/conductor:review` runs automatically at phase completion → auto-applies fixes → progresses

## Task Lifecycle
1. Select task from `plan.md`, mark `[~]`
2. **Red:** Write failing tests
3. **Green:** Implement minimum code to pass
4. **Refactor:** Clean up, verify tests still pass
5. **Verify Coverage:** Ensure >90%
6. **Commit:** Conventional commit message + SHA appended to plan.md
7. **Phase completion:** Run `/conductor:review` → auto-fix → push → next

## Handler Developer Guide
Every new handler must:
1. Implement the `Handler` interface (defined in `packages/starlight-polyglot/core/plugin.ts`)
2. Register in the Router's language map
3. Add extraction script in `packages/starlight-polyglot/scripts/`
4. Add unit tests in `packages/starlight-polyglot/tests/` with golden fixtures
5. Document in the self-hosted Starlight docs

## CI Gates
- `lint` — ESLint strict, zero warnings
- `typecheck` — TypeScript strict, zero errors
- `test` — Vitest, >90% coverage, handler contract tests pass
- `size` — size-limit <50KB
- `build` — Package builds successfully
- `e2e` — Playwright tests (Chromium)

## Release Triggers
- Conventional commits → changeset → version bump
- npm publish with provenance (SLSA Level 3)
- GitHub Release with auto-changelog
