# Animations

## Motion personality

Motion should feel soft, gentle, and polished. Avoid loud game-like animations.

## Principles

- Small movements only.
- Prefer fade, slide, scale, and soft reveal.
- Keep animations quick.
- Never block the user.
- Respect reduced motion preferences.

## Recommended timings

| Motion | Duration |
|---|---:|
| Button press | 100–150ms |
| Card hover / tap | 150–200ms |
| Page transition | 220–320ms |
| Result reveal | 350–500ms |
| Tiny sparkle/accent | 500–800ms |

## Screen transitions

Use gentle transitions:

- Home → Body Scan: slight slide up / fade in
- Body Scan question change: horizontal slide or fade
- Body Scan → Result: soft reveal with small scale-in
- Save result: gentle confirmation pulse

## Component motion

### Buttons

- Press state: scale to 0.98.
- Release: spring back gently.

### Cards

- On hover desktop: lift subtly.
- On tap mobile: slight compression.

### Circular score buttons

- Selected state: soft pop and glow.
- Do not bounce excessively.

### Result card

- Result badge appears first.
- Main result text fades in.
- Recommendation appears after.

## Avoid

- spinning icons
- aggressive bounce
- confetti every time
- game menu transitions
- neon glow effects
