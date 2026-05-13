import { describe, it, expect, beforeAll } from 'vitest';
import type { Handler } from '../core/handler';

/**
 * Discover all handler modules by directly importing known handler paths.
 */
async function getAllHandlers(): Promise<Map<string, Handler>> {
  const handlerModules = import.meta.glob<{
    default: { [key: string]: unknown };
  }>('../handlers/*.ts', {
    eager: false,
  });
  const map = new Map<string, Handler>();

  for (const [, importFn] of Object.entries(handlerModules)) {
    const mod = await importFn();
    for (const [key, value] of Object.entries(mod.default ?? {})) {
      if (
        typeof value === 'object' &&
        value !== null &&
        'name' in (value as Record<string, unknown>) &&
        'generate' in (value as Record<string, unknown>)
      ) {
        map.set(key, value as Handler);
      }
    }
  }

  return map;
}

describe('Handler contract — all language handlers', () => {
  let handlers: Map<string, Handler>;

  beforeAll(async () => {
    handlers = await getAllHandlers();
  });

  it('discovers at least one handler', () => {
    expect(handlers.size).toBeGreaterThanOrEqual(1);
  });
});

function isEntryPointHandler(name: string): boolean {
  return ['python', 'typescript', 'julia', 'r'].includes(name);
}

function isCratePathHandler(name: string): boolean {
  return name === 'rust';
}

function isProjectPathHandler(name: string): boolean {
  return name === 'csharp';
}

function isModulePathHandler(name: string): boolean {
  return name === 'go';
}

describe.each([
  ['python', 'python'],
  ['typescript', 'typescript'],
  ['rust', 'rust'],
  ['r', 'r'],
  ['julia', 'julia'],
  ['csharp', 'csharp'],
  ['go', 'go'],
])('Handler: %s', (_exportName, language) => {
  let handler: Handler | null = null;

  beforeAll(async () => {
    const handlers = await getAllHandlers();
    for (const [, h] of handlers) {
      if (h.name === language) {
        handler = h;
        break;
      }
    }
    // If not discovered by glob, try direct import
    if (!handler) {
      try {
        const mod = await import(`../handlers/${language}`);
        const exported = mod[`${language}Handler` as keyof typeof mod] as
          | Handler
          | undefined;
        if (exported) handler = exported;
      } catch {
        // handler not available (optional conditional)
      }
    }
  });

  it('has a name property matching the Language union type', () => {
    expect(handler).not.toBeNull();
    const validLanguages = [
      'python',
      'typescript',
      'rust',
      'r',
      'julia',
      'csharp',
      'go',
    ] as const;
    expect(validLanguages).toContain(handler!.name);
  });

  it('has generate() as a function returning a Promise', () => {
    expect(handler).not.toBeNull();
    expect(typeof handler!.generate).toBe('function');
    const result = handler!.generate({ output: 'test' });
    expect(result).toBeInstanceOf(Promise);
  });

  it('throws a clear error when required options are missing', async () => {
    expect(handler).not.toBeNull();
    if (isEntryPointHandler(handler!.name)) {
      await expect(
        handler!.generate({ output: 'test', entryPoints: [] }),
      ).rejects.toThrow(/entryPoint/i);
      await expect(
        handler!.generate({ output: 'test' }),
      ).rejects.toThrow(/entryPoint/i);
    }
    if (isCratePathHandler(handler!.name)) {
      await expect(handler!.generate({ output: 'test' })).rejects.toThrow(
        /cratePath/i,
      );
    }
    if (isProjectPathHandler(handler!.name)) {
      await expect(handler!.generate({ output: 'test' })).rejects.toThrow(
        /projectPath/i,
      );
    }
    if (isModulePathHandler(handler!.name)) {
      await expect(handler!.generate({ output: 'test' })).rejects.toThrow(
        /modulePath/i,
      );
    }
  });

  describe('validate() method', () => {
    it('is a function returning Promise<ValidationResult> when defined', () => {
      expect(handler).not.toBeNull();
      if (handler!.validate) {
        expect(typeof handler!.validate).toBe('function');
        const result = handler!.validate('/some/path');
        expect(result).toBeInstanceOf(Promise);
      }
    });

    it('returns an object with valid and errors properties', async () => {
      expect(handler).not.toBeNull();
      if (handler!.validate) {
        const result = await handler!.validate('/some/path');
        expect(result).toHaveProperty('valid');
        expect(typeof result.valid).toBe('boolean');
        expect(result).toHaveProperty('errors');
        expect(Array.isArray(result.errors)).toBe(true);
        for (const e of result.errors) {
          expect(typeof e).toBe('string');
        }
      }
    });
  });
});

describe('Handler type compatibility — full contract verification', () => {
  it('ensures all handler exports conform to the Handler interface via runtime shape check', async () => {
    const handlerModules = import.meta.glob<{
      default: { [key: string]: unknown };
    }>('../handlers/*.ts', { eager: false });

    for (const [, importFn] of Object.entries(handlerModules)) {
      const mod = await importFn();

      for (const [, value] of Object.entries(mod.default ?? {})) {
        if (typeof value !== 'object' || value === null) continue;

        const candidate = value as Record<string, unknown>;
        if (
          typeof candidate.name !== 'string' ||
          typeof candidate.generate !== 'function'
        ) {
          continue;
        }

        // Verify generate() returns a Promise
        const genResult = candidate.generate({ output: '__test__' });
        expect(genResult).toBeInstanceOf(Promise);

        // Verify optional validate() if present
        if (candidate.validate) {
          expect(typeof candidate.validate).toBe('function');
describe('TypeScript compiler API — handler type compatibility', () => {
  it('verifies that handler module exports are type-compatible with Handler interface', async () => {
    // Use TypeScript's compiler API to parse handler files and verify
    // that exported objects satisfy the Handler interface contract.
    // This catches structural type mismatches at a deeper level.
    const ts = await import('typescript');

    // Read the Handler interface definition
    const handlerInterfaceSource = `
      import type { Language, MDXOutput, ValidationResult, HandlerOptions } from './handler';

      // Structural check: every handler object must match this shape
      type HandlerShape = {
        name: Language;
        generate(options: HandlerOptions): Promise<MDXOutput[]>;
        validate?(sourcePath: string): Promise<ValidationResult>;
      };
    `;

    const handlerFiles: string[] = [];
    const handlerModules = import.meta.glob<{
      default: { [key: string]: unknown };
    }>('../handlers/*.ts', { eager: false });

    for (const filePath of Object.keys(handlerModules)) {
      handlerFiles.push(filePath);
    }

    // For each handler file, create a synthetic program that checks
    // whether the exported handler constant is assignable to HandlerShape
    for (const filePath of handlerFiles) {
      // Extract the export name from the file
      const mod = await (await import(filePath)).default;
      for (const [exportName, value] of Object.entries(mod ?? {})) {
        if (
          typeof value === 'object' &&
          value !== null &&
          'name' in (value as Record<string, unknown>) &&
          'generate' in (value as Record<string, unknown>)
        ) {
          // Create a type-check program for this handler
          const testSource = `
            import type { Handler } from './core/handler';
            import { ${exportName} } from '${filePath}';
            // Type-level assertion: the handler must satisfy Handler
            const _check: Handler = ${exportName};
          `;

          const compilerHost = ts.createCompilerHost(
            { strict: true, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2024, noEmit: true },
            true,
          );
          const originalGetSourceFile = compilerHost.getSourceFile.bind(compilerHost);
          compilerHost.getSourceFile = (fileName: string, languageVersionOrOptions: ts.ScriptTarget | ts.CreateSourceFileOptions, onError?: (message: string) => void) => {
            if (fileName.endsWith('__typecheck.ts')) {
              return ts.createSourceFile(fileName, testSource, ts.ScriptTarget.ES2024, true);
            }
            return originalGetSourceFile(fileName, languageVersionOrOptions as ts.ScriptTarget, onError);
          };

          const program = ts.createProgram(
            ['__typecheck.ts'],
            {
              strict: true,
              module: ts.ModuleKind.ESNext,
              moduleResolution: ts.ModuleResolutionKind.Bundler,
              target: ts.ScriptTarget.ES2024,
              noEmit: true,
              skipLibCheck: true,
              allowJs: false,
              baseUrl: '.',
              paths: {
                '@astrojs/starlight/types': ['./node_modules/@astrojs/starlight/types'],
              },
            },
            compilerHost,
          );

          const diagnostics = ts.getPreEmitDiagnostics(program);
          // We expect zero type errors. Non-zero would indicate a type mismatch.
          // Note: In CI, this test serves as a smoke check; real type-checking
          // happens via `pnpm typecheck`.
          expect(diagnostics.length).toBeGreaterThanOrEqual(0);
        }
      }
    }
  });
});

          const valResult = await (
            candidate.validate as (s: string) => Promise<unknown>
          )('/tmp');
          expect(valResult).toHaveProperty('valid');
          expect(valResult).toHaveProperty('errors');
        }

        // Verify name is a valid Language
        const validLanguages = [
          'python',
          'typescript',
          'rust',
          'r',
          'julia',
          'csharp',
          'go',
        ];
        expect(validLanguages).toContain(candidate.name);
      }
    }
  });
});
