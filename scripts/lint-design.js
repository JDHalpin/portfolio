#!/usr/bin/env node
// Design system checks for jeffhalpin.com. Exits 1 on any failure.
// Usage: node scripts/lint-design.js
const fs = require('fs');
const path = require('path');
const { buildCss, variables } = require('./build-tokens');

const root = path.join(__dirname, '..');
const failures = [];

// 1. No hardcoded colors in pages. Colors must come from tokens.css.
const COLOR = /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?![0-9a-fA-F])|rgba?\(/g;
for (const file of fs.readdirSync(root).filter(f => f.endsWith('.html'))) {
  fs.readFileSync(path.join(root, file), 'utf8').split('\n').forEach((line, i) => {
    for (const m of line.matchAll(COLOR)) {
      failures.push(`[hardcoded-color] ${file}:${i + 1} "${m[0]}" (use a token from tokens.css)`);
    }
  });
}

// 2. tokens.css must match what the Figma export generates (no hand edits).
const onDisk = fs.readFileSync(path.join(root, 'tokens.css'), 'utf8');
if (onDisk !== buildCss()) {
  failures.push('[token-drift] tokens.css differs from tokens/figma-variables.json. Run: node scripts/build-tokens.js');
}

// 3. Text/background pairs must meet WCAG AA (4.5:1 for normal text).
const byWeb = Object.fromEntries(variables.map(v => [v.web, v]));
const resolve = web => { let v = byWeb[web]; while (v.value.alias) v = byWeb[v.value.alias]; return v.value; };
const lum = hex => {
  const c = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(x => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const PAIRS = [
  ['text-on-accent', 'button-default'],
  ['text-on-accent', 'button-hover'],
  ['text-on-accent', 'button-pressed'],
  ['text-on-accent', 'accent'],
  ['accent', 'surface-default'],
  ['text-primary', 'surface-default'],
];
for (const [fg, bg] of PAIRS) {
  const r = ratio(resolve(`var(--color-${fg})`), resolve(`var(--color-${bg})`));
  const line = `${fg} on ${bg}: ${r.toFixed(2)}:1`;
  if (r < 4.5) failures.push(`[contrast] ${line} (needs 4.5:1)`);
  else console.log(`ok  ${line}`);
}

if (failures.length) {
  console.error(`\n${failures.length} design check failure(s):`);
  failures.forEach(f => console.error(`  ${f}`));
  process.exit(1);
}
console.log('\nAll design checks passed.');
