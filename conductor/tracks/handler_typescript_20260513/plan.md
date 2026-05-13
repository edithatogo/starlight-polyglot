# Plan: handler_typescript_20260513

## Phase 1: TypeDoc Application Setup
- [ ] Create `src/handlers/typescript.ts` with `TypeScriptHandler` class implementing `Handler` (references: REQ-TS-001, DGN-CONTRACT-001)
- [ ] Implement TypeDoc `Application` initialization with `TSConfigReader` (references: REQ-TS-001)
- [ ] Accept `entryPoints` as file paths and `tsconfig` as optional path (references: REQ-TS-002)
- [ ] Handle missing TypeDoc peer dependency with install suggestion error (references: REQ-HDL-003)

## Phase 2: Reflection Extraction & Transformation
- [ ] Call `Application.convert()` to produce `ProjectReflection` (references: REQ-TS-001)
- [ ] Walk `ProjectReflection` children to extract modules, classes, interfaces, functions, variables, type aliases (references: DGN-CONTRACT-001)
- [ ] Transform TypeDoc `Reflection` objects into standardized AST format (references: REQ-TS-001)
- [ ] Map TypeDoc `Comment` (summary, tags, params) into structured descriptions (references: REQ-TS-001)
- [ ] Map TypeDoc `SignatureReflection` for function/method signatures (references: DGN-MDX-001)

## Phase 3: Edge Cases & Error Handling
- [ ] Handle empty source directories with empty result (references: REQ-HDL-002)
- [ ] Handle TypeDoc conversion errors with descriptive messages (references: REQ-HDL-003)
- [ ] Handle invalid tsconfig path with actionable error (references: REQ-TS-002)
- [ ] Add `typescript` to Language type union if not already present

## Phase 4: Registration & Verification
- [ ] Export `TypeScriptHandler` from `src/handlers/index.ts` (references: DGN-REPO-001)
- [ ] Create `src/handlers/typescript.test.ts` with fixture TypeScript source files (references: REQ-QA-005, REQ-QA-006)
- [ ] Verify handler contract compliance with contract validation tests (references: REQ-HDL-001)
- [ ] Test dogfood scenario: run handler on the plugin's own TypeScript source (references: REQ-DOC-002)
