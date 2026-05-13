# Plan: conductor_setup_20260513

## Phase 1: SOTA Contract & Workflow Definition

- [ ] Draft `conductor/workflow.md` with complete development lifecycle:
  - Track creation workflow (spec → plan → metadata → review → implement)
  - Track status lifecycle (pending → in_progress → completed)
  - Branch naming convention (`feat/`, `fix/`, `chore/`, `docs/`)
  - Conventional commit format (`type(scope): description`)
  - PR requirements template (linked track, acceptance criteria, screenshots if UI)
  - Code review gatekeeping (1 approval minimum, all CI green, no force-push to main)
  - Release protocol (changesets → version bump → npm publish with SLSA provenance)
  - Contributing expectations (references: REQ-SOTA-001, DGN-CICD-001, product-guidelines.md)

## Phase 2: Setup State & Integrity

- [ ] Create `conductor/setup_state.json` with:
  - List of all canonical conductor files with relative paths
  - SHA256 hash of each file's current content
  - ISO-8601 timestamp of last verification
  - Schema version for forward compatibility
- [ ] Create `conductor/validate.mjs` — Node.js validation script that:
  - Reads `setup_state.json` and verifies file existence + content hashes
  - Parses all files for `REQ-XXX`, `DGN-XXX`, `TRK-XXX` references and validates they resolve
  - Builds the track dependency DAG and checks for cycles
  - Reports pass/fail per check category
  - Returns exit code 0 on full pass, 1 on any failure
  - (references: REQ-SOTA-001, REQ-SOTA-004)

## Phase 3: Cross-Reference Verification & Index Update

- [ ] Verify all 21 tracks in `conductor/tracks.md` for correctness:
  - Cross-check each track's `depends_on` against its `metadata.json`
  - Cross-check each track's `fulfills` against its `metadata.json`
  - Verify phase assignments match directory locations
  - Ensure no orphan tracks (every track referenced at least once)
  - Ensure no dangling dependencies (every depended-on track exists)
- [ ] Update `conductor/tracks.md` if any discrepancies found
- [ ] Update `conductor/index.md` to fix links to `workflow.md` and `setup_state.json`
- [ ] Add YAML frontmatter (`title`, `description`, `lastUpdated`) to all conductor `.md` files:
  - `index.md`
  - `product.md`
  - `product-guidelines.md`
  - `requirements.md`
  - `design.md`
  - `tech-stack.md`
  - `tracks.md`
  - `workflow.md`
  - `code_styleguides/typescript.md`
  - `code_styleguides/python.md`
  - All track spec.md and plan.md files
  - (references: REQ-CORE-001, REQ-SOTA-001, DGN-ARCH-001)

## Phase 4: Final Validation & Sign-Off

- [ ] Run `conductor/validate.mjs` and fix all issues
- [ ] Verify every requirement ID in `conductor/requirements.md` has at least one linked track
- [ ] Verify every track in `conductor/tracks.md` links to existing `.md` files in its directory
- [ ] Mark `conductor_setup_20260513` as completed in `conductor/tracks.md` with commit SHA
- [ ] Update `conductor_setup_20260513/metadata.json` status to `completed`
- [ ] (references: REQ-SOTA-001, REQ-SOTA-004, DGN-CICD-001)
