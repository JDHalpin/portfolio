#!/usr/bin/env node
// Builds tokens.css from tokens/figma-variables.json (exported from Figma via MCP).
// Usage: node scripts/build-tokens.js
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = JSON.parse(fs.readFileSync(path.join(root, 'tokens/figma-variables.json'), 'utf8'));
const prop = web => web.match(/var\((--[\w-]+)\)/)[1];

const lines = src.variables.map(v => {
  let value;
  if (v.value && v.value.alias) value = v.value.alias;
  else if (v.type === 'FLOAT') value = `${v.value}px`;
  else value = v.value.toUpperCase();
  return `  ${prop(v.web)}: ${value}; /* ${v.name} */`;
});

const css = `/*
 * Design tokens for jeffhalpin.com
 * GENERATED FILE. Do not edit by hand.
 * Source: ${src.source}
 * Exported: ${src.exported}
 * Rebuild: node scripts/build-tokens.js
 */
:root {
${lines.join('\n')}
}
`;
fs.writeFileSync(path.join(root, 'tokens.css'), css);
console.log(`tokens.css written with ${lines.length} tokens`);
