# Product Definition

## Vision
Eliminate the polyglot documentation gap in the Starlight/Astro ecosystem by providing a single plugin that generates native MDX API documentation from any programming language's source code and docstrings.

## Mission
Make Starlight the first documentation framework that natively supports every major programming language out of the box — install one plugin, configure languages, get beautiful MDX API docs with zero additional tooling.

## Target Users
- **Polyglot Library Maintainers**: Projects with bindings in Python, TypeScript, Rust, R, Julia, C#, Go — one docs platform for all
- **Open Source Package Authors**: Want Starlight docs but blocked by lack of Python/R/Java docstring support
- **Enterprise Multi-Language Teams**: Docs consistency across services written in different languages
- **Scientific Computing Projects**: Jupyter notebooks + Python libs + R bindings + Rust core — all documented together
- **Starlight Plugin Developers**: Reference implementation for building language handlers

## Core Capabilities

### Phase 1 (this cycle)
- **Python handler**: Griffe-based docstring extraction → MDX
- **TypeScript handler**: TypeDoc integration (reuses `starlight-typedoc` internals)
- **Rust handler**: rustdoc JSON → MDX
- **R handler**: roxygen2 → MDX
- **Julia handler**: Base.Docs → MDX
- **C# handler**: DocFX/xmldoc → MDX
- **Go handler**: gomarkdoc → MDX
- **Core router**: Language-agnostic handler dispatch with caching
- **Sidebar integration**: Auto-register API pages in Starlight sidebar
- **Self-hosted docs**: Dogfood the plugin on its own TypeScript source

### Phase 2 (planned)
- Java, Kotlin, C, C++, Swift, Scala, Ruby, Dart, PHP, Elixir handlers

### Phase 3 (planned)
- Stata, SAS, MATLAB, Fortran, Zig, Haskell, Lua, Perl, Groovy, Objective-C, Erlang, Clojure, SQL, Pascal, Ada, VHDL, Verilog handlers

## Architecture
- **Plugin-first**: Standard Starlight plugin using `config:setup` hook
- **Router dispatch**: `Language enum → Handler` at build time
- **Subprocess isolation**: Each non-JS handler spawns its language's toolchain in a subprocess
- **Unified MDX output**: All handlers produce identical frontmatter schema + content structure
- **Build cache**: Skip re-generation when source files haven't changed

## Non-Functional Requirements
- >90% test coverage across all handlers
- npm bundle <50KB (core plugin)
- Subprocess timeout: 60s default, configurable
- Cache hit: <1s, cache miss: <15s per language (typical)
- Zero npm runtime dependencies (only peer deps)
- SLSA Level 3 provenance on publish
