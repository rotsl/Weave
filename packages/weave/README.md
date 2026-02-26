# @rotsl/weave

`@rotsl/weave` is the standalone parser/compiler package for Weave scripts.

- Input: plain-English Weave script
- Output: complete HTML document (CSS + JS included)

## Install

```bash
npm install @rotsl/weave
```

## Quick Start

```ts
import { parseWeave, compileWeave } from '@rotsl/weave';

const script = `
A page called "LaunchPad"
  With a hero
    Showing "Ship faster with Weave"
    With subtitle "Natural-language scripts to full HTML"
    With a primary button "Get Started"
  Using corporate theme
`;

const ast = parseWeave(script);
const html = compileWeave(ast, { minify: true });

console.log(html);
```

## API

### `parseWeave(code: string): WeaveAST`

Parses Weave script text into an AST.

### `compileWeave(ast: WeaveAST, options?: { minify?: boolean }): string`

Compiles AST into a full HTML document string.

### `themes`

Built-in theme registry.

### `generateThemeCSS(themeName: string, darkMode: boolean): string`

Returns theme CSS for a selected built-in theme.

## Built-in Themes

- `modern`
- `minimal`
- `corporate`
- `playful`
- `elegant`
- `dark`

## Example Case

Use `@rotsl/weave` inside a build script to generate static landing pages from `.weave` text sources.

## Develop Package Locally

```bash
cd packages/weave
bun install
bun run build
```

## Package Structure

```text
packages/weave/
├── src/
│   ├── index.ts                        # public package exports
│   ├── parser.ts                       # script text -> AST
│   ├── compiler.ts                     # AST -> HTML
│   ├── types.ts                        # AST/type definitions
│   └── themes/
│       └── index.ts                    # built-in themes and CSS generation
├── dist/                               # build output (published)
├── package.json                        # npm metadata for @rotsl/weave
├── README.md                           # package docs
├── LICENSE                             # package license
└── tsconfig.json                       # package TypeScript config
```

## Publishing and GitHub Visibility

- Package name: `@rotsl/weave`
- npm access: `public`
- Repository metadata links npm users to `https://github.com/rotsl/Weave`
- Monorepo package directory is declared so the npm page resolves to `packages/weave`

## License

Apache-2.0 © 2026 Rohan R
