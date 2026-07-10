# Suggested package.json Scripts

Use whatever already exists in the repo. If missing, Codex can suggest adding scripts like these depending on the stack.

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  }
}
```

Do not add tools blindly. Match the actual project stack.
