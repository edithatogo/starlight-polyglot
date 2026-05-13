# Track: conductor_setup_20260513

## Fulfills: REQ-CORE-001, REQ-SOTA-001

## Context / Problem Statement

The starlight-polyglot project needs a governance and workflow system to track progress across 20+ implementation tracks spanning Phases 0–5. Without this infrastructure, there is no centralized mechanism to: (a) maintain the cross-reference between requirements, design diagrams, and implementation tracks; (b) communicate the project's current status to contributors and LLM agents; (c) enforce a repeatable, documented process for how work proceeds from specification through implementation to review.

The Conductor system addresses this by defining a `conductor/` directory at the repository root that serves as a single source of truth for project intelligence. It tracks requirements (MoSCoW), design architecture (with Mermaid diagrams), technology stack (pinned versions), implementation tracks (with metadata + spec + plan), and a workflow document that explains the development lifecycle. The `index.md` file acts as a table of contents, and `tracks.md` serves as the registry of all tracks with their statuses, dependencies, and cross-references.

Additionally, REQ-SOTA-001 requires that a SOTA (State of the Art) software development contract be defined and documented. This contract codifies the standards — branch strategy, commit conventions, code review requirements, testing thresholds, CI/CD expectations, and release protocols — that every contributor and every track must follow. The Conductor system itself is the vehicle for documenting, tracking, and enforcing this contract.

## Acceptance Criteria

1. `conductor/workflow.md` exists and documents the complete development lifecycle: track creation → spec review → implementation → PR review → merge → status update.
2. `conductor/setup_state.json` exists and records the initial state of all conductor files (paths, hashes, last-updated timestamps) for integrity verification.
3. `conductor/index.md` is updated to include working links to `workflow.md` and `setup_state.json`.
4. The SOTA development contract is defined within `conductor/workflow.md` covering: branch naming convention, conventional commit format, PR template expectations, code review gatekeeping rules, testing thresholds, and release protocol.
5. `conductor/tracks.md` is verified to contain correct cross-references for all 21 tracks (IDs, phases, dependency chains, fulfilled requirements).
6. All conductor `.md` files use consistent frontmatter conventions (title, description) suitable for rendering as LLM-friendly context.
7. A `conductor/CHANGELOG.md` or equivalent mechanism exists to document changes to the conductor system itself.
8. The conductor system can be validated by running a checklist script that verifies: all referenced files exist, all cross-reference IDs resolve, all dependency DAGs are acyclic.

## Technical Approach

The Conductor system is a documentation-only infrastructure with no runtime code. It lives entirely in the `conductor/` directory and is written in Markdown with Mermaid diagram support. The approach is:

1. **Create `workflow.md`** — A comprehensive document that defines the development lifecycle:
   - How tracks are created (spec.md + plan.md + metadata.json)
   - How tracks progress through states: pending → in_progress → completed
   - The SOTA contract (branch naming: `feat/`, `fix/`, `chore/`; commit format: `conventional-commits`; PR requirements: linked track, acceptance criteria checklist)
   - Code review rules (at least one approval, all CI green, no breaking changes without explicit approval)
   - Release process (changesets → version bump → npm publish with SLSA provenance)

2. **Create `setup_state.json`** — A JSON file that records the canonical set of conductor files with their SHA256 hashes and last-updated timestamps, enabling downstream audits to detect drift.

3. **Update `index.md`** — Ensure the workflow.md and setup_state.json references actually resolve.

4. **Validate `tracks.md`** — Cross-check all 21 track entries against their metadata.json files, phase assignments, dependency declarations, and requirement links.

5. **Add frontmatter** — Each conductor Markdown file gets YAML frontmatter (`title`, `description`, `lastUpdated`) for discoverability.

6. **Create validation script** — A shell script or simple Node.js script (`conductor/validate.mjs`) that programmatically checks conductor integrity: file existence, cross-reference resolution, DAG cycle detection.

## Files to Create/Modify

- `conductor/workflow.md` — **Create**. Complete development lifecycle + SOTA contract.
- `conductor/setup_state.json` — **Create**. Integrity snapshot of all conductor files.
- `conductor/index.md` — **Modify**. Fix links to workflow.md and setup_state.json.
- `conductor/validate.mjs` — **Create**. Programmatic integrity checker.
- `conductor/tracks.md` — **Modify** (if needed). Ensure accuracy of all cross-references.

## Dependencies

- `repo_init_20260513` — Repository must exist with initial directory structure before conductor files can be committed.
