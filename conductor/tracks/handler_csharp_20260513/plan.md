# Plan: handler_csharp_20260513

## Phase 1: Build & XML Discovery
- [ ] Create `src/handlers/csharp.ts` with `CSharpHandler` class implementing `Handler` (references: REQ-CS-001, DGN-CONTRACT-001)
- [ ] Implement `dotnet build` invocation in project directory to generate XML docs (references: REQ-CS-001)
- [ ] Accept `projectPath` option pointing to `.csproj` or project directory (references: REQ-CS-002)
- [ ] Locate generated XML doc file in build output directory (references: REQ-CS-001)
- [ ] Integrate with `runSubprocess` for timeout support (references: REQ-CORE-011)

## Phase 2: XML Parsing & Member Extraction
- [ ] Parse XML doc file into document tree using fast XML parser (references: REQ-CS-001)
- [ ] Extract `member` elements and decode name prefixes: T→type, M→method, P→property, F→field, E→event (references: REQ-CS-001)
- [ ] Transform classes, structs, interfaces, enums, methods, properties into standardized AST (references: DGN-CONTRACT-001)
- [ ] Map `<summary>`, `<param>`, `<returns>`, `<example>`, `<remarks>` to structured fields (references: REQ-CS-001)
- [ ] Convert XML doc tags (`<see>`, `<c>`, `<code>`, `<para>`) to markdown equivalents (references: REQ-CS-001)

## Phase 3: Edge Cases & Error Handling
- [ ] Handle projects without `<GenerateDocumentationFile>` with helpful message (references: REQ-HDL-003)
- [ ] Handle missing .NET SDK with installation instructions (references: REQ-HDL-003)
- [ ] Handle empty XML with no members returning empty result (references: REQ-HDL-002)
- [ ] Handle malformed XML with descriptive parse error (references: REQ-HDL-003)
- [ ] Add `csharp` to Language type union if not already present

## Phase 4: Registration & Verification
- [ ] Export `CSharpHandler` from `src/handlers/index.ts` (references: DGN-REPO-001)
- [ ] Create `src/handlers/csharp.test.ts` with fixture XML documentation file (references: REQ-QA-005, REQ-QA-006)
- [ ] Verify handler contract compliance (references: REQ-HDL-001)
- [ ] Test with a real .NET project XML doc output end-to-end
