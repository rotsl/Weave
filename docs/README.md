# Weave Documentation

This folder contains user-facing documentation for writing Weave scripts.

## Reading Order

1. `HowToUseWeave.md` # start here for complete usage flow
2. `syntax.md` # learn all supported keywords/properties
3. `examples.md` # copy and adapt ready-made scripts

## Docs Structure

```text
docs/
├── README.md                            # docs index and navigation
├── HowToUseWeave.md                     # step-by-step usage guide
├── syntax.md                            # language reference
└── examples.md                          # example scripts from simple to complex
```

## How These Docs Map to the Project

- Editor UI: `src/app/page.tsx` # in-browser authoring and preview
- Parser: `src/lib/weave/parser.ts` # turns text into AST
- Compiler: `src/lib/weave/compiler.ts` # turns AST into HTML
- npm package mirror: `packages/weave/src/*` # reusable package source

## Example Case

If you want a fast starting point, use this path:

1. Open `examples.md`.
2. Copy a complete script (for example, a SaaS or portfolio page).
3. Paste into the editor (`src/app/page.tsx` UI).
4. Preview and export generated HTML.

## Maintenance Notes

- Keep syntax rules in `syntax.md` aligned with parser behavior.
- Keep `examples.md` runnable against current parser/compiler.
- When adding new language features, update all three docs files in the same change.
