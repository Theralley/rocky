# rocky-help

Quick-reference card. One shot, no mode change.

## What it does

Prints a cheat sheet of all rocky modes, sibling skills, deactivation triggers, and how to set the default mode via env var or config file. One-shot display — does not flip the active mode, write flag files, or persist anything. Use when you forget the slash commands.

## How to invoke

```
/rocky-help
```

Also triggers on "rocky help", "what rocky commands", "how do I use rocky".

## Example output

```
Modes:
  /rocky              full (default)
  /rocky lite         lighter
  /rocky ultra        extreme
  /rocky wenyan       classical Chinese

Skills:
  /rocky-commit       terse Conventional Commits
  /rocky-review       one-line PR comments
  /rocky-stats        session token savings

Deactivate:
  "stop rocky" or "normal mode"
```

## See also

- [`SKILL.md`](./SKILL.md) — full reference card
- [Rocky README](../../README.md) — repo overview
