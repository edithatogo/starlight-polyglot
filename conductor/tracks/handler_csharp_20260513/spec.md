# Track: handler_csharp_20260513

## Fulfills: REQ-CS-001, REQ-CS-002

## Context / Problem Statement

C# (.NET) uses XML documentation comments (`/// <summary>`, `/// <param name="x">...</param>`, `/// <returns>`, etc.) embedded in source code. When a .NET project is built with the `<GenerateDocumentationFile>` flag, the compiler produces a matching XML file containing all documentation comments alongside the assembly. The C# handler must parse these XML documentation files to extract API documentation.

Per REQ-CS-001, the handler parses .NET XML documentation files. Per REQ-CS-002, it accepts a `projectPath` option pointing to the `.csproj` project file. The handler first runs `dotnet build` with the documentation flag to ensure the XML file is generated, then parses the XML output. The XML doc format uses `member` elements with `name` attributes following the `T:`, `M:`, `P:`, `F:`, `E:` prefixes for types, methods, properties, fields, and events respectively. XML doc tags include `<summary>`, `<param>`, `<returns>`, `<example>`, `<remarks>`, and `<exception>`.

## Acceptance Criteria

1. `CSharpHandler` implements the `Handler` interface from `src/core/types.ts`
2. Handler runs `dotnet build` in the project directory to generate XML documentation files
3. Handler accepts `projectPath` option pointing to a `.csproj` file or project directory
4. Handler locates and parses the generated XML doc file (typically `bin/Debug/<tfm>/<assembly>.xml`)
5. Handler extracts all member types: classes, structs, interfaces, enums, methods, properties, fields, events
6. Handler maps XML doc tags (`<summary>`, `<param>`, `<returns>`, `<example>`, `<remarks>`) to structured fields
7. Handler handles missing .NET SDK with a clear installation error
8. Handler handles projects without XML doc generation enabled by suggesting the `<GenerateDocumentationFile>` flag
9. Handler handles empty projects (no documented members) returning empty results

## Technical Approach

Create `CSharpHandler` class in `src/handlers/csharp.ts`. The `generate(options)` method first runs `dotnet build` in the project directory (with timeout), then locates the generated XML doc file by examining the project's output path. The XML is parsed using a lightweight XML parser (Node.js built-in `xml2js` or native `DOMParser` equivalent). Member name prefixes (`T:`, `M:`, `P:`, `F:`, `E:`) are decoded to determine the member type. XML doc tags are converted to markdown: `<see cref="..."/>` becomes `[Type]`, `<code>` becomes fenced code blocks, `<para>` becomes paragraph breaks.

## Files to Create/Modify

- `packages/starlight-polyglot/src/handlers/csharp.ts` — CSharpHandler class
- `packages/starlight-polyglot/src/handlers/csharp.test.ts` — Unit tests
- `packages/starlight-polyglot/src/handlers/index.ts` — Export all handlers (modify)
- `packages/starlight-polyglot/src/core/types.ts` — May need Language type update (modify)

## Dependencies

- core_mdx_generator_20260513 (provides MDXOutput types)
- core_router_plugin_20260513 (provides Handler interface, subprocess utility)
