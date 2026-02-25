# @rotsl/weave

`@rotsl/weave` is the npm package for parsing and compiling Weave scripts.

- Input: natural-language Weave text
- Output: complete HTML (embedded CSS + embedded JS)

## Install

```bash
npm install @rotsl/weave
```

## Quick Start

```ts
import { parseWeave, compileWeave } from '@rotsl/weave';

const script = `
A page called "My Site"
  With a header
    Showing "My Brand"
  With a hero
    Showing "Build faster"
    With subtitle "Write your page in plain English"
    With a primary button "Get Started"
  With a footer
    Copyright "2026 My Company"
  Using modern theme
`;

const ast = parseWeave(script);
const html = compileWeave(ast);

console.log(html);
```

## Example Case

Generate a product landing page during a build step:

```ts
import { parseWeave, compileWeave } from '@rotsl/weave';

const code = `
A page called "LaunchPad"
  With a hero
    Showing "Ship Your Product Faster"
    With subtitle "Generate clean pages from plain English"
    With a primary button "Get Started"
  Using corporate theme
`;

const html = compileWeave(parseWeave(code), { minify: true });
// write html to disk or publish artifact
```

## API

### `parseWeave(code: string): WeaveAST`

Parses Weave text into an AST structure.

### `compileWeave(ast: WeaveAST, options?: { minify?: boolean }): string`

Compiles an AST into a full HTML document.

### `themes`

Built-in theme definitions object.

### `generateThemeCSS(themeName: string, darkMode: boolean): string`

Generates CSS variables/styles for a specific theme.

## Common Usage Patterns

- Parse only (for validation/editor tooling).
- Parse + compile (for final export).
- Compile with minification:

```ts
const html = compileWeave(ast, { minify: true });
```

## Built-in Themes

- `modern`
- `minimal`
- `corporate`
- `playful`
- `elegant`
- `dark`

## Package Development

From repository root:

```bash
cd packages/weave
bun install
bun run build
```

## Package Folder Structure

```text
packages/weave/
├── src/
│   ├── index.ts                        # public exports
│   ├── parser.ts                       # text -> AST parser
│   ├── compiler.ts                     # AST -> HTML compiler
│   ├── types.ts                        # Weave AST/types definitions
│   └── themes/
│       └── index.ts                    # built-in themes + theme CSS helpers
├── dist/                               # generated package output
├── LICENSE                             # package license
├── package.json                        # npm metadata (@rotsl/weave)
├── tsconfig.json                       # package TS config
└── README.md                           # package documentation
```

## Notes

- The package emits self-contained HTML suitable for static hosting.
- The repository’s GitHub publish workflow runs from this folder (`packages/weave`).

## License

Apache-2.0 © 2026 Rohan R
