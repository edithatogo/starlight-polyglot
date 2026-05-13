# Tracks Registry

## Status Legend
- `[ ]` — Pending
- `[~]` — In Progress
- `[x]` — Completed (with commit SHA)

---

## Phase 0 — Foundation

### [~] repo_init_20260513
- **Spec**: [conductor/tracks/repo_init_20260513/spec.md](./tracks/repo_init_20260513/spec.md)
- **Plan**: [conductor/tracks/repo_init_20260513/plan.md](./tracks/repo_init_20260513/plan.md)
- **Fulfills**: REQ-CORE-001

### [ ] conductor_setup_20260513
- **Spec**: [conductor/tracks/conductor_setup_20260513/spec.md](./tracks/conductor_setup_20260513/spec.md)
- **Plan**: [conductor/tracks/conductor_setup_20260513/plan.md](./tracks/conductor_setup_20260513/plan.md)
- **Fulfills**: All REQ-*

---

## Phase 1 — Core Plugin

### [ ] plugin_scaffold_20260513
- **Spec**: [conductor/tracks/plugin_scaffold_20260513/spec.md](./tracks/plugin_scaffold_20260513/spec.md)
- **Plan**: [conductor/tracks/plugin_scaffold_20260513/plan.md](./tracks/plugin_scaffold_20260513/plan.md)
- **Fulfills**: REQ-CORE-001, REQ-DOC-007
- **Dependencies**: conductor_setup_20260513

### [ ] core_mdx_generator_20260513
- **Spec**: [conductor/tracks/core_mdx_generator_20260513/spec.md](./tracks/core_mdx_generator_20260513/spec.md)
- **Plan**: [conductor/tracks/core_mdx_generator_20260513/plan.md](./tracks/core_mdx_generator_20260513/plan.md)
- **Fulfills**: REQ-CORE-004, REQ-CORE-005, REQ-CORE-007
- **Dependencies**: plugin_scaffold_20260513

### [ ] core_router_plugin_20260513
- **Spec**: [conductor/tracks/core_router_plugin_20260513/spec.md](./tracks/core_router_plugin_20260513/spec.md)
- **Plan**: [conductor/tracks/core_router_plugin_20260513/plan.md](./tracks/core_router_plugin_20260513/plan.md)
- **Fulfills**: REQ-CORE-002, REQ-CORE-003, REQ-CORE-006, REQ-CORE-008..012
- **Dependencies**: plugin_scaffold_20260513

---

## Phase 2 — Handlers

### [ ] handler_python_20260513
- **Fulfills**: REQ-PY-001, REQ-PY-002
- **Dependencies**: core_mdx_generator, core_router_plugin

### [ ] handler_typescript_20260513
- **Fulfills**: REQ-TS-001, REQ-TS-002
- **Dependencies**: core_mdx_generator, core_router_plugin

### [ ] handler_rust_20260513
- **Fulfills**: REQ-RS-001, REQ-RS-002
- **Dependencies**: core_mdx_generator, core_router_plugin

### [ ] handler_r_20260513
- **Fulfills**: REQ-R-001, REQ-R-002
- **Dependencies**: core_mdx_generator, core_router_plugin

### [ ] handler_julia_20260513
- **Fulfills**: REQ-JL-001, REQ-JL-002
- **Dependencies**: core_mdx_generator, core_router_plugin

### [ ] handler_csharp_20260513
- **Fulfills**: REQ-CS-001, REQ-CS-002
- **Dependencies**: core_mdx_generator, core_router_plugin

### [ ] handler_go_20260513
- **Fulfills**: REQ-GO-001, REQ-GO-002
- **Dependencies**: core_mdx_generator, core_router_plugin

---

## Phase 3 — Quality & Release

### [ ] ci_cd_20260513
- **Spec**: [conductor/tracks/ci_cd_20260513/spec.md](./tracks/ci_cd_20260513/spec.md)
- **Plan**: [conductor/tracks/ci_cd_20260513/plan.md](./tracks/ci_cd_20260513/plan.md)
- **Fulfills**: REQ-CI-001 through REQ-CI-007
- **Dependencies**: All Phase 2 handlers

### [ ] tests_20260513
- **Spec**: [conductor/tracks/tests_20260513/spec.md](./tracks/tests_20260513/spec.md)
- **Plan**: [conductor/tracks/tests_20260513/plan.md](./tracks/tests_20260513/plan.md)
- **Fulfills**: REQ-QA-001 through REQ-QA-008, REQ-HDL-001..003
- **Dependencies**: All Phase 2 handlers

### [ ] self_docs_20260513
- **Spec**: [conductor/tracks/self_docs_20260513/spec.md](./tracks/self_docs_20260513/spec.md)
- **Plan**: [conductor/tracks/self_docs_20260513/plan.md](./tracks/self_docs_20260513/plan.md)
- **Fulfills**: REQ-DOC-001 through REQ-DOC-007
- **Dependencies**: ci_cd_20260513

---

## Phase 4 — Repo Migrations

### [ ] migrate_innovate_20260513
- **Fulfills**: REQ-MIG-001, REQ-MIG-005, REQ-MIG-006
- **Dependencies**: self_docs_20260513

### [ ] migrate_voiage_20260513
- **Fulfills**: REQ-MIG-002, REQ-MIG-005, REQ-MIG-006
- **Dependencies**: self_docs_20260513

### [ ] migrate_mars_20260513
- **Fulfills**: REQ-MIG-003, REQ-MIG-005, REQ-MIG-006
- **Dependencies**: self_docs_20260513

### [ ] migrate_lifecourse_20260513
- **Fulfills**: REQ-MIG-004, REQ-MIG-005, REQ-MIG-006
- **Dependencies**: self_docs_20260513

---

## Phase 5 — SOTA Review

### [ ] sota_contract_review_20260513
- **Spec**: [conductor/tracks/sota_contract_review_20260513/spec.md](./tracks/sota_contract_review_20260513/spec.md)
- **Plan**: [conductor/tracks/sota_contract_review_20260513/plan.md](./tracks/sota_contract_review_20260513/plan.md)
- **Fulfills**: REQ-SOTA-001 through REQ-SOTA-004
- **Dependencies**: All Phase 4 migrations