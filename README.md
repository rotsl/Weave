# Weave

[![Repo](https://img.shields.io/badge/GitHub-rotsl%2FWeave-181717?logo=github)](https://github.com/rotsl/Weave)
[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-222222?logo=githubpages)](https://rotsl.github.io/Weave/)
[![License](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](./packages/weave/LICENSE)
[![Package](https://img.shields.io/badge/npm-%40rotsl%2Fweave-CB3837?logo=npm)](https://www.npmjs.com/package/@rotsl/weave)

Weave is a natural-language web project with two runnable parts:

- `weave-editor` (root app): a Next.js editor to write, preview, and export Weave pages.
- `@rotsl/weave` (`packages/weave`): an npm package that parses and compiles Weave scripts to full HTML.

## What You Can Do With Weave

- Write page structure in plain English.
- Parse text into an AST using `parseWeave`.
- Compile AST to a complete HTML document using `compileWeave`.
- Use built-in themes (`modern`, `minimal`, `corporate`, `playful`, `elegant`, `dark`).

## Prerequisites

- Bun `1.1+`
- Node.js `20+`

## Run Weave (Editor App)

### 1. Install dependencies

```bash
bun install
```

### 2. Configure environment

```bash
cp .env.example .env
```

### 3. Start development server

```bash
bun run dev
```

Open `http://localhost:3000`.

### 4. Use the editor

1. Write Weave script in the editor panel.
2. See compiled output in preview.
3. Download `index.html`, `styles.css`, `script.js`, or all files.

### 5. Lint before pushing

```bash
bun run lint
```

## Build and Test Targets

### Production build (standalone)

```bash
bun run build
bun start
```

### Static export build (GitHub Pages)

```bash
bun run build:static
```

This creates export artifacts in `out/`.

## Run Weave as an npm package

Install package:

```bash
npm install @rotsl/weave
```

Minimal usage:

```ts
import { parseWeave, compileWeave } from '@rotsl/weave';

const script = `
A page called "My Site"
  With a hero
    Showing "Hello from Weave"
  Using modern theme
`;

const ast = parseWeave(script);
const html = compileWeave(ast);

console.log(html);
```

## Example Case

Use Weave to generate a one-page launch site for a new product in minutes.

```text
A page called "BioTrack"
  With a header
    Showing "BioTrack"
    With navigation linking to Features, Pricing, Contact
  With a hero
    Showing "Track Lab Work Faster"
    With subtitle "A lightweight workspace for modern research teams"
    With a primary button "Start Free"
  With features
    Having 3 features:
      "Fast Setup" with description "Create workflows in minutes"
      "Team Ready" with description "Share updates across your lab"
      "Exportable" with description "Download self-contained HTML"
  With a footer
    Copyright "2026 BioTrack"
  Using modern theme
```

Result:

- Weave parses this script into an AST.
- Weave compiles it to a full HTML page.
- You can preview in the editor and export immediately.

## Root Scripts

- `bun run dev` # run local editor
- `bun run lint` # run ESLint
- `bun run build` # standalone Next.js build
- `bun run build:static` # static export build
- `bun run db:push` # push Prisma schema
- `bun run db:generate` # generate Prisma client
- `bun run db:migrate` # run migration workflow
- `bun run db:reset` # reset local database

## How Weave Works (High-Level)

1. Write Weave script text.
2. Parse script into AST using `parseWeave`.
3. Compile AST to HTML using `compileWeave`.
4. Save or export generated HTML.

## Documentation

- `docs/HowToUseWeave.md` # usage walkthrough
- `docs/syntax.md` # full language reference
- `docs/examples.md` # ready-to-use scripts
- `docs/README.md` # docs index and reading order

## Repository Structure

```text
weave/
├── .github/
│   └── workflows/
│       ├── ci.yml                     # manual CI checks (workflow_dispatch only)
│       ├── deploy.yml                 # manual GitHub Pages deploy workflow
│       └── publish-npm.yml            # manual npm/GPR publish workflow
├── docs/
│   ├── README.md                      # docs index
│   ├── HowToUseWeave.md               # user guide
│   ├── syntax.md                      # syntax reference
│   └── examples.md                    # script examples
├── packages/
│   └── weave/
│       ├── src/                       # npm package source
│       ├── dist/                      # package build output
│       ├── package.json               # @rotsl/weave package metadata
│       └── README.md                  # npm package usage docs
├── prisma/
│   └── schema.prisma                  # Prisma schema
├── public/
│   ├── logo.svg                       # app/logo asset
│   └── robots.txt                     # crawler directives
├── src/
│   ├── app/                           # Next.js app router (UI pages/layout)
│   ├── components/                    # UI components
│   ├── hooks/                         # React hooks
│   └── lib/                           # weave parser/compiler + utilities
├── .env.example                       # environment template
├── package.json                       # root app scripts/dependencies
└── bun.lock                           # root dependency lockfile
```

## GitHub Workflows

All workflows are manual only (`workflow_dispatch`) and are not triggered by push.

- `CI` validates lint/build.
- `Deploy` builds static output and deploys GitHub Pages.
- `Publish Weave to npm` publishes `@rotsl/weave` from `packages/weave`.

## License

Apache-2.0

<div align="center" style="margin-top: 28px; padding: 18px; border: 1px solid #d0d7de; border-radius: 12px;">
  <h3 style="margin: 0;">🌬️ Weave</h3>
  <p style="margin: 8px 0 0;"><strong>Design that thinks for you</strong></p>
  <p style="margin: 8px 0 0;">Weave Scripts • Live Preview • Pure HTML Output</p>
  <p style="margin: 12px 0 0;">
    <a href="https://github.com/rotsl/Weave">GitHub</a>
    &nbsp;•&nbsp;
    <a href="https://rotsl.github.io/Weave/">Live Demo</a>
  </p>
  <p style="margin: 12px 0 0;">Built by <a href="https://github.com/rotsl">@rotsl</a> 💙</p>
</div>
