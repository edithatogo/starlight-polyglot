# starlight-polyglot

[![npm version](https://img.shields.io/npm/v/starlight-polyglot.svg?style=flat-square&logo=npm&color=CB3837)](https://www.npmjs.com/package/starlight-polyglot)
[![CI](https://img.shields.io/github/actions/workflow/status/edithatogo/starlight-polyglot/ci.yml?style=flat-square&logo=github&label=CI)](https://github.com/edithatogo/starlight-polyglot/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/edithatogo/starlight-polyglot?style=flat-square&color=blue)](LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/starlight-polyglot?style=flat-square&label=bundle)](https://bundlephobia.com/package/starlight-polyglot)

**Starlight plugin to generate documentation from any programming language using its native toolchain.**

Write source code in Python, TypeScript, Rust, R, Julia, C#, Go — or add your own language — and starlight-polyglot automatically generates Starlight-native MDX documentation pages, sidebars, and search indexes.

---

## Quick Start

```bash
# Install the plugin
npm install starlight-polyglot

# In your Astro config (astro.config.mjs):
import starlight from '@astrojs/starlight';
import polyglot from 'starlight-polyglot';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [
    starlight({
      title: 'My API Docs',
      plugins: [
        polyglot({
          python: {
            entryPoints: ['src/mylib'],
          },
          typescript: {
            entryPoints: ['src/index.ts'],
            tsconfig: 'tsconfig.json',
          },
        }),
      ],
    }),
  ],
});
```

That's it. Run `astro dev` or `astro build` and the plugin will generate documentation pages under `src/content/docs/api/python/` and `src/content/docs/api/typescript/`, automatically injected into your Starlight sidebar.


## Supported Languages

| Language     | Handler Status | Requires                             | Notes                                           |
|--------------|----------------|--------------------------------------|-------------------------------------------------|
| Python       | ✅ Phase 1     | Python 3.11+                         | Uses docstring extraction + AST introspection    |
| TypeScript   | ✅ Phase 1     | TypeDoc ^0.28, typedoc-plugin-markdown | Generates from TypeDoc JSON output               |
| Rust         | 🚧 In Progress | rustdoc, cargo                       | Planned: rustdoc JSON output                     |
| R            | 🚧 Planned     | roxygen2, pkgdown                    | Converts Rd files to MDX                         |
| Julia        | 🚧 Planned     | Documenter.jl                        | Generates from Documenter JSON                   |
| C#           | 🚧 Planned     | DocFX / VS docgen                    | Supports XML doc comments                        |
| Go           | 🚧 Planned     | godoc                                | Extracts from godoc output                       |

> **Phase 1** handlers are implemented and tested.  
> **In Progress** handlers are under active development.  
> **Planned** handlers are on the roadmap — contributions welcome!

## Plugin Architecture

starlight-polyglot uses a **handler-based plugin architecture**. Each programming language has a dedicated handler that:

1. **Extracts** documentation from source code using the language's native toolchain
2. **Transforms** the extracted data into a shared AST representation
3. **Generates** Starlight-compatible MDX pages with proper frontmatter and sidebar entries

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐     ┌─────────────┐
│   Python     │────▶│  python.ts   │────▶│              │     │             │
│   Sources    │     │   Handler    │     │              │     │  Starlight  │
├─────────────┤     ├──────────────┤     │   Shared     │     │   MDX +     │
│ TypeScript   │────▶│ typescript.ts│────▶│   MDX Gen   │────▶│  Sidebar    │
│   Sources    │     │   Handler    │     │              │     │             │
├─────────────┤     ├──────────────┤     │  Pipeline    │     │   Pages     │
│   Rust       │────▶│   rust.ts    │────▶│              │     │             │
│   Sources    │     │   Handler    │     │              │     │             │
└─────────────┘     └──────────────┘     └──────────────┘     └─────────────┘
```

### Core Components

- **Handler Interface** (`core/handler.ts`): Contract every language handler must implement
- **Plugin Setup** (`index.ts`): Astro-Starlight plugin entry point with `config:setup` hook
- **Router** (`core/router.ts`): Resolves user configuration to handler instances
- **MDX Generator** (`core/mdx-generator.ts`): Shared pipeline transforming AST data to MDX pages

### Configuration Reference

```typescript
interface PolyglotConfig {
  python?: {
    entryPoints: string[];     // Python module paths or files
    output?: string;           // Output subdirectory (default: "api/python")
    pagination?: boolean;      // Include prev/next pagination
  };
  typescript?: {
    entryPoints: string[];     // TypeScript entry files
    tsconfig?: string;         // Path to tsconfig.json
    output?: string;           // Output subdirectory (default: "api/typescript")
  };
  rust?: {
    cratePath?: string;        // Path to Cargo.toml or crate directory
    output?: string;           // Output subdirectory (default: "api/rust")
  };
  r?: {
    modulePath?: string;       // Path to R package
    output?: string;           // Output subdirectory (default: "api/r")
  };
  julia?: {
    projectPath?: string;      // Path to Julia project
    output?: string;           // Output subdirectory (default: "api/julia")
  };
  csharp?: {
    projectPath?: string;      // Path to .csproj or solution file
    output?: string;           // Output subdirectory (default: "api/csharp")
  };
  go?: {
    entryPoints?: string[];    // Go package paths
    output?: string;           // Output subdirectory (default: "api/go")
  };
}
```

### Advanced Usage: Multi-Plugin Setup

```typescript
import starlight from '@astrojs/starlight';
import { createPolyglotPlugin } from 'starlight-polyglot';
import { defineConfig } from 'astro/config';

const [polyglot, sidebarGroup] = createPolyglotPlugin();

export default defineConfig({
  integrations: [
    starlight({
      plugins: [
        polyglot({
          python: { entryPoints: ['src/backend'] },
          typescript: { entryPoints: ['src/frontend'] },
        }),
      ],
      sidebar: [
        { label: 'Docs', items: ['/docs'] },
        sidebarGroup,  // ← polyglot will replace this with generated sidebar items
      ],
    }),
  ],
## Documentation

Full documentation is available at **https://starlight-polyglot.vercel.app/** (dogfood site — built with Starlight and starlight-polyglot itself).

- [Getting Started Guide](https://starlight-polyglot.vercel.app/getting-started)
- [Language Handlers](https://starlight-polyglot.vercel.app/handlers)
- [Configuration Reference](https://starlight-polyglot.vercel.app/configuration)
- [Plugin API](https://starlight-polyglot.vercel.app/api)
- [Contributing Guide](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

## 🐕 Dogfood

This project's own documentation site (at `docs/astro-site/`) is built with **Starlight** and uses **starlight-polyglot** to generate its API reference pages. We eat our own dog food — every release validates that the plugin works end-to-end with a real Starlight project.

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for:

- How to add a new language handler
- Development setup instructions
- Handler contract documentation
- Testing requirements
- Pull request process

## Security

See [SECURITY.md](SECURITY.md) for our security policy and vulnerability reporting process.

## License

MIT © 2026 Dylan A Mordaunt. See [LICENSE](LICENSE) for details.

## Support

- [GitHub Issues](https://github.com/edithatogo/starlight-polyglot/issues) — bug reports and feature requests
- [GitHub Discussions](https://github.com/edithatogo/starlight-polyglot/discussions) — questions and ideas
- [SUPPORT.md](SUPPORT.md) — more support resources

});
```
