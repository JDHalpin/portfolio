# jeffhalpin.com

Portfolio site for Jeff Halpin, product designer and design engineer. Live at [jeffhalpin.com](https://jeffhalpin.com).

The site is plain HTML with Tailwind CSS from the CDN, deployed by GitHub Pages from `main`. Its colors and spacing come from Figma variables through a small token pipeline, and every push runs design checks. That pipeline is the part worth reading, and it is described below.

Case study: [Making My Design System Legible to AI](https://jeffhalpin.com/Design-system-legible-to-AI.html)

## The token pipeline

```
Figma variables  ->  tokens/figma-variables.json  ->  tokens.css  ->  every page
   (source)            (export, via Figma MCP)      (generated)    (Tailwind maps to var())

                       scripts/lint-design.js runs on every push
```

| File | Role |
| --- | --- |
| `tokens/figma-variables.json` | Snapshot of the Figma variables: name, type, web code syntax, and value or alias. |
| `scripts/build-tokens.js` | Turns the JSON into `tokens.css`. No dependencies. |
| `tokens.css` | Generated CSS custom properties. Never edited by hand. |
| `scripts/lint-design.js` | The design checks. Exits 1 on any failure. |
| `.github/workflows/design-lint.yml` | Runs the checks on every push to `main` and on pull requests. |

### 1. Figma is the source

Every variable in Figma has its **web code syntax** filled in, for example `space/16` has `var(--space-16)`. That field is the contract. The build script derives the CSS property name from it, and Figma's Dev Mode and MCP server hand the same name to anyone, or any agent, inspecting a design.

Aliases are kept as aliases. `button/default` points at `accent` in Figma, so in CSS it is `var(--color-accent)`, not a copied hex value. Changing `accent` once updates every button.

### 2. Export

There is no export script. The export is done by asking Claude, with the Figma MCP server connected, to read the local variables and rewrite `tokens/figma-variables.json` in the same shape. Each entry looks like this:

```json
{"collection":"Colors","name":"button/default","type":"COLOR","web":"var(--color-button-default)","value":{"alias":"var(--color-accent)"}}
```

This is a deliberate choice. A person asks for the export and reviews the diff before committing, so no design change reaches the site unseen. The tradeoff is that the export is manual.

### 3. Build

```bash
node scripts/build-tokens.js
```

Writes `tokens.css`:

```css
:root {
  --color-accent: #068572; /* accent */
  --color-button-default: var(--color-accent); /* button/default */
  --space-16: 16px; /* space/16 */
}
```

Number variables become `px`. Colors are uppercased. Aliases are written as `var()` references.

### 4. Use

Each page loads `tokens.css` and maps Tailwind's color names to the custom properties in its `tailwind.config` block:

```js
colors: {
  'accent': 'var(--color-accent)',
  'button-default': 'var(--color-button-default)',
}
```

Markup then uses ordinary classes, such as `bg-button-default text-text-on-accent`. No page contains a hex value.

### 5. Check

```bash
node scripts/lint-design.js
```

Three checks, all of which must pass:

1. **No hardcoded colors.** Any hex or `rgb()` value in a `.html` file fails, with the file and line.
2. **No hand edits to tokens.** It rebuilds `tokens.css` in memory and fails if the file on disk differs.
3. **Contrast holds.** It resolves aliases and checks each listed text and background pair against WCAG AA (4.5:1). The pairs are in the `PAIRS` array.

The workflow currently reports failures without blocking the Pages deploy.

## Adapting it

Requirements: Node 18 or later, and Figma variables with web code syntax set.

1. Copy `scripts/build-tokens.js`, `scripts/lint-design.js` and the workflow file.
2. Export your variables to `tokens/figma-variables.json` in the shape shown above.
3. Edit the header text in `buildCss()` and the `PAIRS` list in `lint-design.js` to match your tokens.
4. Run the build, link `tokens.css` in your pages, and point your Tailwind (or plain CSS) at the custom properties.

## Local preview

```bash
python3 -m http.server 8000
```

## History

Phase I was a Figma REST API script that synced color styles into one page's Tailwind config. It is documented at [jeffhalpin.com/figma_sync.html](https://jeffhalpin.com/figma_sync.html) and in [figma-design-tokens](https://github.com/JDHalpin/figma-design-tokens). The pipeline above replaced it.

## License

© 2026 Jeff Halpin. All rights reserved.
