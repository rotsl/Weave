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

## Maintenance Notes

- Keep syntax rules in `syntax.md` aligned with parser behavior.
- Keep `examples.md` runnable against current parser/compiler.
- When adding new language features, update all three docs files in the same change.
