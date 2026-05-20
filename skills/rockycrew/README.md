# rockycrew

Decision guide. When to delegate to rocky subagents instead of doing the work inline.

## What it does

Tells the main thread when to spawn a rocky-style subagent versus the vanilla equivalent. The win: subagent tool-results inject back into main context verbatim, and rocky output is roughly 1/3 the size of vanilla prose. Across 20 delegations in one session, that is the difference between context exhaustion and finishing the task.

Three subagents:

| Subagent | Job | Use when |
|----------|-----|----------|
| `rockycrew-investigator` | Locate code (read-only) | "Where is X defined / what calls Y / list uses of Z" |
| `rockycrew-builder` | Surgical edit, 1-2 files | Scope is obvious, ≤2 files. Refuses 3+ file scope. |
| `rockycrew-reviewer` | Diff/file review | One-line findings with severity emoji |

Use vanilla `Explore` or `Code Reviewer` when you want prose, architecture commentary, or rationale. Use main thread directly for one-line answers and 3+ file refactors.

This skill is a decision guide, not a slash command. It activates when the conversation mentions delegation.

## How to invoke

Triggers on phrases like "delegate to subagent", "use rockycrew", "spawn investigator", "save context", "compressed agent output".

## Example chaining

Locate → fix → verify (most common):

1. `rockycrew-investigator` returns site list (`path:line — symbol — note`)
2. Main thread picks 1-2 sites, hands paths to `rockycrew-builder`
3. `rockycrew-reviewer` audits the resulting diff

Parallel scout: spawn 2-3 `rockycrew-investigator` calls in one message with different angles (defs, callers, tests). Aggregate in main.

## See also

- [`SKILL.md`](./SKILL.md) — full decision matrix and output contracts
- [`agents/rockycrew-investigator.md`](../../agents/rockycrew-investigator.md)
- [`agents/rockycrew-builder.md`](../../agents/rockycrew-builder.md)
- [`agents/rockycrew-reviewer.md`](../../agents/rockycrew-reviewer.md)
- [Rocky README](../../README.md) — repo overview
