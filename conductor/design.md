# Design Architecture

## System Overview (DGN-ARCH-001)

```mermaid
flowchart TB
    subgraph User["User Project"]
        A[astro.config.mjs] -->|polyglot({...})| B[Starlight Plugin]
        B --> C[Router Dispatch]
    end

    subgraph Core["starlight-polyglot Core"]
        C -->|python| D1[Python Handler]
        C -->|typescript| D2[TypeScript Handler]
        C -->|rust| D3[Rust Handler]
        C -->|r| D4[R Handler]
        C -->|julia| D5[Julia Handler]
        C -->|csharp| D6[C# Handler]
        C -->|go| D7[Go Handler]
        D1 -->|spawn griffe| E1[Python MDX]
        D2 -->|import TypeDoc| E2[TypeScript MDX]
        D3 -->|spawn rustdoc| E3[Rust MDX]
        D4 -->|spawn Rscript| E4[R MDX]
        D5 -->|spawn julia| E5[Julia MDX]
        D6 -->|spawn dotnet| E6[C# MDX]
        D7 -->|spawn gomarkdoc| E7[Go MDX]
        E1 & E2 & E3 & E4 & E5 & E6 & E7 --> F[MDX Generator]
        F -->|write files| G[src/content/docs/api/]
    end

    G --> H[Starlight Build]
    H --> I[Static HTML Site]
```

## Handler Lifecycle (DGN-HDL-001)

```mermaid
sequenceDiagram
    participant S as Starlight build
    participant P as starlight-polyglot
    participant H as Handler
    participant T as Language Toolchain

## Plugin Architecture (DGN-PLUGIN-001)

```mermaid
classDiagram
    class StarlightPolyglotPlugin {
        +name: string
        +hooks: object
        +config:setup(event) void
    }
    class PluginConfiguration {
        +handlers: Record~Language, HandlerOptions~
        +cache: boolean
        +watch: boolean
        +timeout: number
    }
    class Router {
        -handlers: Map~Language, Handler~
        +register(language, handler) void
        +dispatch(language, options) Promise~MDXOutput[]~
        +enabled(): Language[]
    }
    class Handler {
        <<interface>>
        +name: Language
        +generate(options) Promise~MDXOutput[]~
        +validate?(source) Promise~ValidationResult~
    }
    class MDXOutput {
        +content: string
        +frontmatter: Frontmatter
        +outputPath: string
    }
    class CacheLayer {
        +get(key): MDXOutput[] | null
        +set(key, value): void
        +invalidate(key): void
    }
    class SidebarIntegration {
        +insertInto(config, pages): SidebarConfig
    }

    StarlightPolyglotPlugin --> PluginConfiguration
    StarlightPolyglotPlugin --> Router
    StarlightPolyglotPlugin --> CacheLayer
    StarlightPolyglotPlugin --> SidebarIntegration
    Router --> Handler
    Handler --> MDXOutput
```

## CI/CD Pipeline (DGN-CICD-001)

```mermaid
flowchart LR
    A[Push / PR] --> B[ci.yml]
    B --> C[Install pnpm]
    C --> D[Lint + Format]
    D --> E[Type-check]
    E --> F[Unit tests + coverage]
    F --> G[Build package]
    G --> H{On main?}
    H -->|No| I[Done]
    H -->|Yes| J[docs.yml]
    J --> K[Build Starlight]
    K --> L[Deploy to Pages]
    H -->|Yes| M[release.yml]
    M --> N[changesets]
    N --> O[Publish to npm]
    N --> P[GitHub Release]
```

## Language Handler Template (DGN-HANDLER-001)

```mermaid
flowchart TB
    subgraph Handler["Any Language Handler (~20 lines)"]
        A[Receive HandlerOptions] --> B[Build command + args]
        B --> C[Spawn subprocess]
        C --> D[Parse JSON stdout]
        D --> E[Transform to MDXOutput[]]
        E --> F[Return to core]
    end
```

## Design Cross-Reference

| Design Node | Description | Linked Requirements |
|-------------|-------------|-------------------|
| DGN-ARCH-001 | System overview | REQ-CORE-001, REQ-CORE-002, REQ-CORE-003 |
| DGN-HDL-001 | Handler lifecycle | REQ-CORE-004, REQ-CORE-009, REQ-CORE-010, REQ-CORE-011 |
| DGN-PLUGIN-001 | Plugin class architecture | REQ-CORE-006, REQ-MIG-001 |
| DGN-CICD-001 | CI/CD pipeline | REQ-CI-001 through REQ-CI-006 |
| DGN-HANDLER-001 | Language handler template | REQ-HDL-001, REQ-HDL-002, REQ-HDL-003 |

    S->>P: config:setup hook
    P->>P: Check cache
    alt Cache hit
        P->>S: Skip generation
    else Cache miss
        P->>H: dispatch(language, options)
        H->>T: spawn(tool)
        T-->>H: JSON output
        H->>H: transform to MDX
        H-->>P: MDXOutput[]
        P->>P: write files to content dir
        P->>P: update sidebar config
        P->>S: updated Starlight config
    end
    S->>S: build content + Starlight pages
    S->>S: deploy static HTML
```
# Design Architecture

## 1. Plugin Architecture Overview (DGN-CORE-001)

```mermaid
graph TB
    subgraph User["User Project (Starlight)"]
        AC[astro.config.mjs] --> PL[starlight-polyglot plugin]
        PL -->|"config:setup hook"| ROUTER
    end

    subgraph Plugin["starlight-polyglot (npm package)"]
        ROUTER[Router] -->|"dispatch by language"| CACHE{Cache Check}
        CACHE -->|"miss"| MDXGEN
        CACHE -->|"hit"| SIDEBAR
        
        subgraph Handlers["Handler Layer"]
            PY[Python Handler]
            TS[TypeScript Handler]
            RS[Rust Handler]
            R[R Handler]
            JL[Julia Handler]
            CS[C# Handler]
            GO[Go Handler]
        end
        
        ROUTER --> PY
        ROUTER --> TS
        ROUTER --> RS
        ROUTER --> R
        ROUTER --> JL
        ROUTER --> CS
        ROUTER --> GO
        
        PY --> MDXGEN[MDX Generator]
        TS --> MDXGEN
        RS --> MDXGEN
        R --> MDXGEN
        JL --> MDXGEN
        CS --> MDXGEN
        GO --> MDXGEN
        
        MDXGEN --> SIDEBAR[Sidebar Integrator]
    end

    subgraph Output["Generated Output"]
        SIDEBAR --> FILES[".mdx files in src/content/docs/api/"]
        SIDEBAR --> NAV[Starlight sidebar config updated]
    end
```

## 2. Handler Dispatch Flow (DGN-CORE-002)

```mermaid
sequenceDiagram
    participant A as astro build
    participant PL as Plugin
    participant RT as Router
    participant H as Handler
    participant SP as Subprocess
    participant MDX as MDX Generator
    participant FS as Filesystem

    A->>PL: config:setup hook
    PL->>PL: Check command !== 'preview'
    PL->>RT: dispatch(handlers)
    
    par Python handler
        RT->>H: python.generate(options)
        H->>SP: spawn("python -m griffe dump pkg --format json")
        SP-->>H: JSON AST
    and TypeScript handler
        RT->>H: typescript.generate(options)
        H->>H: typedoc.application.convert()
        H-->>RT: Reflection[]
    and Rust handler
        RT->>H: rust.generate(options)
        H->>SP: spawn("cargo +nightly rustdoc --output-format json")
        SP-->>H: JSON AST
    and R handler
        RT->>H: r.generate(options)
        H->>SP: spawn("Rscript extract.R")
        SP-->>H: JSON AST
    and Julia handler
        RT->>H: julia.generate(options)
        H->>SP: spawn("julia extract.jl")
        SP-->>H: JSON AST
    and C# handler
        RT->>H: csharp.generate(options)
        H->>SP: spawn("dotnet build")
        SP-->>H: XML doc
    and Go handler
        RT->>H: go.generate(options)
        H->>SP: spawn("gomarkdoc --output json")
        SP-->>H: JSON AST
    end

    H->>MDX: transform(ast) → Page[]
    MDX->>FS: write(page.mdx) to src/content/docs/api/{lang}/
    
    RT->>PL: updateConfig({ sidebar })
    PL-->>A: config updated
```

## 3. MDX Generator Internal (DGN-MDX-001)

```mermaid
graph LR
    subgraph Input["AST from Handler"]
        M1[Module]
        C1[Class]
        F1[Function]
        V1[Variable]
    end

    subgraph Transform["MDX Generator"]
        FM[Frontmatter Builder]
        CONT[Content Builder]
        SIG[Signature Renderer]
        DSTR[Docstring Renderer]
        XREF[Cross-reference Resolver]
    end

    subgraph Output["Generated MDX File"]
        FM --> FRONT["---
title: MyClass
description: Class description
sidebar:
  label: MyClass
---"]
        CONT --> BODY["## MyClass
Method description..."]

    end

    M1 --> FM
    C1 --> FM
    F1 --> FM
    C1 --> CONT
    F1 --> CONT
```

## 4. Package Structure (DGN-REPO-001)

```mermaid
graph TB
    ROOT[starlight-polyglot/]
    ROOT --> CON[conductor/]
    ROOT --> PKG[packages/]
    ROOT --> DOC[docs/astro-site/]
    ROOT --> GH[.github/workflows/]
    
    PKG --> SRC[starlight-polyglot/]
    SRC --> INDEX[index.ts]
    SRC --> CORE[core/]
    SRC --> HANDLERS[handlers/]
    SRC --> SCRIPTS[scripts/]
    
    CORE --> CT1[plugin.ts]
    CORE --> CT2[router.ts]
    CORE --> CT3[mdx-generator.ts]
    
    HANDLERS --> H1[python.ts]
    HANDLERS --> H2[typescript.ts]
    HANDLERS --> H3[rust.ts]
    HANDLERS --> H4[r.ts]
    HANDLERS --> H5[julia.ts]
    HANDLERS --> H6[csharp.ts]
    HANDLERS --> H7[go.ts]
```

## 5. CI/CD Pipeline (DGN-CI-001)

```mermaid
graph TB
    subgraph PR["Pull Request"]
        PR1[Push to branch]
    end

    subgraph CI["ci.yml"]
        LINT[Lint + Format Check]
        TYPE[TypeScript Strict Check]
        UNIT[Vitest Unit Tests >90%]
        SIZE[size-limit Bundle]
        BUILD[Build Package]
    end

    subgraph CD["release.yml"]
        CHG[Changeset Detect]
        VER[Version Bump]
        PUB[npm publish + provenance]
        REL[GitHub Release]
    end

    subgraph DOCS["docs.yml"]
        DOCB[Build Starlight]
        DOCD[Deploy to GH Pages]
        LV[starlight-links-validator]
    end

    PR1 --> CI
    LINT --> TYPE --> UNIT --> SIZE --> BUILD
    BUILD -->|"on main + version label"| CD
    CHG --> VER --> PUB --> REL
    BUILD -->|"on main"| DOCS
    DOCB --> LV --> DOCD
```

## 6. Handler Interface Contract (DGN-CONTRACT-001)

```mermaid
classDiagram
    class Handler {
        <<interface>>
        +name: Language
        +generate(options: HandlerOptions) => Promise~MDXOutput~
        +validate?(sourcePath: string) => Promise~ValidationResult~
    }

    class HandlerOptions {
        +entryPoints: string[]
        +output: string
        +pagination?: boolean
        +watch?: boolean
    }

    class MDXOutput {
        +pages: MDXPage[]
        +sidebar: SidebarGroup
    }

    class MDXPage {
        +path: string
        +frontmatter: Record~string, unknown~
        +body: string
    }

    Handler --> HandlerOptions
    Handler --> MDXOutput
    MDXOutput --> MDXPage
```

## 7. Future Central Landing Page (DGN-LATER-001)

```mermaid
graph TB
    subgraph Future["Future: Central Landing Page"]
        LANDING[edithatogo.github.io/]
        LANDING --> POLY[starlight-polyglot docs]
        LANDING --> INN[innovate docs]
        LANDING --> VOI[voiage docs]
        LANDING --> MAR[mars docs]
        LANDING --> LIFE[lifecourse docs]
    end
```

## Cross-Reference Index

| Diagram Node | Description | Related REQ ID | Related TRK |
|-------------|-------------|---------------|-------------|
| DGN-CORE-001 | Plugin Architecture | REQ-CORE-001..006 | TRK-core_router_plugin |
| DGN-CORE-002 | Handler Dispatch Flow | REQ-CORE-003 | TRK-core_router_plugin, TRK-handler_* |
| DGN-MDX-001 | MDX Generator Internal | REQ-CORE-004,005 | TRK-core_mdx_generator |
| DGN-REPO-001 | Package Structure | REQ-CORE-001 | TRK-plugin_scaffold |
| DGN-CI-001 | CI/CD Pipeline | REQ-CI-001..007 | TRK-ci_cd |
| DGN-CONTRACT-001 | Handler Interface | REQ-HDL-001,002,003 | TRK-tests |
| DGN-LATER-001 | Central Landing Page | — | Future |
```