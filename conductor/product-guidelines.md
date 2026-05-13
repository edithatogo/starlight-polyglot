# Product Guidelines

## Brand
- **Name**: `starlight-polyglot`
- **Tagline**: One plugin. Every language. Beautiful docs.
- **npm**: `npm install starlight-polyglot`
- **Repository**: github.com/edithatogo/starlight-polyglot
- **License**: MIT

## Documentation Style
- Clear getting-started: 3 steps or fewer to see API docs
- Every config option documented with example
- Every handler documented with language-specific example
- Dogfood first: self-docs use the plugin they document

## UX Principles
1. **Zero config for common cases**: `polyglot({ python: { entryPoints: ['src'] } })`
2. **Fail fast with clear messages**: If a toolchain isn't installed, tell the user exactly what to install
3. **Language parity**: All handlers produce the same quality of output — no "Python docs are great but Rust docs are basic"
4. **Progress reporting**: Show which languages are being processed
5. **No silent failures**: Every subprocess error is surfaced

## Code Standards
- TypeScript strict mode enabled
- ESLint strict + Prettier formatting
- JSDoc on all public APIs
- No `any` types (use `unknown` with proper narrowing)
- Handler interface is law — all handlers must pass contract validation
- Extraction scripts (Python, R, Julia) follow the same JSON schema pattern
