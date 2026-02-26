# Weave Docs

This folder contains the practical references for writing and validating Weave scripts.

## Read in This Order

1. `HowToUseWeave.md` # complete walkthrough from script to output
2. `syntax.md` # supported statements, blocks, and options
3. `examples.md` # copy-ready script examples

## Docs Folder Structure

```text
docs/
├── README.md                            # navigation + maintenance notes
├── HowToUseWeave.md                     # guided usage and workflow
├── syntax.md                            # language reference
└── examples.md                          # runnable examples for quick starts
```

## How Docs Map to Code

- `src/lib/weave/parser.ts` # parser implementation (`parseWeave`)
- `src/lib/weave/compiler.ts` # compiler implementation (`compileWeave`)
- `packages/weave/src/*` # npm package mirror of core engine
- `src/app/page.tsx` # editor UI for authoring and preview

## Example Workflow

1. Copy a script from `examples.md`.
2. Paste it into the local editor (`bun run dev`).
3. Confirm output in preview.
4. Re-check syntax rules in `syntax.md` if parsing fails.

## Maintenance Rule

When syntax or compiler behavior changes, update `HowToUseWeave.md`, `syntax.md`, and `examples.md` in the same PR.
