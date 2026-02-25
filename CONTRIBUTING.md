# Contributing to Weave

Thanks for contributing to Weave.

## Development Setup

1. Install prerequisites: Bun `1.1+`, Node.js `20+`.
2. Install dependencies:

```bash
bun install
```

3. Run the editor locally:

```bash
bun run dev
```

4. Run lint checks:

```bash
bun run lint
```

## Package Development (`@rotsl/weave`)

```bash
cd packages/weave
bun install
bun run build
```

## Contribution Rules

- Keep PRs focused and small.
- Update docs when behavior changes.
- Do not commit local artifacts (`.next`, `out`, logs, caches, virtual envs).
- Preserve package name and scope: `@rotsl/weave`.

## Pull Request Checklist

- [ ] Code builds locally
- [ ] Lint passes locally
- [ ] Documentation updated where needed
- [ ] No secrets or local-only files committed

## Commit Message Guidance

Use clear, intent-first commit subjects:

- `feat: add X`
- `fix: correct Y`
- `docs: update Z`
- `chore: maintenance`

## Reporting Bugs

Open an issue at `https://github.com/rotsl/Weave/issues` with:

- Repro steps
- Expected behavior
- Actual behavior
- Environment details (OS, Bun, Node)
