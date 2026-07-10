# Navigation

## Main routes

| Route | Screen | Purpose |
|---|---|---|
| `/` | Home Dashboard | Daily overview and main Body Scan CTA |
| `/scan` | Body Scan Quest | Daily cooked check-in |
| `/result` | Training Decision Result | Shows train/modify/rest/peace decision |
| `/log` | Workout Log | Saved workouts and daily arcs |
| `/arc` | Weekly Arc View | Weekly training story and load |
| `/me` | Me / Settings | Profile, preferences, theme |

## Bottom navigation

Use bottom navigation for the main app areas:

1. Home
2. Log
3. Arc
4. Me

The scan flow can be launched from Home and does not need to be a persistent bottom nav item.

## Navigation behaviour

- Home CTA opens Body Scan Quest.
- Completing scan opens Training Decision Result.
- Saving result returns to Home or Weekly Arc, depending on implementation.
- Workout Log can be reached from bottom navigation.
- Weekly Arc can be reached from bottom navigation.

## Header behaviour

- Use simple headers.
- Back button where needed.
- Avoid heavy top bars.
- Theme toggle should be subtle and placed in settings or small header area.

## Desktop behaviour

Desktop may use:

- centered app container
- optional side preview panel
- bottom navigation retained or converted into soft side rail

Avoid turning desktop into an admin dashboard.
