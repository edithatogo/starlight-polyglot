# Track: migrate_voiage_20260513

## Fulfills: REQ-MIG-002, REQ-MIG-005, REQ-MIG-006

## Context / Problem Statement

The voiage project currently uses Sphinx for documentation. Similar to innovate, voiage's documentation must be migrated from Sphinx to Starlight + the polyglot plugin. The voiage project contains a mix of Python and TypeScript source code, making it an excellent candidate for demonstrating the polyglot plugin's multi-language capabilities. Both the Python handler and TypeScript handler will be used to document voiage's API surface.

Per REQ-MIG-002, voiage must be migrated from Sphinx to Starlight + polyglot. Per REQ-MIG-005, the migrated repo's conductor tech-stack.md must be updated. Per REQ-MIG-006, the migrated repo gets a `starlight_migration` conductor track. The migration covers converting existing RST content to MDX, configuring both Python and TypeScript handlers, and setting up CI/CD deployment.

## Acceptance Criteria

1. voiage repository has a new Starlight documentation site initialized
2. Existing Sphinx RST documentation content is converted to Starlight-compatible MDX/Markdown
3. Polyglot plugin configured with Python + TypeScript handlers for voiage's source code
4. Auto-generated API docs appear for both Python and TypeScript modules
5. voiage's conductor/tech-stack.md updated to reference Starlight (REQ-MIG-005)
6. voiage's conductor/tracks/ includes a `migrate_starlight` track (REQ-MIG-006)
7. Old Sphinx build configuration is removed or deprecated with redirects
8. GitHub Actions workflow deploys Starlight docs site

## Technical Approach

Similar to the innovate migration but adds the TypeScript handler alongside the Python handler. This demonstrates the polyglot plugin's core value proposition: documenting multiple languages from a single Starlight instance. The RST-to-MDX conversion follows the same process as innovate. The Starlight sidebar includes separate groups for Python API and TypeScript API documentation.

## Files to Create/Modify

- In voiage repo:
  - `docs/astro-site/` — New Starlight docs site
  - `conductor/tech-stack.md` — Update
  - `conductor/tracks/migrate_starlight/` — Migration track
  - `.github/workflows/docs.yml` — Docs deployment

## Dependencies

- self_docs_20260513 (template for docs site)
- handler_python_20260513 (Python handler)
- handler_typescript_20260513 (TypeScript handler)
