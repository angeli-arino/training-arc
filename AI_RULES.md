# AI_RULES.md — Training Arc Codex Rules

You are contributing to **Training Arc**, Abby’s personal non-work fitness companion app.

Training Arc helps answer:

> “How cooked am I today, and should I train, modify, or rest?”

Before making code changes, always read the relevant files in `/design` and `/codex-playbook`.

## Source of truth order

1. `/design/*` — visual design, product direction, components, screens, copy, logic
2. `/codex-playbook/*` — coding workflow, implementation rules, review process
3. Existing codebase patterns
4. User’s latest request

Do not invent a new visual direction unless explicitly asked.

## Non-negotiable product rules

- This is a personal lifestyle app, not a corporate dashboard.
- The app must feel cute, soft, warm, practical, mobile-first, and polished.
- Do not use plum/purple as the dominant brand colour.
- Light mode must feel strawberry milk, blush, cream, peach, warm ivory.
- Dark mode must feel deep rose, warm berry, cocoa, cherry.
- Lavender may be used only as a small accent.
- Do not use sliders. Use circular number buttons.
- Do not create boxy admin cards.
- Do not create chunky gamer UI.
- Do not overuse large decorative icons.
- Reuse components instead of creating one-off UI.
- Preserve the terminology: Today’s Arc, Body Scan Quest, Cooked Meter, Training Compass, Slay Day, Modify the Quest, Recovery Episode, Peace Mode.

## Before coding

1. Identify the screen, component, or feature being changed.
2. Read the relevant design and playbook docs.
3. Inspect existing code structure.
4. Reuse existing components where possible.
5. Make the smallest clean change that satisfies the request.

## After coding

1. Run available checks: lint, typecheck, test, build.
2. Review UI against `/codex-playbook/checklists/design-review-checklist.md`.
3. Fix violations before final response.
4. Summarize what changed and mention any checks that could not be run.

## Prompt shortcut

When a user says:

> Read AI_RULES.md

Treat this file as mandatory context for the task.
