# Body Scan Coding Rules

The Body Scan is the heart of Training Arc.

It should be easy, fast, and supportive.

## Required inputs

Energy:

- 1 floor
- 2 low battery
- 3 functional
- 4 ready
- 5 main character

Soreness:

- none
- mild
- medium
- spicy
- absolutely cooked

Breathing / illness:

- normal
- slightly off
- coughing
- sick-sick

Mood:

- calm
- frazzled
- anxious
- emotionally cooked

Planned workout:

- run
- gym
- hybrid
- rest day
- unsure

Recent effort / RPE:

- 1–10 circular buttons
- 1 chill
- 5 steady
- 10 boss fight

## Result mapping

The app should return one of:

- Slay Day
- Modify the Quest
- Recovery Episode
- Peace Mode

## Coding rules

- Keep scoring logic separate from UI.
- Make result mapping easy to test.
- Do not bury thresholds inside JSX.
- Use named constants for thresholds.
- Result copy should be easy to adjust.

## Safety-ish behaviour

If the user reports sick-sick, breathing issues, severe fatigue, or emotionally cooked state, the app should avoid pushing intensity.

The tone should be supportive, not dramatic.
