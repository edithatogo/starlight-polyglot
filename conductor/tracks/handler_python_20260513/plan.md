# Plan: handler_python_20260513

## Phase 1: Handler Class & Subprocess Integration
- [ ] Create `src/handlers/python.ts` with `PythonHandler` class implementing `Handler` interface (references: REQ-PY-001, DGN-CONTRACT-001)
- [ ] Implement `generate(options)` constructing griffe CLI command from entryPoints (references: REQ-PY-002)
- [ ] Integrate with `runSubprocess` from core for subprocess spawning with timeout (references: REQ-CORE-011)
- [ ] Handle griffe CLI not found with actionable error message: 'Install griffe: pip install griffe' (references: REQ-HDL-003)

## Phase 2: AST Parsing & Transformation
- [ ] Parse griffe JSON output into intermediate symbol tree (references: REQ-PY-001)
- [ ] Transform modules, classes, functions, attributes into standardized AST format (references: DGN-CONTRACT-001)
- [ ] Map Google-style docstring sections (Args, Returns, Raises) into structured description (references: REQ-PY-001)
- [ ] Map NumPy-style and Sphinx-style docstrings into same structured format (references: REQ-PY-001)
- [ ] Map standard PEP 257 docstrings as plain description (references: REQ-PY-001)

## Phase 3: Edge Cases & Error Handling
- [ ] Handle empty modules with empty result (references: REQ-HDL-002)
- [ ] Handle malformed griffe output with descriptive error (references: REQ-HDL-003)
- [ ] Validate entry points exist before spawning subprocess (references: REQ-PY-002)
- [ ] Handle subprocess timeout with specific 'Python handler timed out' error (references: REQ-CORE-011)
- [ ] Add `python` to Language type union if not already present

## Phase 4: Registration & Verification
- [ ] Export `PythonHandler` from `src/handlers/index.ts` (references: DGN-REPO-001)
- [ ] Create `src/handlers/python.test.ts` with mock griffe output fixture (references: REQ-QA-005, REQ-QA-006)
- [ ] Verify handler contract compliance with contract validation tests (references: REQ-HDL-001)
- [ ] Test with a real Python package (e.g., `requests`) end-to-end
