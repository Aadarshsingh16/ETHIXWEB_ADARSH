---
trigger: always_on
description: Autonomous phase loop - implement, verify, review, update context, and auto-advance.
---

## Autonomous Phase Loop

The agent follows `LOOP.md`:
1. **Implement**: Build the phase scope defined in `PHASES.md`.
2. **Verify**: Ensure `pnpm lint`, `pnpm typecheck`, and `pnpm build` pass with 0 errors.
3. **Review**: Check security, design rules, and performance guidelines.
4. **Update**: Update `PHASES.md`, `DECISIONS.md`, and run `python -m graphify update .`.
5. **Auto-Advance**: If the phase gate passes, **do NOT ask the user for permission**. Immediately proceed to the next phase autonomously. Only stop if an unrecoverable external dependency is required.
