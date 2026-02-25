# Weave

Weave is a natural-language web project with two runnable parts:

- `weave-editor` (root app): a Next.js editor to write/preview/export Weave pages.
- `@rotsl/weave` (`packages/weave`): an npm package that parses and compiles Weave scripts to full HTML.

## What You Can Do With Weave

- Write page structure in plain English.
- Parse that text into an AST using `parseWeave`.
- Compile AST to a complete HTML document using `compileWeave`.
- Use built-in themes (`modern`, `minimal`, `corporate`, `playful`, `elegant`, `dark`).

## Prerequisites

- Bun `1.1+`
- Node.js `20+` (mainly for workflow/runtime compatibility)

## Root App: Setup and Run

1. Install dependencies.

```bash
bun install
```

2. Create local environment file.

```bash
cp .env.example .env
```

3. Start the editor.

```bash
bun run dev
```

4. Open `http://localhost:3000`.

## Root App: Build Targets

- Production server build:

```bash
bun run build
bun start
```

- Static export build (for GitHub Pages):

```bash
bun run build:static
```

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
4. Save or export the generated HTML.

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
