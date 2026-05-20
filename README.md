<p align="center">
  <img src="https://em-content.zobj.net/source/apple/391/rock_1faa8.png" width="120" />
</p>

<h1 align="center">rocky</h1>

<p align="center">
  <strong>Brain big. Words few. Good.</strong>
</p>

<p align="center">
  <a href="https://github.com/Theralley/rocky/stargazers"><img src="https://img.shields.io/github/stars/Theralley/rocky?style=flat&color=yellow" alt="Stars"></a>
  <a href="https://github.com/Theralley/rocky/commits/main"><img src="https://img.shields.io/github/last-commit/Theralley/rocky?style=flat" alt="Last Commit"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/Theralley/rocky?style=flat" alt="License"></a>
</p>

<p align="center">
  <a href="#before--after">Before/After</a> •
  <a href="#install">Install</a> •
  <a href="#what-you-get">What You Get</a> •
  <a href="#benchmarks">Benchmarks</a> •
  <a href="./INSTALL.md">Full install guide</a>
</p>

---

A [Claude Code](https://docs.anthropic.com/en/docs/claude-code) skill/plugin (also Codex, Gemini, Cursor, Windsurf, Cline, Copilot, 30+ more) that makes the agent talk like Rocky the Eridian — cuts **~75% of output tokens**, keeps full technical accuracy. Brain big. Words few. Good.

> *"Brain still works. Mouth uses fewer rocks. Question, you want this? Good. Install."*
>
> — Rocky, probably

## Before / After

<table>
<tr>
<td width="50%">

### 🗣️ Normal Claude (69 tokens)

> "The reason your React component is re-rendering is likely because you're creating a new object reference on each render cycle. When you pass an inline object as a prop, React's shallow comparison sees it as a different object every time, which triggers a re-render. I'd recommend using useMemo to memoize the object."

</td>
<td width="50%">

### <img src="docs/assets/dancing-rock.svg" width="20" height="20" alt="rock"/> Rocky Claude (20 tokens)

> "Component re-render. New object ref each render. Wrap in `useMemo`. Good."

</td>
</tr>
<tr>
<td>

### 🗣️ Normal Claude

> "Sure! I'd be happy to help you with that. The issue you're experiencing is most likely caused by your authentication middleware not properly validating the token expiry. Let me take a look and suggest a fix."

</td>
<td>

### <img src="docs/assets/dancing-rock.svg" width="20" height="20" alt="rock"/> Rocky Claude

> "Bug. Auth middleware. Token expiry check uses `<` not `<=`. Bad. Fix:"

</td>
</tr>
</table>

**Same fix. 75% fewer words. Brain big.**

```
┌─────────────────────────────────────┐
│  TOKENS SAVED          ████████ 75% │
│  TECHNICAL ACCURACY    ████████ 100%│
│  SPEED INCREASE        ████████ ~3x │
│  VIBES                 ████████ AMAZE│
└─────────────────────────────────────┘
```

Pick your level of brevity — `lite` (drop filler), `full` (default Rocky), `ultra` (telegraphic), or `wenyan` (classical Chinese, even shorter). One command switches it. Cost goes down forever. Good.

## Install

One line. Finds every agent. Installs for each.

```bash
# macOS / Linux / WSL / Git Bash
curl -fsSL https://raw.githubusercontent.com/Theralley/rocky/main/install.sh | bash

# Windows (PowerShell 5.1+)
irm https://raw.githubusercontent.com/Theralley/rocky/main/install.ps1 | iex
```

~30 seconds. Needs Node ≥18. Skips any agent you do not have. Safe to re-run.

**Trigger:** type `/rocky` or say "talk like rocky". Stop with "normal mode".

One agent only, manual command, or any of 30+ other agents → [**INSTALL.md**](./INSTALL.md).
Install break? Open agent, say *"Read CLAUDE.md and INSTALL.md, install rocky for me."* Agent fixes own brain.

## What You Get

| Skill | What |
|---|---|
| `/rocky [lite\|full\|ultra\|wenyan]` | Compress every reply. Levels stick until session ends. |
| `/rocky-commit` | Conventional Commit messages, ≤50 char subject. Why over what. |
| `/rocky-review` | One-line PR comments: `L42: 🔴 bug: user null. Add guard.` |
| `/rocky-stats` | Real session token usage + lifetime savings + USD. Tweetable line via `--share`. |
| `/rocky-compress <file>` | Rewrite memory file (e.g. `CLAUDE.md`) into Rocky-speak. Cuts ~46% input tokens every session. Code/URLs/paths byte-preserved. |
| `rocky-shrink` | MCP middleware. Wraps any MCP server, compresses tool descriptions. [npm](https://www.npmjs.com/package/rocky-shrink). |
| `rockycrew-*` | Rocky subagents (investigator/builder/reviewer). ~60% fewer tokens than vanilla, main context lasts longer. |

**Statusline badge** — Claude Code shows `[ROCKY] 🪨 12.4k` (lifetime tokens saved). Updates every `/rocky-stats` run. Set `ROCKY_STATUSLINE_SAVINGS=0` to silence.

Auto-activates every session: Claude Code, Codex, Gemini (built-in). Cursor / Windsurf / Cline / Copilot get always-on rule files via `--with-init`. Other agents trigger with `/rocky` per session. Full feature matrix in [INSTALL.md](./INSTALL.md#what-you-get).

## Benchmarks

Real token counts from the Claude API. Average **65% output reduction** across 10 prompts (range 22-87%).

<!-- BENCHMARK-TABLE-START -->
| Task | Normal | Rocky | Saved |
|------|-------:|--------:|------:|
| Explain React re-render bug | 1180 | 159 | 87% |
| Fix auth middleware token expiry | 704 | 121 | 83% |
| Set up PostgreSQL connection pool | 2347 | 380 | 84% |
| Explain git rebase vs merge | 702 | 292 | 58% |
| Refactor callback to async/await | 387 | 301 | 22% |
| Architecture: microservices vs monolith | 446 | 310 | 30% |
| Review PR for security issues | 678 | 398 | 41% |
| Docker multi-stage build | 1042 | 290 | 72% |
| Debug PostgreSQL race condition | 1200 | 232 | 81% |
| Implement React error boundary | 3454 | 456 | 87% |
| **Average** | **1214** | **294** | **65%** |
<!-- BENCHMARK-TABLE-END -->

Raw data and reproduction script: [`benchmarks/`](./benchmarks/). Three-arm eval harness (baseline / terse / skill) lives in [`evals/`](./evals/) — Rocky is compared against `Answer concisely.`, not the verbose default, so the delta is honest.

**rocky-compress receipts** (real memory files):

| File | Original | Compressed | Saved |
|---|---:|---:|---:|
| `claude-md-preferences.md` | 706 | 285 | **59.6%** |
| `project-notes.md` | 1145 | 535 | **53.3%** |
| `claude-md-project.md` | 1122 | 636 | **43.3%** |
| `todo-list.md` | 627 | 388 | **38.1%** |
| `mixed-with-code.md` | 888 | 560 | **36.9%** |
| **Average** | **898** | **481** | **46%** |

> [!IMPORTANT]
> Rocky only affects output tokens — thinking/reasoning tokens untouched. Rocky does not make the brain smaller. Rocky makes the *mouth* smaller. Biggest win is **readability and speed**, cost savings a bonus. Good.

A March 2026 paper ["Brevity Constraints Reverse Performance Hierarchies in Language Models"](https://arxiv.org/abs/2604.00025) found that constraining large models to brief responses **improved accuracy by 26 points** on certain benchmarks. Verbose is not always better. Sometimes fewer words = more correct. Amaze.

## How It Works

1. Install drops the skill file into the agent.
2. Skill tells agent: drop filler, keep substance, use fragments, sound like Rocky.
3. For Claude Code, hook also writes a tiny flag file each session — agent sees flag, talks Rocky from message one. No need to say `/rocky`.
4. Stats command reads Claude Code session log, counts tokens saved, writes number to statusline.
5. Rocky-compress sub-skill rewrites memory files (CLAUDE.md, project notes) so each session starts with smaller context. Saves tokens forever, not just one reply.

Maintainer detail (hook architecture, file ownership, CI sync) lives in [CLAUDE.md](./CLAUDE.md).

## Lobster, Meet Rock 🦞 <img src="docs/assets/dancing-rock.svg" width="22" height="22" alt="rock"/>

[**OpenClaw**](https://openclaw.ai) is the self-host gateway. One box, many agents inside (Claude Code, Codex, Pi, OpenCode), wired to your Slack / Discord / iMessage / Telegram / whatever. Tagline: *"The lobster way."* Lobster strong. Lobster smart. Lobster also talks a lot.

Rocky teaches the lobster brevity — same canonical installer, scoped to one agent:

```bash
# macOS / Linux / WSL
curl -fsSL https://raw.githubusercontent.com/Theralley/rocky/main/install.sh | bash -s -- --only openclaw

# Windows (PowerShell): no Node? Install Node ≥18 first, then
npx -y github:Theralley/rocky -- --only openclaw
```

Two things happen, no more:

1. **Skill drop** at `~/.openclaw/workspace/skills/rocky/SKILL.md` — spec-correct frontmatter (`version`, `always: true`), discoverable by `openclaw skills list`. Skill does not auto-inject (OpenClaw loads skills on demand) — that is why we also do step 2.
2. **SOUL.md nudge.** Tiny marker-fenced block appended to `~/.openclaw/workspace/SOUL.md`. OpenClaw injects SOUL.md into *every* turn under "Project Context" (12K-per-file, 60K total — block well under). Lobster terse from message one. No `/rocky` per session. No nag.

```
~/.openclaw/workspace/
├── skills/rocky/SKILL.md      ← full ruleset, on-demand load
└── SOUL.md                    ← <!-- rocky-begin --> ... <!-- rocky-end -->
                                  ↑ auto-inject every turn
```

Custom workspace path? `OPENCLAW_WORKSPACE=/your/path` before the command. Uninstall: same one-liner with `--uninstall` — skill folder gone, SOUL.md block ripped out cleanly, your other workspace content stays untouched. Idempotent re-runs (frontmatter not double-prepended, marker block not duplicated).

Lobster claw still sharp. Lobster mouth now small. Brain still big. Good.

## About the name

Rocky is the alien engineer from Andy Weir's *Project Hail Mary*. He speaks in short, friendly, declarative sentences — drops articles, uses "Question." and "Good." and "Bad." as full thoughts, and gets to the point. Same energy fits perfectly when you want a coding agent to stop padding answers.

This project is a fork of [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) — same installer architecture, same hook system, same compression skills. Voice reskinned from caveman-grunt to Rocky-Eridian. Different brand, same engine, full credit to the original. License unchanged (MIT).

## Links

- [INSTALL.md](./INSTALL.md) — full install matrix, all flags, per-agent detail
- [CONTRIBUTING.md](./CONTRIBUTING.md) — how to send patch
- [CLAUDE.md](./CLAUDE.md) — maintainer guide (file ownership, hook architecture, CI)
- [docs/](./docs/) — extra guides (Windows install, etc.)
- [Issues](https://github.com/Theralley/rocky/issues) — bug, feature, weird behavior

## Star This Repo

Rocky saves you tokens, saves you money. Star costs zero. Fair trade. Good. ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=Theralley/rocky&type=Date)](https://star-history.com/#Theralley/rocky&Date)

## License

MIT — free like Eridian xenonite in open space.
