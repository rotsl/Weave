# Weave

[![Repo](https://img.shields.io/badge/GitHub-rotsl%2FWeave-181717?logo=github)](https://github.com/rotsl/Weave)
[![CI](https://img.shields.io/github/actions/workflow/status/rotsl/Weave/ci.yml?branch=main&label=CI)](https://github.com/rotsl/Weave/actions/workflows/ci.yml)
[![Deploy](https://img.shields.io/github/actions/workflow/status/rotsl/Weave/deploy.yml?branch=main&label=Deploy)](https://github.com/rotsl/Weave/actions/workflows/deploy.yml)
[![npm](https://img.shields.io/npm/v/%40rotsl%2Fweave?logo=npm)](https://www.npmjs.com/package/@rotsl/weave)
[![License](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](./LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/@rotsl/weave.svg)](https://www.npmjs.com/package/@rotsl/weave)

[![DOI](https://zenodo.org/badge/1166567513.svg)](https://doi.org/10.5281/zenodo.18773304)

Weave turns plain-English page scripts into complete, production-ready HTML.

> Weave pages like you'd knit your sweater. Stay warm! ❤️

- Describe sections, content, buttons, and layout in readable text.
- Parse script text into a typed AST with `parseWeave`.
- Compile that AST into a full HTML document with `compileWeave`.
- Use built-in themes (`modern`, `minimal`, `corporate`, `playful`, `elegant`, `dark`).
- Work visually in the editor app, then export HTML artifacts.

## Capabilities Snapshot

```text
A page called "Helio Labs"
  With a hero
    Showing "Launch faster with Weave"
    With subtitle "Write structure in plain English, ship full HTML"
    With a primary button "Start Building"
  With features
    Having 3 features:
      "Fast authoring" with description "No class-level styling setup needed"
      "Deterministic output" with description "Compiler emits stable HTML"
      "Portable delivery" with description "Export static files instantly"
  Using modern theme
```

This script is parsed and compiled into a full webpage with styling and behavior included.

## Run Weave (Editor)

### Prerequisites

- Bun `1.1+`
- Node.js `20+`

### 1. Install dependencies

```bash
bun install
```

### 2. Configure environment

```bash
cp .env.example .env
```

### 3. Start the editor

```bash
bun run dev
```

Open `http://localhost:3000`.

### 4. Build targets

```bash
# Next.js standalone build
bun run build

# Static export for GitHub Pages
bun run build:static
```

## Use Weave as npm Package

```bash
npm install @rotsl/weave
```

```ts
import { parseWeave, compileWeave } from '@rotsl/weave';

const script = `
A page called "My Site"
  With a hero
    Showing "Hello from Weave"
  Using minimal theme
`;

const html = compileWeave(parseWeave(script), { minify: true });
console.log(html);
```

## Example Case

Use Weave to generate a launch page during CI build:

1. Keep a `.weave` script in your repo.
2. Parse and compile it in a build script using `@rotsl/weave`.
3. Publish the resulting HTML as an artifact or static site.

## Repository Structure

```text
weave/
├── .github/
│   ├── FUNDING.yml                     # Buy Me a Coffee funding link
│   └── workflows/
│       ├── ci.yml                      # CI on push/PR + manual dispatch
│       ├── deploy.yml                  # GitHub Pages deploy on push + manual dispatch
│       └── publish-npm.yml             # @rotsl/weave publish on push + manual dispatch
├── docs/
│   ├── README.md                       # docs index and reading order
│   ├── HowToUseWeave.md                # hands-on usage guide
│   ├── syntax.md                       # language reference
│   └── examples.md                     # runnable scripts
├── packages/
│   └── weave/
│       ├── src/                        # package source (parser/compiler/themes)
│       ├── package.json                # @rotsl/weave metadata
│       ├── README.md                   # package usage docs
│       └── LICENSE                     # package license copy
├── src/                                # editor app source
├── public/                             # static assets
├── CONTRIBUTING.md                     # contribution workflow and standards
├── CODE_OF_CONDUCT.md                  # community behavior expectations
├── SECURITY.md                         # vulnerability reporting process
├── CHANGELOG.md                        # release history
├── LICENSE                             # repository license
└── README.md                           # project overview
```

## GitHub Actions Behavior

- `CI` runs on pushes to `main`/`master`/`develop`, PRs to those branches, and manual dispatch.
- `Deploy` runs on pushes to `main`/`master` when app files change, and manual dispatch.
- `Publish Weave to npm` runs on pushes to `main`/`master` when `packages/weave/**` changes, and manual dispatch.

## Package Visibility Notes

`@rotsl/weave` metadata points to the GitHub repo and package subdirectory, so npm users can navigate directly to source/docs on GitHub.

## Contributing, Security, Changelog, Conduct

- See `CONTRIBUTING.md`
- See `SECURITY.md`
- See `CHANGELOG.md`
- See `CODE_OF_CONDUCT.md`



<div align="center" style="margin-top: 28px; padding: 18px; border: 1px solid #d0d7de; border-radius: 12px;">
  <h3 style="margin: 0;">𐂝 Weave</h3>
  <p style="margin: 8px 0 0;"><strong>Design that thinks for you</strong></p>
  <p style="margin: 8px 0 0;">Plain-English Scripts • Instant Preview • Production HTML</p>
  <p style="margin: 12px 0 0;">
    <a href="https://github.com/rotsl/Weave">GitHub</a>
    &nbsp;•&nbsp;
    <a href="https://rotsl.github.io/Weave/">Live Demo</a>
  </p>
  <p style="margin: 12px 0 0;">Built by <a href="https://github.com/rotsl">@rotsl</a> 💙</p>
</div>
