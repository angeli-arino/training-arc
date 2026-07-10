# Component Contracts

These components should exist or be created as reusable building blocks.

## AppShell

Purpose: Provides app layout, background, page width, safe areas, and navigation shell.

Must support:

- mobile-first layout
- dark mode
- bottom navigation
- soft page background

## SoftCard

Purpose: Base card component for Training Arc content.

Variants:

- default
- elevated
- blush
- result
- compact

Rules:

- rounded corners
- soft shadow or subtle border
- warm backgrounds
- no harsh admin-card styling

## PillButton

Purpose: Primary and secondary app actions.

Variants:

- primary
- secondary
- ghost
- danger-soft

Rules:

- pill shape
- clear active/pressed state
- accessible contrast

## CircularScoreButton

Purpose: Energy and RPE scoring without sliders.

Props should support:

- value
- label
- selected
- disabled
- onClick

Rules:

- circular shape
- selected state must be obvious
- label below or near button
- thumb-friendly tap target

## StatusChip

Purpose: Show decision/status labels.

Statuses:

- Slay Day
- Modify the Quest
- Recovery Episode
- Peace Mode

Rules:

- colour-coded
- soft and readable
- not too large

## TrainingCompassCard

Purpose: Small summary card showing current recommendation or scan state.

Should include:

- status
- short reason
- next action

## BodyScanQuestion

Purpose: Reusable question block for Body Scan Quest.

Should include:

- question title
- short helper text
- input choices
- optional icon

## ResultCard

Purpose: Main result screen component.

Should include:

- result status
- recommendation
- why
- modified plan
- tiny win option
- save action

## WeeklyArcStrip

Purpose: Horizontal weekly overview.

Should include:

- day initials
- date
- workout icon
- status colour

## WorkoutCard

Purpose: Summarize a logged workout.

Should include:

- workout type
- title
- date
- duration/distance/load where relevant
- RPE
- status/notes
