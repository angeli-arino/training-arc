# Training Arc

Training Arc is Abby's personal fitness and recovery PWA for answering: "How cooked am I today, and should I train, modify, or rest?"

## Stack

- React with functional components
- TypeScript with strict project references
- Vite
- pnpm
- vite-plugin-pwa
- CSS Modules for component styling
- shared CSS design tokens in `src/styles/tokens.css`

## Install

```powershell
pnpm.cmd install
```

## Development

```powershell
pnpm.cmd dev
```

## Production Build

```powershell
pnpm.cmd build
```

## Preview

```powershell
pnpm.cmd preview
```

## PWA Behavior

The production build uses `vite-plugin-pwa` to generate the manifest and service worker. The app is installable, uses Training Arc icons from `public/icons`, caches the application shell, and shows an in-app prompt before applying an available update.

## Project Structure

```text
src/
  components/          Reusable UI primitives
  features/            Body Scan, workout log, and weekly arc features
  hooks/               Shared React hooks
  styles/              Global tokens, base styles, and motion rules
  types/               Domain types
  App.tsx              Route and app state orchestration
  main.tsx             Vite React entrypoint
```

## Migration Notes

The previous vanilla JavaScript renderer was migrated incrementally into React components. The original Body Scan scoring rules, Training Arc copy, localStorage persistence keys, theme switching, bottom navigation, and PWA icon assets were preserved. GitHub Pages deploys the Vite `dist` output from the `main` branch.
