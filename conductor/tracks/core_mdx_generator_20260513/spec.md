# Track: core_mdx_generator_20260513

## Fulfills: REQ-CORE-004, REQ-CORE-005, REQ-CORE-007

## Context / Problem Statement

The MDX Generator is the engine that transforms raw AST output from any language handler into valid Starlight-native MDX pages. Every handler (Python, TypeScript, Rust, etc.) produces structured data about symbols, classes, functions, and their docstrings. The generator must normalize these into a consistent MDX format with proper frontmatter (title, description, sidebar_label, pagefind-index metadata), render signatures and docstrings into markdown, and write the resulting `.mdx` files to the configured output directory.

Per DGN-MDX-001, the generator consists of a Frontmatter Builder, Content Builder, Signature Renderer, Docstring Renderer, and Cross-reference Resolver. It must support configurable output paths (REQ-CORE-007) and produce pages that integrate seamlessly with Starlight's sidebar and search (pagefind-index metadata per REQ-CORE-005).

## Acceptance Criteria

1. `MDXGenerator` class accepts AST structured input from any handler and produces `MDXPage[]` output
2. Generated frontmatter includes `title`, `description`, `sidebar.label`, and `pagefind-index` metadata per REQ-CORE-005
3. Content body renders symbol signatures using syntax-highlighted code blocks with the correct language tag
4. Docstrings are rendered as markdown paragraphs with support for inline code, links, and lists
5. Nested symbols (class methods, struct fields) are rendered as subheadings with ancestry in the page hierarchy
6. `output` option controls the base directory for generated `.mdx` files (default: `src/content/docs/api/`)
7. Each symbol generates one MDX page unless `pagination: false` groups them into module-level pages
8. Sidebar metadata is returned alongside pages for integration by the Router
9. Cross-module references (type links) are resolved where possible or rendered as inline code
10. Empty or null docstrings produce a brief stub page rather than skipping the symbol

## Technical Approach

Implement `MDXGenerator` as a class in `src/core/mdx-generator.ts`. It accepts a `GeneratorOptions` config and exposes a `generate(ast, language)` method. Internally, it uses sub-components: `FrontmatterBuilder` constructs YAML frontmatter from symbol metadata; `ContentBuilder` walks the AST tree depth-first, rendering each symbol with heading hierarchy; `SignatureRenderer` formats function/class signatures with TypeScript-compatible syntax highlighting tags; `DocstringRenderer` normalizes docstrings (CommonMark-compatible). The generator uses `github-slugger` for heading anchor IDs (consistent with Starlight convention).

## Files to Create/Modify

- `packages/starlight-polyglot/src/core/mdx-generator.ts` — Main MDXGenerator class
- `packages/starlight-polyglot/src/core/mdx-frontmatter.ts` — Frontmatter builder utility
- `packages/starlight-polyglot/src/core/mdx-content.ts` — Content/section renderer
- `packages/starlight-polyglot/src/core/mdx-signature.ts` — Signature formatter
- `packages/starlight-polyglot/src/core/types.ts` — Add MDXPage, Frontmatter, SidebarGroup if not yet defined (modify)

## Dependencies

- plugin_scaffold_20260513 (provides base types and directory structure)
