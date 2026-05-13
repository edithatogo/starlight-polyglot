# Track: handler_python_20260513

## Fulfills: REQ-PY-001, REQ-PY-002

## Context / Problem Statement

Python is one of the most common languages in polyglot projects, especially in scientific computing, ML/AI, and data engineering. The Python handler must extract docstrings (Google-style, NumPy-style, Sphinx-style, and standard PEP 257) from Python modules using the Griffe library's CLI interface. Griffe is a fast, modern Python docstring extraction tool that supports all major docstring formats and outputs structured JSON ASTs.

Per REQ-PY-001, the handler invokes `python -m griffe dump <module> --format json` as a subprocess and parses the JSON output. Per REQ-PY-002, it accepts `entryPoints` as Python module paths (e.g., `mypackage.mymodule`). The handler transforms Griffe's AST format into the standardized intermediate representation that the MDX Generator consumes.

## Acceptance Criteria

1. `PythonHandler` implements the `Handler` interface from `src/core/types.ts`
2. Handler invokes `python -m griffe dump` with the given `entryPoints` as a subprocess
3. Handler accepts `entryPoints` array of Python module paths (e.g., `['requests', 'requests.models']`)
4. Handler parses Griffe's JSON output and transforms symbols (modules, classes, functions, attributes) into the standardized AST format
5. Handler maps Google-style, NumPy-style, Sphinx-style, and PEP 257 docstring sections to structured descriptions
6. Handler handles missing griffe CLI gracefully with a clear error message suggesting `pip install griffe`
7. Handler handles empty modules (no public symbols) returning an empty result array
8. Handler respects the `timeout` configuration from Router for subprocess termination
9. Handler validates entry points exist before spawning subprocess

## Technical Approach

Create `PythonHandler` class implementing `Handler` in `src/handlers/python.ts`. The `generate(options)` method constructs the Griffe CLI command, spawns it via the shared `runSubprocess` utility from core, parses JSON stdout, and transforms the Griffe AST into the standardized intermediate format. Griffe's output includes module name, file path, docstring (with parsed sections), and member hierarchy. The transform step normalizes docstring sections into a consistent format regardless of source style (Google/NumPy/Sphinx).

## Files to Create/Modify

- `packages/starlight-polyglot/src/handlers/python.ts` — PythonHandler class
- `packages/starlight-polyglot/src/handlers/python.test.ts` — Unit tests
- `packages/starlight-polyglot/src/handlers/index.ts` — Export all handlers (modify)
- `packages/starlight-polyglot/src/scripts/extract_docs.py` — Python helper script (optional, Griffe may be sufficient directly)
- `packages/starlight-polyglot/src/core/types.ts` — May need Language type update (modify)

## Dependencies

- core_mdx_generator_20260513 (provides MDXOutput types and MDXGenerator)
- core_router_plugin_20260513 (provides Handler interface, subprocess utility, Router)
