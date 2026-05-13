# Tracks Registry

## Status Legend
- `[ ]` — Pending
- `[~]` — In Progress
- `[x]` — Completed (with commit SHA)

---

## Phase 0: Foundation (Sequential)

- `[~]` [repo_init_20260513](./tracks/repo_init_20260513/) — GitHub repo + infrastructure
- `[~]` [conductor_setup_20260513](./tracks/conductor_setup_20260513/) — Conductor system setup

## Phase 1: Core Plugin (Parallel trio after Phase 0)

- `[ ]` [plugin_scaffold_20260513](./tracks/plugin_scaffold_20260513/) — npm package scaffold
- `[ ]` [core_mdx_generator_20260513](./tracks/core_mdx_generator_20260513/) — MDX generation engine
- `[ ]` [core_router_plugin_20260513](./tracks/core_router_plugin_20260513/) — Router + Starlight hook

## Phase 2: Handlers (All Parallel)

- `[ ]` [handler_python_20260513](./tracks/handler_python_20260513/) — Python handler (Griffe)
- `[ ]` [handler_typescript_20260513](./tracks/handler_typescript_20260513/) — TypeScript handler (TypeDoc)
- `[ ]` [handler_rust_20260513](./tracks/handler_rust_20260513/) — Rust handler (rustdoc)
- `[ ]` [handler_r_20260513](./tracks/handler_r_20260513/) — R handler (roxygen2)
- `[ ]` [handler_julia_20260513](./tracks/handler_julia_20260513/) — Julia handler (Base.Docs)
- `[ ]` [handler_csharp_20260513](./tracks/handler_csharp_20260513/) — C# handler (xmldoc)
- `[ ]` [handler_go_20260513](./tracks/handler_go_20260513/) — Go handler (gomarkdoc)

## Phase 3: Quality & Release

- `[ ]` [ci_cd_20260513](./tracks/ci_cd_20260513/) — CI/CD pipelines
- `[ ]` [tests_20260513](./tracks/tests_20260513/) — Comprehensive test suite
- `[ ]` [self_docs_20260513](./tracks/self_docs_20260513/) — Self-hosted documentation

## Phase 4: Repo Migrations (All Parallel)

- `[ ]` [migrate_innovate_20260513](./tracks/migrate_innovate_20260513/) — Migrate innovate docs (Sphinx → Starlight)
- `[ ]` [migrate_voiage_20260513](./tracks/migrate_voiage_20260513/) — Migrate voiage docs (Sphinx → Starlight)
- `[ ]` [migrate_mars_20260513](./tracks/migrate_mars_20260513/) — Migrate mars docs (MkDocs → Starlight)
- `[ ]` [migrate_lifecourse_20260513](./tracks/migrate_lifecourse_20260513/) — Migrate lifecourse docs (from scratch → Starlight)

## Phase 5: Recursive SOTA

- `[ ]` [sota_contract_review_20260513](./tracks/sota_contract_review_20260513/) — SOTA contract definition + audit

---

## Cross-Reference

| Track ID | Phase | Priority | Depends On | Fulfills |
|----------|-------|----------|------------|----------|
| repo_init_20260513 | 0 | must | — | REQ-CORE-001 |
| conductor_setup_20260513 | 0 | must | repo_init_20260513 | REQ-CORE-001, REQ-SOTA-001 |
| plugin_scaffold_20260513 | 1 | must | conductor_setup_20260513 | REQ-CORE-001 |
| core_mdx_generator_20260513 | 1 | must | plugin_scaffold_20260513 | REQ-CORE-004, REQ-CORE-005, REQ-CORE-007 |
| core_router_plugin_20260513 | 1 | must | plugin_scaffold_20260513 | REQ-CORE-002, REQ-CORE-003, REQ-CORE-006, REQ-CORE-008..012 |
| handler_python_20260513 | 2 | must | core_mdx_generator_20260513, core_router_plugin_20260513 | REQ-PY-001, REQ-PY-002 |
| handler_typescript_20260513 | 2 | must | core_mdx_generator_20260513, core_router_plugin_20260513 | REQ-TS-001, REQ-TS-002 |
| handler_rust_20260513 | 2 | must | core_mdx_generator_20260513, core_router_plugin_20260513 | REQ-RS-001, REQ-RS-002 |
| handler_r_20260513 | 2 | must | core_mdx_generator_20260513, core_router_plugin_20260513 | REQ-R-001, REQ-R-002 |
| handler_julia_20260513 | 2 | must | core_mdx_generator_20260513, core_router_plugin_20260513 | REQ-JL-001, REQ-JL-002 |
| handler_csharp_20260513 | 2 | must | core_mdx_generator_20260513, core_router_plugin_20260513 | REQ-CS-001, REQ-CS-002 |
| handler_go_20260513 | 2 | must | core_mdx_generator_20260513, core_router_plugin_20260513 | REQ-GO-001, REQ-GO-002 |
| ci_cd_20260513 | 3 | must | All Phase 2 handlers | REQ-CI-001..007 |
| tests_20260513 | 3 | must | All Phase 2 handlers | REQ-QA-001..008, REQ-HDL-001..003 |
| self_docs_20260513 | 3 | must | ci_cd_20260513 | REQ-DOC-001..007 |
| migrate_innovate_20260513 | 4 | must | self_docs_20260513 | REQ-MIG-001, REQ-MIG-005, REQ-MIG-006 |
| migrate_voiage_20260513 | 4 | must | self_docs_20260513 | REQ-MIG-002, REQ-MIG-005, REQ-MIG-006 |
| migrate_mars_20260513 | 4 | must | self_docs_20260513 | REQ-MIG-003, REQ-MIG-005, REQ-MIG-006 |
| migrate_lifecourse_20260513 | 4 | must | self_docs_20260513 | REQ-MIG-004, REQ-MIG-005, REQ-MIG-006 |
| sota_contract_review_20260513 | 5 | should | All Phase 4 migrations | REQ-SOTA-001..004 |