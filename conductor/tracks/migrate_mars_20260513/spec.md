# Track: migrate_mars_20260513

## Fulfills: REQ-MIG-003, REQ-MIG-005, REQ-MIG-006

## Context / Problem Statement

The mars project currently uses MkDocs for documentation. Unlike Sphinx (which uses RST), MkDocs uses Markdown, making the content migration simpler. The mars project contains Go source code, and the polyglot plugin's Go handler will be used to generate API documentation. This migration serves as a reference for MkDocs-to-Starlight migrations and demonstrates the Go handler integration.

Per REQ-MIG-003, mars must be migrated from MkDocs to Starlight + polyglot. Per REQ-MIG-005, the migrated repo's conductor tech-stack.md must be updated. Per REQ-MIG-006, the migrated repo gets a `starlight_migration` conductor track. Because MkDocs already uses Markdown, the migration primarily involves restructuring the content to fit Starlight's sidebar and page hierarchy rather than format conversion.

## Acceptance Criteria

1. mars repository has a new Starlight documentation site initialized
2. Existing MkDocs Markdown pages are migrated to Starlight's content structure
3. Polyglot plugin configured with Go handler pointing at mars's Go source code
4. Auto-generated Go API docs appear alongside migrated hand-written content
5. mars's conductor/tech-stack.md updated to reference Starlight (REQ-MIG-005)
6. mars's conductor/tracks/ includes a `migrate_starlight` track (REQ-MIG-006)
7. Old MkDocs configuration is removed with redirects if needed
8. GitHub Actions workflow deploys Starlight docs site
9. `mkdocs.yml` is deprecated with a notice pointing to new docs

## Technical Approach

Clone the mars repository, create a Starlight docs project, migrate existing MkDocs Markdown pages into Starlight's `src/content/docs/` directory. Since both use Markdown, the migration is primarily about frontmatter and sidebar navigation. Configure the polyglot plugin with the Go handler pointing at mars's Go modules for auto-generated API docs. Add conductor documentation and CI/CD.

## Files to Create/Modify

- In mars repo:
  - `docs/astro-site/` — New Starlight docs site
  - `conductor/tech-stack.md` — Update
  - `conductor/tracks/migrate_starlight/` — Migration track
  - `.github/workflows/docs.yml` — Docs deployment
  - `mkdocs.yml` — Add deprecation notice (modify)

## Dependencies

- self_docs_20260513 (template for docs site)
- handler_go_20260513 (Go handler for Go source)
