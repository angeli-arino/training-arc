# Implementation Standards

## General code quality

- Prefer simple, readable code.
- Use descriptive names.
- Keep components small.
- Avoid premature abstraction.
- Avoid duplicating UI logic.
- Avoid magic numbers when they belong in design tokens.
- Keep TypeScript types clear and practical.
- Do not add unnecessary dependencies.

## React/component expectations

- Build reusable components for repeated UI patterns.
- Keep presentational components separate from decision logic where sensible.
- Prefer props with clear names.
- Use variants instead of creating many near-identical components.
- Avoid deeply nested component trees when a simpler structure works.

## Styling expectations

- Use the existing styling system in the repo.
- If Tailwind is used, prefer token-like class consistency.
- Do not scatter random hex colours everywhere.
- Use CSS variables or theme tokens where available.
- Keep light and dark mode styles paired.

## State and logic

- Keep Body Scan scoring logic testable.
- Separate decision logic from UI rendering.
- Avoid hardcoding result text deep inside unrelated components.
- Store reusable copy in a clear constants file when appropriate.

## File organization

Prefer a structure like:

```text
src/
├── app/ or pages/
├── components/
│   ├── ui/
│   └── training-arc/
├── features/
│   ├── body-scan/
│   ├── workout-log/
│   └── weekly-arc/
├── lib/
├── styles/
└── data/
```

Adapt to the existing repo instead of forcing this exact structure.
