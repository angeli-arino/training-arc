# Training Arc Design Handoff

Training Arc is Abby’s personal fitness companion for answering one daily question:

> “How cooked am I today, and should I train, modify, or rest?”

This folder is the source of truth for the MVP UI. Read these files before implementing or changing screens.

## Source-of-truth order

1. `product-vision.md` — what the app is and must never become.
2. `design-system.md` — colours, typography, spacing, shapes, dark mode.
3. `ui-guidelines.md` — practical UI rules and anti-patterns.
4. `components.md` — reusable component specs.
5. `screens.md` — screen-by-screen layout and behaviour.
6. `body-scan-logic.md` — decision logic for Slay Day, Modify the Quest, Recovery Episode, and Peace Mode.
7. `copywriting.md` — terminology, tone, labels, microcopy.
8. `navigation.md` — app routes and bottom navigation.
9. `animations.md` — motion rules.
10. `design-review-checklist.md` — required self-review before considering UI work done.

## Visual reference

Use `assets/moodboard.png` as a visual reference only. The markdown files are more important than the image if there is a conflict.

## Non-negotiables

- Do not use plum or purple as the main colour.
- Lavender is allowed only as a small accent.
- Light mode must feel strawberry milk, blush, cream, peach, and warm ivory.
- Dark mode must feel deep rose, cherry cocoa, warm berry, and soft pink glow.
- Do not use sliders. Use circular number buttons.
- Do not make the app look like a corporate dashboard, admin panel, or chunky game menu.
- Use cute 3D icons intentionally and sparingly.
- Mobile-first. Desktop should feel like a graceful expansion, not a separate dashboard.

## Implementation recommendation

Build reusable components first, then screens:

1. AppShell
2. SoftCard
3. PillButton
4. CircularScoreButton
5. StatusChip
6. TrainingCompassCard
7. BodyScanQuestion
8. ResultCard
9. WeeklyArcStrip
10. WorkoutCard
11. ThemeToggle

After implementation, run the UI against `design-review-checklist.md` and revise anything that fails.
