# Requirements (MoSCoW)

## Conventions
- `REQ-{CATEGORY}-{NUM}` — Requirement ID
- `[MUST]` — Required for MVP
- `[SHOULD]` — High priority but not blocking
- `[COULD]` — Nice to have, post-MVP
- `[WONT]` — Explicitly out of scope for this cycle

## CORE — Plugin Core

| ID | Requirement | Priority | Fulfilled By |
|----|-------------|----------|-------------|
| REQ-CORE-001 | Register as valid Starlight plugin via `config:setup` hook | MUST | TRK-plugin_scaffold, TRK-core_router_plugin |
| REQ-CORE-002 | Accept config object mapping languages to entry points | MUST | TRK-core_router_plugin |
| REQ-CORE-003 | Dispatch each language to correct handler | MUST | TRK-core_router_plugin |
| REQ-CORE-004 | Generate Starlight-native MDX with valid frontmatter | MUST | TRK-core_mdx_generator |
| REQ-CORE-005 | MDX must include title, description, pagefind-index metadata | MUST | TRK-core_mdx_generator |
| REQ-CORE-006 | Auto-register generated pages in Starlight sidebar | MUST | TRK-core_router_plugin |
| REQ-CORE-007 | Support `output` option for generated file location | MUST | TRK-core_mdx_generator |
| REQ-CORE-008 | Report generation progress per language to console | SHOULD | TRK-core_router_plugin |
| REQ-CORE-009 | Cache extraction output, skip unchanged sources | SHOULD | TRK-core_router_plugin |
| REQ-CORE-010 | Support `watch: true` for dev server rebuild | SHOULD | TRK-core_router_plugin |
| REQ-CORE-011 | Timeout subprocesses (default 60s, configurable) | MUST | TRK-core_router_plugin |
| REQ-CORE-012 | Handle `preview` command gracefully (skip generation) | MUST | TRK-core_router_plugin |
# Requirements (MoSCoW)

## Conventions
- `REQ-{CATEGORY}-{NUM}` — Requirement ID
- `[MUST]` — Required for MVP
- `[SHOULD]` — High priority but not blocking
- `[COULD]` — Nice to have, post-MVP
- `[WONT]` — Explicitly out of scope for this cycle

## HANDLER — Per-Language

| ID | Requirement | Priority | Fulfilled By |
|----|-------------|----------|-------------|
| REQ-PY-001 | Python handler via Griffe CLI subprocess | MUST | TRK-handler_python |
| REQ-PY-002 | Python handler supports `entryPoints` as module paths | MUST | TRK-handler_python |
| REQ-TS-001 | TypeScript handler uses TypeDoc as JS library (not subprocess) | MUST | TRK-handler_typescript |
| REQ-TS-002 | TypeScript handler accepts `tsconfig` path option | MUST | TRK-handler_typescript |
| REQ-RS-001 | Rust handler parses `cargo +nightly rustdoc --output-format json` | MUST | TRK-handler_rust |
| REQ-RS-002 | Rust handler accepts `cratePath` option | MUST | TRK-handler_rust |
| REQ-R-001 | R handler runs `Rscript extract.R`, parses JSON output | MUST | TRK-handler_r |
| REQ-R-002 | R handler accepts `entryPoints` pointing to .R files | MUST | TRK-handler_r |
| REQ-JL-001 | Julia handler runs `julia extract.jl`, parses JSON output | MUST | TRK-handler_julia |
| REQ-JL-002 | Julia handler accepts `entryPoints` option | MUST | TRK-handler_julia |
| REQ-CS-001 | C# handler parses .NET XML documentation files | MUST | TRK-handler_csharp |
| REQ-CS-002 | C# handler accepts `projectPath` option | MUST | TRK-handler_csharp |
| REQ-GO-001 | Go handler runs `gomarkdoc --output json` | MUST | TRK-handler_go |
| REQ-GO-002 | Go handler accepts `modulePath` option | MUST | TRK-handler_go |
| REQ-HDL-001 | All handlers implement `Handler` interface contract | MUST | TRK-tests |
| REQ-HDL-002 | All handlers handle empty source gracefully | MUST | TRK-tests |
| REQ-HDL-003 | All handlers report meaningful errors on failure | MUST | TRK-tests |

## QA — Quality Assurance

| ID | Requirement | Priority | Fulfilled By |
|----|-------------|----------|-------------|
| REQ-QA-001 | Full test suite achieves >90% line coverage | MUST | TRK-tests |
| REQ-QA-002 | TypeScript strict mode, zero errors | MUST | TRK-tests |
| REQ-QA-003 | ESLint passes with zero warnings in CI | MUST | TRK-tests |
| REQ-QA-004 | Prettier formatting passes in CI | MUST | TRK-tests |
| REQ-QA-005 | Each handler has contract validation tests | MUST | TRK-tests |
| REQ-QA-006 | Each handler has golden fixture tests | MUST | TRK-tests |
| REQ-QA-007 | Playwright E2E tests for rendered MDX pages | SHOULD | TRK-tests |
| REQ-QA-008 | Bundle size not exceed 50KB (core) | SHOULD | TRK-ci_cd |

## CI/CD

| ID | Requirement | Priority | Fulfilled By |
|----|-------------|----------|-------------|
| REQ-CI-001 | CI runs lint + type-check + test + build on every PR | MUST | TRK-ci_cd |
| REQ-CI-002 | CI fails if coverage drops below 90% | MUST | TRK-ci_cd |
| REQ-CI-003 | CI fails if bundle size exceeds limit | SHOULD | TRK-ci_cd |
| REQ-CI-004 | Release publishes to npm with SLSA Level 3 provenance | MUST | TRK-ci_cd |
| REQ-CI-005 | Release creates GitHub Release with changelog | MUST | TRK-ci_cd |
| REQ-CI-006 | Docs workflow builds + deploys Starlight to GitHub Pages | MUST | TRK-ci_cd |
| REQ-CI-007 | Renovate configured for grouped, auto-merged updates | SHOULD | TRK-ci_cd |

## DOC — Documentation


## MIG — Repo Migrations

| ID | Requirement | Priority | Fulfilled By |
|----|-------------|----------|-------------|
| REQ-MIG-001 | innovate: Sphinx → Starlight + polyglot | MUST | TRK-migrate_innovate |
| REQ-MIG-002 | voiage: Sphinx → Starlight + polyglot | MUST | TRK-migrate_voiage |
| REQ-MIG-003 | mars: MkDocs → Starlight + polyglot | MUST | TRK-migrate_mars |
| REQ-MIG-004 | lifecourse: from scratch → Starlight + polyglot | MUST | TRK-migrate_lifecourse |
| REQ-MIG-005 | Each migrated repo updates conductor tech-stack.md | MUST | TRK-migrate_* |
| REQ-MIG-006 | Each migrated repo gets starlight_migration conductor track | MUST | TRK-migrate_* |

## SOTA — Recursive Review

| ID | Requirement | Priority | Fulfilled By |
|----|-------------|----------|-------------|
| REQ-SOTA-001 | SOTA software development contract defined and documented | MUST | TRK-sota_contract_review |
| REQ-SOTA-002 | Entire project audited against SOTA contract | MUST | TRK-sota_contract_review |
| REQ-SOTA-003 | Gap improvement tracks auto-generated | SHOULD | TRK-sota_contract_review |
| REQ-SOTA-004 | SOTA audit is repeatable on demand | MUST | TRK-sota_contract_review |

## COULD (Phase 2+)

| ID | Requirement | Priority |
|----|-------------|----------|
| REQ-PH2-001 | Java handler via javadoc-json | COULD |
| REQ-PH2-002 | Kotlin handler via Dokka | COULD |
| REQ-PH2-003 | C++ handler via Doxygen | COULD |
| REQ-PH2-004 | Swift handler via Jazzy | COULD |
| REQ-PH2-005 | Scala handler via ScalaDoc | COULD |
| REQ-PH2-006 | Ruby handler via YARD | COULD |
| REQ-PH2-007 | Dart handler via dartdoc | COULD |
| REQ-PH2-008 | PHP handler via phpDocumentor | COULD |
| REQ-PH2-009 | Elixir handler via ExDoc | COULD |

## WON'T (this cycle)

| ID | Requirement | Reason |
|----|-------------|--------|
| REQ-WNT-001 | Real-time API docs preview in dev server | Complex; defer to watch mode |
| REQ-WNT-002 | Auto-detect languages from file extensions | User must specify handlers explicitly |
| REQ-WNT-003 | Support all 33 languages in product vision | Scope: 7 Phase 1 handlers only |
| REQ-WNT-004 | Web UI for plugin configuration | CLI-only configuration |
| ID | Requirement | Priority | Fulfilled By |
|----|-------------|----------|-------------|
| REQ-DOC-001 | Self-hosted Starlight documentation site | MUST | TRK-self_docs |
| REQ-DOC-002 | Dogfood polyglot plugin on own TypeScript source | MUST | TRK-self_docs |
| REQ-DOC-003 | Use `starlight-links-validator` for CI link checks | MUST | TRK-self_docs |
| REQ-DOC-004 | Use `starlight-versions` for versioned docs | SHOULD | TRK-self_docs |
| REQ-DOC-005 | Include getting started, config reference, handler dev guide | MUST | TRK-self_docs |
| REQ-DOC-006 | LLM-friendly docs via `starlight-llms-txt` | COULD | TRK-self_docs |
| REQ-DOC-007 | Each repo's conductor documents its Starlight migration | MUST | TRK-migrate_* |

---

## CORE — Plugin Core

| ID | Requirement | Priority | Fulfilled By |
|----|-------------|----------|-------------|
| REQ-CORE-001 | Plugin must register as a valid Starlight plugin via `config:setup` hook | MUST | TRK-plugin_scaffold, TRK-core_router_plugin |
| REQ-CORE-002 | Plugin must accept a configuration object mapping languages to entry points | MUST | TRK-core_router_plugin |
| REQ-CORE-003 | Plugin must dispatch each language to the correct handler | MUST | TRK-core_router_plugin |
| REQ-CORE-004 | Plugin must generate Starlight-native MDX files with valid frontmatter | MUST | TRK-core_mdx_generator |
| REQ-CORE-005 | Generated MDX must include title, description, sidebar_label, pagefind-index metadata | MUST | TRK-core_mdx_generator |
| REQ-CORE-006 | Plugin must auto-register generated pages in Starlight sidebar | MUST | TRK-core_router_plugin |
| REQ-CORE-007 | Plugin must support an `output` option to control where generated files go | MUST | TRK-core_mdx_generator |
| REQ-CORE-008 | Plugin must report generation progress per language to the console | SHOULD | TRK-core_router_plugin |
| REQ-CORE-009 | Plugin must cache extraction output and skip unchanged sources | SHOULD | TRK-core_router_plugin |
| REQ-CORE-010 | Plugin must support `watch: true` for dev server rebuild-on-change | SHOULD | TRK-core_router_plugin |
| REQ-CORE-011 | Plugin must timeout subprocesses after a configurable duration (default 60s) | MUST | TRK-core_router_plugin |
| REQ-CORE-012 | Plugin must handle the `preview` command gracefully (skip generation) | MUST | TRK-core_router_plugin |

---

## HANDLER — Per-Language Handlers

| ID | Requirement | Priority | Fulfilled By |
|----|-------------|----------|-------------|
| REQ-PY-001 | Python handler must extract docstrings via Griffe CLI subprocess | MUST | TRK-handler_python |
| REQ-PY-002 | Python handler must support `entryPoints` as module paths | MUST | TRK-handler_python |
| REQ-TS-001 | TypeScript handler must use TypeDoc via JS library (not subprocess) | MUST | TRK-handler_typescript |
| REQ-TS-002 | TypeScript handler must accept a `tsconfig` path option | MUST | TRK-handler_typescript |
| REQ-RS-001 | Rust handler must parse `cargo +nightly rustdoc --output-format json` output | MUST | TRK-handler_rust |
| REQ-RS-002 | Rust handler must accept a `cratePath` option | MUST | TRK-handler_rust |
| REQ-R-001 | R handler must run `Rscript extract.R` and parse JSON output | MUST | TRK-handler_r |
| REQ-R-002 | R handler must accept an `entryPoints` option pointing to `.R` files | MUST | TRK-handler_r |
| REQ-JL-001 | Julia handler must run `julia extract.jl` and parse JSON output | MUST | TRK-handler_julia |
| REQ-JL-002 | Julia handler must accept an `entryPoints` option | MUST | TRK-handler_julia |
| REQ-CS-001 | C# handler must parse .NET XML documentation files | MUST | TRK-handler_csharp |
| REQ-CS-002 | C# handler must accept a `projectPath` option | MUST | TRK-handler_csharp |
| REQ-GO-001 | Go handler must run `gomarkdoc --output json` and parse output | MUST | TRK-handler_go |
| REQ-GO-002 | Go handler must accept a `modulePath` option | MUST | TRK-handler_go |
| REQ-HDL-001 | Every handler must implement the `Handler` interface contract | MUST | TRK-tests |
| REQ-HDL-002 | Every handler must handle empty source input gracefully (no crash) | MUST | TRK-tests |
| REQ-HDL-003 | Every handler must report meaningful error messages on failure | MUST | TRK-tests |

---

## QA — Quality Assurance

| ID | Requirement | Priority | Fulfilled By |
|----|-------------|----------|-------------|
| REQ-QA-001 | Full test suite must achieve >90% line coverage | MUST | TRK-tests |
| REQ-QA-002 | All TypeScript must pass strict mode with zero errors | MUST | TRK-tests |
| REQ-QA-003 | ESLint must pass with zero warnings in CI | MUST | TRK-tests |
| REQ-QA-004 | Prettier formatting check must pass in CI | MUST | TRK-tests |
| REQ-QA-005 | Each handler must have contract validation tests | MUST | TRK-tests |
| REQ-QA-006 | Each handler must have golden fixture tests | MUST | TRK-tests |
| REQ-QA-007 | Playwright E2E tests must verify rendered MDX pages in Starlight | SHOULD | TRK-tests |
| REQ-QA-008 | Bundle size must not exceed 50KB (core only) | SHOULD | TRK-ci_cd |

---

## CI/CD — Continuous Integration & Deployment

| ID | Requirement | Priority | Fulfilled By |
|----|-------------|----------|-------------|
| REQ-CI-001 | CI must run lint + type-check + test + build on every PR | MUST | TRK-ci_cd |
| REQ-CI-002 | CI must fail if coverage drops below 90% | MUST | TRK-ci_cd |
| REQ-CI-003 | CI must fail if bundle size exceeds limit | SHOULD | TRK-ci_cd |
| REQ-CI-004 | Release workflow must publish to npm with SLSA Level 3 provenance | MUST | TRK-ci_cd |
| REQ-CI-005 | Release workflow must create GitHub Release with changelog | MUST | TRK-ci_cd |
| REQ-CI-006 | Docs workflow must build and deploy Starlight site to GitHub Pages | MUST | TRK-ci_cd |
| REQ-CI-007 | Renovate must be configured for grouped, auto-merged dependency updates | SHOULD | TRK-ci_cd |

---

## DOC — Documentation

| ID | Requirement | Priority | Fulfilled By |
|----|-------------|----------|-------------|
| REQ-DOC-001 | Plugin must have a self-hosted Starlight documentation site | MUST | TRK-self_docs |
| REQ-DOC-002 | Self-docs must dogfood the polyglot plugin on its own TypeScript source | MUST | TRK-self_docs |
| REQ-DOC-003 | Self-docs must use `starlight-links-validator` for link checks | MUST | TRK-self_docs |
| REQ-DOC-004 | Self-docs must use `starlight-versions` for versioned documentation | SHOULD | TRK-self_docs |
| REQ-DOC-005 | Self-docs must include getting started, configuration reference, and handler development guide | MUST | TRK-self_docs |
| REQ-DOC-006 | Plugin must publish LLM-friendly docs via `starlight-llms-txt` | COULD | TRK-self_docs |
| REQ-DOC-007 | Each repo's conductor must document its Starlight migration | MUST | TRK-migrate_* |

---

## MIG — Repo Migrations

| ID | Requirement | Priority | Fulfilled By |
|----|-------------|----------|-------------|
| REQ-MIG-001 | innovate must be migrated from Sphinx to Starlight + polyglot | MUST | TRK-migrate_innovate |
| REQ-MIG-002 | voiage must be migrated from Sphinx to Starlight + polyglot | MUST | TRK-migrate_voiage |
| REQ-MIG-003 | mars must be migrated from MkDocs to Starlight + polyglot | MUST | TRK-migrate_mars |
| REQ-MIG-004 | lifecourse must be migrated from scratch to Starlight + polyglot | MUST | TRK-migrate_lifecourse |
| REQ-MIG-005 | Each migrated repo must have its conductor tech-stack.md updated | MUST | TRK-migrate_* |
| REQ-MIG-006 | Each migrated repo must have a starlight_migration track in its conductor | MUST | TRK-migrate_* |

---

## SOTA — Recursive Review

| ID | Requirement | Priority | Fulfilled By |
|----|-------------|----------|-------------|
| REQ-SOTA-001 | A SOTA software development contract must be defined and documented | MUST | TRK-sota_contract_review |
| REQ-SOTA-002 | The entire project must be audited against the SOTA contract | MUST | TRK-sota_contract_review |
| REQ-SOTA-003 | Gap improvement tracks must be automatically generated | SHOULD | TRK-sota_contract_review |
| REQ-SOTA-004 | The SOTA audit must be repeatable on demand | MUST | TRK-sota_contract_review |

---

## COULD (Phase 2+)

| ID | Requirement | Priority |
|----|-------------|----------|
| REQ-PH2-001 | Java handler via javadoc-json | COULD |
| REQ-PH2-002 | Kotlin handler via Dokka | COULD |
| REQ-PH2-003 | C++ handler via Doxygen | COULD |
| REQ-PH2-004 | Swift handler via Jazzy | COULD |
| REQ-PH2-005 | Scala handler via ScalaDoc | COULD |
| REQ-PH2-006 | Ruby handler via YARD | COULD |
| REQ-PH2-007 | Dart handler via dartdoc | COULD |
| REQ-PH2-008 | PHP handler via phpDocumentor | COULD |
| REQ-PH2-009 | Elixir handler via ExDoc | COULD |

---

## WON'T (this cycle)

| ID | Requirement | Reason |
|----|-------------|--------|
| REQ-WNT-001 | Real-time preview of API docs in dev server | Complex, defer to watch mode |
| REQ-WNT-002 | Automatic language detection from file extensions | User must specify handlers explicitly |
| REQ-WNT-003 | Support for all 33 languages in product vision | Scoped to 7 Phase 1 handlers |
| REQ-WNT-004 | Web UI for configuring plugin | CLI-only configuration |