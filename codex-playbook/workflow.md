# Codex Workflow

Use this workflow for every Training Arc change.

## 1. Inspect

Before changing files, Codex should inspect:

- current project structure
- relevant routes/screens
- existing components
- existing styling approach
- relevant design docs
- relevant playbook docs

Codex should not blindly rewrite the app.

## 2. Plan

Codex should produce a short implementation plan:

- files to edit
- components to reuse/create
- expected behaviour
- checks to run

The plan should be small and focused.

## 3. Build

Implementation rules:

- make the smallest coherent change
- keep components reusable
- avoid one-off styling hacks
- avoid duplicating logic
- keep UI mobile-first
- preserve dark mode compatibility
- do not introduce new libraries without a strong reason

## 4. Verify

Run whatever the project supports:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

If some commands do not exist, Codex should say so honestly.

## 5. Visual self-review

Codex should review against:

- `/design/design-review-checklist.md`, if present
- `/codex-playbook/checklists/design-review-checklist.md`
- `/codex-playbook/checklists/accessibility-checklist.md`

Any obvious violations should be fixed before the task is considered done.

## 6. Final response

Codex should summarize:

- what changed
- files changed
- checks run
- known limitations or follow-ups

No fake claims. No pretending visual checks passed if no screenshot/browser check was run.
