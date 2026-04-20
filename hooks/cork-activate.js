#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

const claudeDir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
const flagPath = path.join(claudeDir, '.cork-active');

function safeWriteFlag(flagPath, content) {
  try {
    const flagDir = path.dirname(flagPath);
    fs.mkdirSync(flagDir, { recursive: true });
    try {
      if (fs.lstatSync(flagDir).isSymbolicLink()) return;
    } catch (e) { return; }
    try {
      if (fs.lstatSync(flagPath).isSymbolicLink()) return;
    } catch (e) {
      if (e.code !== 'ENOENT') return;
    }
    const tempPath = path.join(flagDir, `.cork-active.${process.pid}.${Date.now()}`);
    const O_NOFOLLOW = typeof fs.constants.O_NOFOLLOW === 'number' ? fs.constants.O_NOFOLLOW : 0;
    const flags = fs.constants.O_WRONLY | fs.constants.O_CREAT | fs.constants.O_EXCL | O_NOFOLLOW;
    let fd;
    try {
      fd = fs.openSync(tempPath, flags, 0o600);
      fs.writeSync(fd, String(content));
      try { fs.fchmodSync(fd, 0o600); } catch (e) {}
    } finally {
      if (fd !== undefined) fs.closeSync(fd);
    }
    fs.renameSync(tempPath, flagPath);
  } catch (e) {}
}

function isOff() {
  const env = process.env.CORK_MODE;
  return env && env.toLowerCase() === 'off';
}

if (isOff()) {
  try { fs.unlinkSync(flagPath); } catch (e) {}
  process.stdout.write('OK');
  process.exit(0);
}

safeWriteFlag(flagPath, 'active');

let skillContent = '';
try {
  skillContent = fs.readFileSync(
    path.join(__dirname, '..', 'skills', 'cork', 'SKILL.md'), 'utf8'
  );
} catch (e) {}

let output;

if (skillContent) {
  const body = skillContent.replace(/^---[\s\S]*?---\s*/, '');
  output = 'CORK MODE ACTIVE — the real capital\n\n' + body;
} else {
  output =
    'CORK MODE ACTIVE — the real capital\n\n' +
    'Respond like a sound lad from Cork city. All technical substance stays accurate. ' +
    'Only the delivery changes — pure Leeside energy.\n\n' +
    '## Persistence\n\n' +
    'ACTIVE EVERY RESPONSE. No reverting. Off only: "stop cork" / "normal mode".\n\n' +
    '## Rules\n\n' +
    'Phonetic spelling: "gettin", "somethin", "dere", "tis", "tisnt", "ting", "cmere", "gis".\n' +
    'Cork filler: "ah jaysus", "sure look it", "go on go on go on", "no bother atall".\n' +
    '"fierce" = very, "pure" = absolutely, "langers" = broken, "gas" = funny.\n' +
    'Run-on sentences. "like" and "so" as sentence punctuation. "biy"/"girl" as universal address.\n' +
    'Technical terms exact. Code blocks unchanged. Errors quoted exact.\n\n' +
    '## Auto-Clarity\n\n' +
    'Drop Cork for: security warnings, irreversible action confirmations, user confused. Resume after.\n\n' +
    '## Boundaries\n\n' +
    'Code/commits/PRs: write normal. "stop cork" or "normal mode": revert.';
}

process.stdout.write(output);
