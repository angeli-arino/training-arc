# Components

## AppShell

Purpose: Provides the page frame, background, header area, bottom navigation, and responsive container.

Rules:

- Mobile-first.
- Max width on desktop so the app still feels like a lifestyle app.
- Background uses warm ivory in light mode and deep cherry cocoa in dark mode.
- Bottom navigation is fixed or sticky on mobile.

## SoftCard

Purpose: Default surface for grouped content.

Variants:

- `default`
- `hero`
- `selected`
- `status`
- `subtle`

Rules:

- Rounded 22–28px.
- Soft warm border.
- Gentle shadow.
- Never harsh grey boxes.

## PillButton

Purpose: Main CTAs and soft secondary actions.

Variants:

- `primary`
- `secondary`
- `ghost`
- `dangerSoft`

Rules:

- Pill radius.
- Primary uses blush/rose.
- Must have pressed state.
- Must feel tappable on mobile.

## CircularScoreButton

Purpose: Numeric inputs for Energy and RPE.

Props:

- `value`
- `label`
- `selected`
- `disabled`
- `onSelect`

Rules:

- Perfect circle.
- Selected state uses pink fill or warm glow.
- Label sits below circle.
- No sliders anywhere.

## StatusChip

Purpose: Shows result state or small context.

Statuses:

- Slay Day
- Modify the Quest
- Recovery Episode
- Peace Mode

Rules:

- Pill shape.
- Soft background.
- Small icon optional.
- Status colour must match decision status.

## TrainingCompassCard

Purpose: Shows latest recommendation or quick state on Home.

Content:

- Status or “No scan yet today”
- Short guidance
- Optional small compass/heart icon

Rules:

- Should be small and calm.
- Not a giant dashboard widget.

## BodyScanQuestion

Purpose: One question block inside Body Scan Quest.

Content:

- title
- helper text
- control area
- optional progress indicator

Rules:

- One clear question at a time or small grouped form.
- Large tap targets.
- Avoid dense form layouts.

## ResultCard

Purpose: Main result reveal after scan.

Content:

- Result status
- Hero message
- Short reason
- Recommendation
- Modified plan if relevant
- Tiny win option
- Save action

Rules:

- Emotional payoff screen.
- Must feel supportive, not clinical.
- Each status gets a distinct soft visual treatment.

## WeeklyArcStrip

Purpose: Weekly view of training statuses.

Content:

- days of week
- date
- small workout icon
- status colour

Rules:

- Soft planner style.
- Avoid dense calendar grid.
- Should show the week as a story, not a spreadsheet.

## WorkoutCard

Purpose: Log entry for workout history.

Content:

- workout type
- title
- date
- duration/distance if relevant
- RPE
- optional icon

Rules:

- Soft rounded card.
- Compact but readable.
- Use tiny icon, not huge illustration.

## ThemeToggle

Purpose: Switch light/dark mode.

Rules:

- Subtle pill/segmented control.
- Do not use ugly oversized sun/moon buttons.
- Should not be visually dominant.

## BottomNavigation

Items:

- Home
- Log
- Arc
- Me

Rules:

- Rounded floating nav.
- Active item is pink/rose.
- Inactive items are muted.
- Avoid gamer HUD style.
