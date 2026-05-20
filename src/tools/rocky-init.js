#!/usr/bin/env node
// rocky init — drop the always-on rocky activation rule into a target
// repo for every IDE agent we support. Idempotent. Safe to re-run.
//
// Usage:
//   node src/tools/rocky-init.js [target-dir] [--dry-run] [--force] [--only <agent>]
//   curl -fsSL https://raw.githubusercontent.com/Theralley/rocky/main/src/tools/rocky-init.js | node - [args]
//
// Without args, runs in cwd. Generates the rule files for Cursor, Windsurf,
// Cline, Copilot, and AGENTS.md. Does NOT modify CLAUDE.md or compress
// existing memory files — that's the job of `/rocky:compress`.

const fs = require('fs');
const path = require('path');

// Embedded so the tool works standalone (npx-style) without the src/rules/ dir.
// Mirrors src/rules/rocky-activate.md verbatim — keep these in sync.
const RULE_BODY = `Respond terse like Rocky the Eridian. All technical substance stays. Only filler goes.

Rules:
- Drop: articles (a/an/the), filler (just/really/basically), pleasantries, hedging
- Fragments OK. Short synonyms. Technical terms exact. Code unchanged.
- Pattern: [thing] [action] [reason]. [next step].
- Not: "Sure! I'd be happy to help you with that."
- Yes: "Bug in auth middleware. Fix:"

Switch level: /rocky lite|full|ultra|wenyan
Stop: "stop rocky" or "normal mode"

Auto-Clarity: drop rocky for security warnings, irreversible actions, user confused. Resume after.

Boundaries: code/commits/PRs written normal.
`;

const SENTINEL = 'Respond terse like Rocky the Eridian';

// OpenClaw is a global workspace tool (not per-repo) and needs two write
// targets — a skill folder + a SOUL.md bootstrap block. The shared helper
// lives at bin/lib/openclaw.js; we require it lazily so rocky-init.js
// keeps working when run standalone (curl|node) without the helper on disk.
function loadOpenclawHelper() {
  try {
    return require(path.join(__dirname, '..', '..', 'bin', 'lib', 'openclaw.js'));
  } catch (_) { return null; }
}

const AGENTS = [
  { id: 'cursor',   file: '.cursor/rules/rocky.mdc',
    frontmatter: '---\ndescription: "Rocky mode — terse communication, ~75% fewer tokens, full technical accuracy"\nalwaysApply: true\n---\n\n',
    mode: 'replace' },
  { id: 'windsurf', file: '.windsurf/rules/rocky.md',
    frontmatter: '---\ntrigger: always_on\n---\n\n',
    mode: 'replace' },
  { id: 'cline',    file: '.clinerules/rocky.md',
    frontmatter: '',
    mode: 'replace' },
  { id: 'copilot',  file: '.github/copilot-instructions.md',
    frontmatter: '',
    mode: 'append' },
  { id: 'opencode', file: '.opencode/AGENTS.md',
    frontmatter: '',
    mode: 'append' },
  { id: 'agents',   file: 'AGENTS.md',
    frontmatter: '',
    mode: 'append' },
  // OpenClaw — global workspace install, not per-repo. The `installer`
  // callback escape hatch bypasses the file/frontmatter/mode triple and
  // hands off to the shared helper. `description` is what `--help` prints.
  { id: 'openclaw', description: '~/.openclaw/workspace/{skills/rocky/, SOUL.md}',
    installer: 'openclaw' },
];

function loadRuleBody() {
  // Prefer the in-repo source-of-truth when available.
  try {
    const local = path.join(__dirname, '..', 'rules', 'rocky-activate.md');
    if (fs.existsSync(local)) return fs.readFileSync(local, 'utf8').trimEnd() + '\n';
  } catch (e) {}
  return RULE_BODY;
}

function processAgent(agent, targetDir, ruleBody, opts) {
  if (agent.installer === 'openclaw') {
    return processOpenclaw(opts);
  }
  const fullPath = path.join(targetDir, agent.file);
  const exists = fs.existsSync(fullPath);

  if (!exists) {
    if (!opts.dryRun) {
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, agent.frontmatter + ruleBody, { mode: 0o644 });
    }
    return { status: 'added', label: '+' };
  }

  const existing = fs.readFileSync(fullPath, 'utf8');
  if (existing.includes(SENTINEL)) {
    return { status: 'skipped-already-installed', label: '=' };
  }

  if (agent.mode === 'append') {
    if (!opts.dryRun) {
      const sep = existing.endsWith('\n\n') ? '' : (existing.endsWith('\n') ? '\n' : '\n\n');
      fs.writeFileSync(fullPath, existing + sep + ruleBody, { mode: 0o644 });
    }
    return { status: 'appended', label: '~' };
  }

  if (opts.force) {
    if (!opts.dryRun) {
      fs.writeFileSync(fullPath, agent.frontmatter + ruleBody, { mode: 0o644 });
    }
    return { status: 'overwritten', label: '!' };
  }

  return { status: 'skipped-exists', label: '?' };
}

function processOpenclaw(opts) {
  const helper = loadOpenclawHelper();
  if (!helper) {
    return {
      status: 'unsupported-standalone',
      label: 'x',
      detail: '~/.openclaw/workspace (helper unavailable in standalone curl|node mode — use `npx -y github:Theralley/rocky -- --only openclaw`)',
    };
  }
  const repoRoot = path.resolve(__dirname, '..', '..');
  const log = {
    write: (_) => {},
    note: (_) => {},
    warn: (_) => {},
  };
  const r = helper.installOpenclaw({
    workspace: process.env.OPENCLAW_WORKSPACE || undefined,
    repoRoot,
    dryRun: opts.dryRun,
    force: opts.force,
    log,
  });
  if (!r.ok) {
    return { status: 'skipped-' + (r.reason || 'failed'), label: '?', detail: helper.resolveWorkspace ? helper.resolveWorkspace() : '~/.openclaw/workspace' };
  }
  if (r.dryRun) return { status: 'would-add', label: '+', detail: helper.resolveWorkspace() };
  return { status: 'installed', label: '+', detail: helper.resolveWorkspace() };
}

function parseArgs(argv) {
  const opts = { dryRun: false, force: false, only: null, target: process.cwd() };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--dry-run') opts.dryRun = true;
    else if (a === '--force' || a === '-f') opts.force = true;
    else if (a === '--only') { opts.only = argv[++i]; }
    else if (a === '-h' || a === '--help') opts.help = true;
    else if (!a.startsWith('-')) opts.target = path.resolve(a);
  }
  return opts;
}

function help() {
  console.log(`rocky init — drop always-on rocky rule into a target repo

Usage: rocky-init.js [target-dir] [--dry-run] [--force] [--only <agent>]

Defaults to current working directory. Idempotent — safe to re-run.

Targets installed:
${AGENTS.map(a => `  ${a.id.padEnd(10)} ${a.file || a.description || ''}`).join('\n')}

Flags:
  --dry-run   show what would change, do not write
  --force     overwrite existing rule files (default: skip)
  --only <id> only install for one agent (id from list above)
`);
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) { help(); return; }

  console.log(`🪨 rocky init — ${opts.target}${opts.dryRun ? ' (dry run)' : ''}\n`);

  const ruleBody = loadRuleBody();
  const counts = { added: 0, appended: 0, overwritten: 0, skipped: 0 };

  for (const agent of AGENTS) {
    if (opts.only && opts.only !== agent.id) continue;
    const result = processAgent(agent, opts.target, ruleBody, opts);
    const target = agent.file || result.detail || agent.description || agent.id;
    console.log(`  ${result.label} ${target} (${result.status})`);
    if (result.status === 'added' || result.status === 'installed' || result.status === 'would-add') counts.added++;
    else if (result.status === 'appended') counts.appended++;
    else if (result.status === 'overwritten') counts.overwritten++;
    else counts.skipped++;
  }

  console.log(`\n${counts.added} added, ${counts.appended} appended, ` +
              `${counts.overwritten} overwritten, ${counts.skipped} skipped`);
  if (opts.dryRun) console.log('(dry run — no files were written)');
}

if (require.main === module) main();

module.exports = { processAgent, loadRuleBody, AGENTS, SENTINEL, RULE_BODY };
