# Plan: core_mdx_generator_20260513

## Phase 1: Core Generator Class
- [ ] Create `src/core/mdx-generator.ts` with `MDXGenerator` class skeleton accepting `GeneratorOptions` (references: REQ-CORE-004, DGN-MDX-001)
- [ ] Implement `generate(ast, language)` method that walks AST depth-first and produces `MDXPage[]` (references: DGN-MDX-001)
- [ ] Implement `output` path resolution with default `src/content/docs/api/` (references: REQ-CORE-007)
- [ ] Add error handling for malformed AST input with meaningful messages (references: REQ-HDL-003)

## Phase 2: Frontmatter Builder
- [ ] Create `src/core/mdx-frontmatter.ts` with `FrontmatterBuilder` class (references: REQ-CORE-005)
- [ ] Generate `title` from symbol name, `description` from first paragraph of docstring (references: REQ-CORE-005)
- [ ] Generate `sidebar.label` and `sidebar.order` from symbol metadata (references: REQ-CORE-005)
- [ ] Add `pagefind-index` metadata for search indexing (references: REQ-CORE-005)
- [ ] Support custom frontmatter fields from handler options

## Phase 3: Content & Signature Renderer
- [ ] Create `src/core/mdx-content.ts` with `ContentBuilder` for hierarchical section rendering (references: DGN-MDX-001)
- [ ] Create `src/core/mdx-signature.ts` with `SignatureRenderer` for syntax-highlighted code signatures (references: DGN-MDX-001)
- [ ] Implement docstring-to-markdown conversion with code block, link, and list support (references: DGN-MDX-001)
- [ ] Implement nested symbol rendering (methods under classes, fields under structs) with proper heading levels (references: DGN-MDX-001)
- [ ] Add `github-slugger` integration for stable heading anchor IDs

## Phase 4: Pagination & Cross-References
- [ ] Implement pagination logic: one page per symbol vs. grouped module pages (references: REQ-CORE-004)
- [ ] Implement cross-reference resolver for type links between modules (references: DGN-MDX-001)
- [ ] Return `SidebarGroup` metadata alongside pages for Router integration (references: REQ-CORE-006)

## Phase 5: Edge Cases & Verification
- [ ] Handle empty/null docstrings with stub content (references: REQ-HDL-002)
- [ ] Handle deeply nested symbols (4+ levels) gracefully (references: REQ-CORE-004)
- [ ] Verify generated MDX is valid (parses with `@astrojs/mdx`) (references: REQ-CORE-004)
- [ ] Verify pagefind-index metadata is correctly emitted in frontmatter (references: REQ-CORE-005)
