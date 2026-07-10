# Troubleshooting Codex Issues

## Problem: UI becomes purple/plum again

Use prompt: `prompts/fix-ui-drift.md`.

Tell Codex to replace dominant plum/purple with blush, strawberry, peach, cream, deep rose, or cherry cocoa tokens.

## Problem: UI looks like admin dashboard

Ask Codex to:

- reduce dense grid layouts
- increase softness and spacing
- use lifestyle app hierarchy
- make the main action more prominent
- replace boxy cards with SoftCard components

## Problem: Codex adds sliders

Tell Codex:

- sliders are banned for Training Arc
- replace with CircularScoreButton
- Energy = 1–5
- RPE = 1–10

## Problem: Icons look pasted on

Ask Codex to:

- reduce icon size
- use icons only in key scanning moments
- align icons with cards and labels
- remove decorative icons that do not add meaning

## Problem: Dark mode looks muddy

Ask Codex to:

- use cherry cocoa background
- warm berry cards
- soft pink/peach highlights
- cream text accents
- avoid brown-gray and cold purple

## Problem: Feature got too big

Ask Codex to split into:

1. data/constants
2. logic
3. reusable components
4. screen assembly
5. tests/checks
