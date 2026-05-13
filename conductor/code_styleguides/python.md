# Python Style Guide

## General

- **PEP 8** compliance enforced via Ruff (or Black for formatting)
- **Python 3.11+** required (match statement, except* syntax available)
- All files must pass `ruff check` with zero errors
- All files must pass `ruff format` (Black-compatible output)

## Imports

- Use Ruff-managed import ordering (isort compatible): stdlib → third-party → local
- One import per line
- Use `from __future__ import annotations` at the top of every file for deferred evaluation of annotations
- Prefer `import typing` or specific imports from `typing`

```python
from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

import griffe  # third-party
```

## Type Hints

- **All function signatures must have type hints** — parameters and return types
- Use `| None` instead of `Optional[T]` (PEP 604 style)
- Use `list[str]` instead of `List[str]` (PEP 585 style)
- Use `dict[str, Any]` instead of `Dict[str, Any]`
- Use `typing.Protocol` for structural subtyping (duck typing interfaces)

```python
def extract_docs(
    entry_points: list[str],
    output_dir: Path | None = None,
) -> list[dict[str, Any]]:
    """Extract docstrings from Python modules and return as structured JSON."""
    ...
```

## Strings

- **Single quotes** for all string literals — `'hello'` not `"hello"`
- Triple double quotes for docstrings: `"""Documentation."""`
- f-strings preferred over `.format()` or `%` formatting

```python
name = 'starlight-polyglot'
logger.error('Handler failed: %s', error)  # LOG pattern
```

## Logging

- **Use `LOG.error()` / `LOG.warning()` / `LOG.info()` — never `print()`**
- Output JSON results to `stdout` only
- Output log messages, errors, diagnostics to `stderr`

```python
import logging

LOG = logging.getLogger('starlight-polyglot')

def main() -> None:
    logging.basicConfig(level=logging.INFO, stream=sys.stderr)
    LOG.info('Starting extraction for %s', entry_points)
    result = extract(entry_points)
    json.dump(result, sys.stdout, indent=2)
```

## CLI Interface

- Use `argparse` for CLI argument parsing
- Keep interface simple: entry points as positional args, options as flags
- Always include `--help` output
- Return non-zero exit code on failure

```python
import argparse

def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description='Extract Python API documentation to MDX.',
    )
    parser.add_argument(
        'entry_points',
        nargs='+',
        help='Python module paths to extract docs from (e.g., mypackage.mymodule)',
    )
    parser.add_argument(
        '--output', '-o',
        type=Path,
        default=Path('src/content/docs/api/python'),
        help='Output directory for generated MDX files',
    )
    return parser.parse_args(argv)
```

## Error Handling

- Catch specific exceptions — never bare `except:`
- Use `LOG.exception()` for unexpected errors with traceback
- Exit with `sys.exit(1)` on fatal errors

```python
def main() -> None:
    try:
        extract(entry_points)
    except FileNotFoundError:
        LOG.error('Module not found: %s', entry_points)
        sys.exit(1)
    except Exception:
        LOG.exception('Unexpected error during extraction')
        sys.exit(1)
```

## Testing

- Use `pytest` (not `unittest`)
- Fixtures in `conftest.py`
- Use `tmp_path` for temporary file operations
- Mock subprocess calls with `pytest-subprocess` or `unittest.mock`

## Output Contract

- **All extraction scripts write structured JSON to stdout**
- JSON schema must match what the TypeScript handler expects:
  ```json
  {
    "symbols": [
      {
        "name": "MyClass",
        "kind": "class",
        "docstring": "Class description.",
        "source": { "file": "mymodule.py", "line": 42 },
        "members": [ ... ]
      }
    ]
  }
  ```

## File Naming

- snake_case for `.py` filenames: `extract_docs.py`, `__init__.py`
- One logical concern per file; keep extraction scripts under 200 lines

## Prohibited

- No `print()` in production code (use `LOG.*`)
- No wildcard imports (`from module import *`)
- No mutable default arguments
- No `eval()` or `exec()`
- No `# type: ignore` without a comment explaining why
