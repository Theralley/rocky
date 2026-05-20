# Rocky Hooks

These hooks are **bundled with the rocky plugin** and activate automatically when the plugin is installed. No manual setup required.

If you installed rocky standalone (without the plugin), the unified Node installer at `bin/install.js` wires them into your `settings.json` for you — run `node bin/install.js --only claude` from a clone, or `npx -y github:Theralley/rocky-skill -- --only claude` for the curl-pipe path.

## What's Included

### `rocky-activate.js` — SessionStart hook

- Runs once when Claude Code starts
- Writes `full` to `$CLAUDE_CONFIG_DIR/.rocky-active` (default `~/.claude/.rocky-active`) via the symlink-safe `safeWriteFlag` helper
- Emits rocky rules as hidden SessionStart context
- Detects missing statusline config and emits setup nudge (Claude will offer to help)

### `rocky-mode-tracker.js` — UserPromptSubmit hook

- Fires on every user prompt, checks for `/rocky` commands and natural-language activation/deactivation phrases ("talk like rocky", "stop rocky", "normal mode")
- Writes the active mode to the flag file when a rocky command is detected; deletes it on deactivation
- Emits a small per-turn reinforcement reminder when the flag is set to a non-independent mode (`lite`/`full`/`ultra`/`wenyan*`)
- Supports: `lite`, `full`, `ultra`, `wenyan`, `wenyan-lite`, `wenyan-full`, `wenyan-ultra`, `commit`, `review`, `compress`

### `rocky-statusline.sh` / `rocky-statusline.ps1` — Statusline badge script

- Reads `$CLAUDE_CONFIG_DIR/.rocky-active` (default `~/.claude/.rocky-active`) and outputs a colored badge
- Shows `[ROCKY]`, `[ROCKY:ULTRA]`, `[ROCKY:WENYAN]`, etc.
- Appends the lifetime savings suffix `🪨 12.4k` from `$CLAUDE_CONFIG_DIR/.rocky-statusline-suffix` (written by `rocky-stats.js` on each `/rocky-stats` run; absent until the first run, so fresh installs render no fake number). Opt out with `ROCKY_STATUSLINE_SAVINGS=0`.

## Statusline Badge

The statusline badge shows which rocky mode is active directly in your Claude Code status bar.

**Plugin users:** If you do not already have a `statusLine` configured, Claude will detect that on your first session after install and offer to set it up for you. Accept and you're done.

If you already have a custom statusline, rocky does not overwrite it and Claude stays quiet. Add the badge snippet to your existing script instead.

**Standalone users:** the unified installer (`bin/install.js`, invoked by the `install.sh` / `install.ps1` shims at the repo root) wires the statusline automatically if you do not already have a custom statusline. If you do, the installer leaves it alone and prints the merge note.

**Manual setup:** If you need to configure it yourself, add one of these to `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "bash /path/to/rocky-statusline.sh"
  }
}
```

```json
{
  "statusLine": {
    "type": "command",
    "command": "powershell -ExecutionPolicy Bypass -File C:\\path\\to\\rocky-statusline.ps1"
  }
}
```

Replace the path with the actual script location (e.g. `~/.claude/hooks/` for standalone installs, or the plugin install directory for plugin installs).

**Custom statusline:** If you already have a statusline script, add this snippet to it:

```bash
rocky_text=""
rocky_flag="${CLAUDE_CONFIG_DIR:-$HOME/.claude}/.rocky-active"
if [ -f "$rocky_flag" ]; then
  rocky_mode=$(cat "$rocky_flag" 2>/dev/null)
  if [ "$rocky_mode" = "full" ] || [ -z "$rocky_mode" ]; then
    rocky_text=$'\033[38;5;172m[ROCKY]\033[0m'
  else
    rocky_suffix=$(echo "$rocky_mode" | tr '[:lower:]' '[:upper:]')
    rocky_text=$'\033[38;5;172m[ROCKY:'"${rocky_suffix}"$']\033[0m'
  fi
fi
```

Badge examples:
- `/rocky` → `[ROCKY]`
- `/rocky ultra` → `[ROCKY:ULTRA]`
- `/rocky wenyan` → `[ROCKY:WENYAN]`
- `/rocky-commit` → `[ROCKY:COMMIT]`
- `/rocky-review` → `[ROCKY:REVIEW]`

## How It Works

```
SessionStart hook ──writes "full"──▶ $CLAUDE_CONFIG_DIR/.rocky-active ◀──writes mode── UserPromptSubmit hook
                                              │
                                           reads
                                              ▼
                                     Statusline script
                                    [ROCKY:ULTRA] │ ...
```

SessionStart stdout is injected as hidden system context — Claude sees it, users don't. The statusline runs as a separate process. The flag file is the bridge.

## Uninstall

If installed via plugin: disable the plugin — hooks deactivate automatically.

If installed via the standalone Node installer:
```bash
npx -y github:Theralley/rocky-skill -- --uninstall
# or, from a clone:
node bin/install.js --uninstall
```

Or manually:
1. Remove the rocky hook files from `$CLAUDE_CONFIG_DIR/hooks/` (default `~/.claude/hooks/`): `rocky-activate.js`, `rocky-mode-tracker.js`, `rocky-stats.js`, `rocky-config.js`, and `rocky-statusline.{sh,ps1}`.
2. Remove the SessionStart, UserPromptSubmit, and statusLine entries from `$CLAUDE_CONFIG_DIR/settings.json`.
3. Delete `$CLAUDE_CONFIG_DIR/.rocky-active` (and `$CLAUDE_CONFIG_DIR/.rocky-statusline-suffix` if you ran `/rocky-stats`).
