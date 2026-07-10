# Training Arc Codex Playbook

This playbook keeps Codex consistent while building Training Arc.

Use it with the `/design` folder. The design folder explains what the app should look and feel like. This playbook explains how Codex should work on the codebase.

## Recommended repo structure

```text
/
├── AI_RULES.md
├── design/
├── codex-playbook/
├── src/
└── package.json
```

## Daily Codex prompt pattern

```text
Read AI_RULES.md first.
Then read the relevant files in /design and /codex-playbook.
Implement [feature/screen/component].
Do not deviate from the Training Arc design system.
Run checks and review against the design checklist before final response.
```

## Best workflow

1. Ask Codex to inspect first.
2. Ask it to propose a small implementation plan.
3. Let it code.
4. Make it run checks.
5. Make it self-review the UI against the checklist.
6. Iterate only on focused issues.

## Important files

- `AI_RULES.md` — global rules Codex should always read
- `workflow.md` — recommended working process
- `implementation-standards.md` — code quality standards
- `ui-implementation-rules.md` — UI-specific engineering rules
- `component-contracts.md` — reusable component expectations
- `prompts/` — copy-paste Codex prompts
- `templates/` — templates for future features/screens
- `checklists/` — review checklists before accepting changes
