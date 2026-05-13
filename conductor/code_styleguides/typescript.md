# TypeScript Style Guide

## Strictness

- `strict: true` in `tsconfig.json` — full strict mode enabled
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`
- Zero explicit `any` types — use `unknown` and narrow with type guards
- All files must pass `tsc --noEmit` with zero errors

## Imports & Exports

- **Named exports only** — no `export default` anywhere in the codebase
- Prefer `import type { Foo }` for type-only imports
- Organize imports: externals first, then internals with a blank line separator
- Use path aliases defined in `tsconfig.json` (e.g., `@core/`, `@handlers/`)

```typescript
// ✅ Correct
import type { StarlightPlugin } from '@astrojs/starlight';
import { Router } from '@core/router.js';

export function createPlugin(): StarlightPlugin { ... }

// ❌ Wrong
import Router from '@core/router.js';
export default function() { ... }
```

## Async Patterns

- Always use `async/await` over `.then()` / `.catch()` chains
- Handle promise rejections with try/catch blocks — never leave promises dangling
- Use `Promise.all()` for concurrent independent operations
- Prefer `AbortController` over bare timeouts for subprocess cancellation

```typescript
// ✅ Correct
export async function generate(options: HandlerOptions): Promise<MDXOutput> {
  try {
    const result = await someAsyncWork(options);
    return transform(result);
  } catch (error) {
    throw new PluginError('Generation failed', { cause: error });
  }
}

// ❌ Wrong
export function generate(options: HandlerOptions): Promise<MDXOutput> {
  return someAsyncWork(options).then(transform);
}
```

## Type Annotations

- **Explicit return types on all public functions and methods** — never rely on inference for API surfaces
- Use `interface` over `type` for object shapes that may be extended
- Use `type` for unions, intersections, and tuple types
- Prefer readonly arrays (`readonly T[]`) for parameters that should not be mutated

```typescript
// ✅ Correct
export interface Handler {
  readonly name: Language;
  generate(options: HandlerOptions): Promise<MDXOutput>;
}

export type Language = 'python' | 'typescript' | 'rust';

// ❌ Wrong
export type Handler = {
  name: Language;
  generate: (options: HandlerOptions) => Promise<MDXOutput>;
};
```

## JSDoc

- **All public API surfaces must have JSDoc comments** — exported functions, interfaces, types, and class constructors
- Use `@param` and `@returns` tags for documentation
- Use `@example` where helpful for usage patterns
- Use `@internal` for non-public items (TypeScript will enforce)

```typescript
/**
 * Generates MDX documentation pages from source code AST output.
 *
 * @param options - Configuration for the generation process
 * @param options.entryPoints - Paths to source files or modules
 * @param options.output - Directory where generated MDX files will be written
 * @returns An array of MDX pages with frontmatter and body content
 * @throws {PluginError} If source parsing or file writing fails
 *
 * @example
 * ```typescript
 * const output = await generate({ entryPoints: ['src/index.ts'], output: 'docs/api' });
 * ```
 */
export async function generate(options: GenerateOptions): Promise<MDXPage[]> { ... }
```

## Formatting & Indentation

- **2-space indent** — no tabs
- Single quotes for strings (Prettier enforced)
- Semicolons required
- Trailing commas in multiline objects and arrays
- Max line length: 100 characters (Prettier default)
- `import` statements with line breaks for >1 named import

```typescript
// ✅ Correct
import { Handler, HandlerOptions, Language } from './types.js';

const name: Language = 'python';

// ❌ Wrong
const name = "python";
```

## File Naming & Conventions

- kebab-case for file names: `mdx-generator.ts`, `router.ts`, `python-handler.ts`
- PascalCase for classes, interfaces, types, and enums
- camelCase for functions, methods, variables, and parameters
- UPPER_CASE for constants (magic strings, configuration defaults)
- Test files: `{module}.test.ts` co-located with source

## Error Handling

- Use custom error classes extending `Error` — no bare `Error` instances for domain errors
- Include `cause` property for wrapped errors
- Error messages must be actionable: tell the user what went wrong and what to do

```typescript
// ✅ Correct
export class PluginError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'PluginError';
  }
}

throw new PluginError('Handler not found for language: julia', { cause: configError });

// ❌ Wrong
throw new Error('Handler failed');
```

## Testing

- Use Vitest for all tests
- Name test blocks descriptively with `describe` / `it` nesting
- Prefer `toEqual` over `toStrictEqual` for golden fixtures
- Use `vi.fn()` and `vi.spyOn()` for mocks — no separate mock factories

```typescript
import { describe, it, expect, vi } from 'vitest';

describe('Router', () => {
  it('dispatches to correct handler by language', async () => {
    const handler = { name: 'python', generate: vi.fn() };
    const router = new Router();
    router.register('python', handler);
    await router.dispatch('python', { entryPoints: ['mymod'] });
    expect(handler.generate).toHaveBeenCalledTimes(1);
  });
});
```
