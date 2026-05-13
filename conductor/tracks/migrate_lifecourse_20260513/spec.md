# Track: migrate_lifecourse_20260513

## Fulfills: REQ-MIG-004, REQ-MIG-005, REQ-MIG-006

## Context / Problem Statement

The lifecourse project is a new project that needs documentation built from scratch. Unlike the other migration tracks (which convert existing documentation systems), lifecourse starts with no existing docs and builds a complete Starlight documentation site using the polyglot plugin. The lifecourse project contains Julia source code (and possibly R), and the polyglot plugin's Julia and R handlers will be used to generate API documentation.

Per REQ-MIG-004, lifecourse must be documented from scratch with Starlight + polyglot. Per REQ-MIG-005, the repo's conductor tech-stack.md must be updated. Per REQ-MIG-006, the repo gets a `starlight_migration` conductor track documenting the docs setup. This migration serves as a reference for greenfield documentation projects and demonstrates the Julia and R handler integrations.

## Acceptance Criteria

1. lifecourse repository has a new Starlight documentation site initialized from scratch
2. Hand-written documentation pages created for the project (overview, usage, examples)
3. Polyglot plugin configured with Julia handler (and optionally R handler) for lifecourse's source
4. Auto-generated API docs appear for Julia modules (and R packages if configured)
5. lifecourse's conductor/tech-stack.md created/updated to reference Starlight (REQ-MIG-005)
6. lifecourse's conductor/tracks/ includes a `migrate_starlight` track (REQ-MIG-006)
7. GitHub Actions workflow deploys Starlight docs site
8. Documentation provides getting started, API reference, and usage examples

## Technical Approach

This is a greenfield documentation project. Create a Starlight docs site in the lifecourse repository with hand-written content covering the project's purpose, installation, and usage. Configure the polyglot plugin with the Julia handler (and R handler as needed) to auto-generate API documentation from the project's source code. Since there's no existing docs to migrate, the focus is on creating comprehensive documentation from scratch that leverages Starlight's features and the polyglot plugin's auto-generation capabilities.

## Files to Create/Modify

- In lifecourse repo:
  - `docs/astro-site/` — New Starlight docs site
  - `docs/astro-site/src/content/docs/` — Hand-written documentation pages
  - `conductor/tech-stack.md` — Create/update
  - `conductor/tracks/migrate_starlight/` — Migration track
  - `.github/workflows/docs.yml` — Docs deployment workflow

## Dependencies

- self_docs_20260513 (template for docs site structure)
- handler_julia_20260513 (Julia handler for Julia source)
- handler_r_20260513 (R handler for R source, optional)
