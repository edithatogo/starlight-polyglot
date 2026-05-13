# Track: migrate_innovate_20260513

## Fulfills: REQ-MIG-001, REQ-MIG-005, REQ-MIG-006

## Context / Problem Statement

The innovate project currently uses Sphinx for documentation. As part of the starlight-polyglot rollout, innovate's documentation must be migrated from Sphinx to Starlight + the polyglot plugin. This migration demonstrates the polyglot plugin's value on a real project and serves as a reference implementation for other Sphinx-to-Starlight migrations. The migrate project contains Python source code that the polyglot plugin's Python handler will document.

Per REQ-MIG-001, innovate must be migrated from Sphinx to Starlight + polyglot. Per REQ-MIG-005, the migrated repo's conductor tech-stack.md must be updated. Per REQ-MIG-006, the migrated repo gets a `starlight_migration` conductor track documenting its migration. The migration involves setting up a Starlight docs site, converting existing Sphinx RST content to MDX, configuring the polyglot plugin for Python documentation, and establishing CI/CD for the new docs site.

## Acceptance Criteria

1. innovate repository has a new Starlight documentation site initialized
2. Existing Sphinx RST documentation content is converted to Starlight-compatible MDX/Markdown
3. Polyglot plugin configured with Python handler pointing at innovate's Python source
4. Auto-generated API docs appear alongside hand-written migration documentation
5. innovate's conductor/tech-stack.md updated to reference Starlight (REQ-MIG-005)
6. innovate's conductor/tracks/ includes a `migrate_starlight` track (REQ-MIG-006)
7. Old Sphinx build configuration is removed or deprecated with redirects
8. GitHub Actions workflow deploys Starlight docs site
9. `starlight-links-validator` passes on the migrated site

## Technical Approach

Clone the innovate repository, create a Starlight docs project, migrate RST content to MDX manually (or via rst-to-mdx conversion tools), configure the polyglot plugin with the Python handler for Python source code in the repo. Add a conductor directory with migration documentation. Set up CI/CD for docs deployment. Preserve old Sphinx docs with a deprecation notice during a transition period.

## Files to Create/Modify

- In innovate repo:
  - `docs/astro-site/package.json` — Starlight site
  - `docs/astro-site/astro.config.mjs` — Astro config with polyglot plugin
  - `docs/astro-site/src/content/docs/` — Migrated documentation content
  - `conductor/tech-stack.md` — Update to reference Starlight
  - `conductor/tracks/migrate_starlight/` — Migration track
  - `.github/workflows/docs.yml` — Docs deployment workflow

## Dependencies

- self_docs_20260513 (template for docs site structure and dogfooding pattern)
