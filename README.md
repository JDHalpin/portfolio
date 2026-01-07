# Jeff Halpin - Portfolio

UX/Product Design Portfolio showcasing 15 years of experience in user experience and front-end development.

## About

This portfolio demonstrates:
- **UX Design** - User research, wireframing, prototyping, and interaction design
- **Front-end Development** - HTML, CSS, JavaScript, Tailwind CSS
- **Design Systems** - Automated design token synchronization from Figma
- **AI Tool Proficiency** - Built with Claude Code and modern development workflows

## Features

### Automated Design Token Sync

This portfolio uses an automated workflow to keep the design system in sync with Figma:
- 🎨 **Design tokens** extracted directly from Figma design system
- 🔄 **Auto-updates** Tailwind CSS configuration
- 📦 **13 color tokens** synced from published Figma library

**Tool:** [figma-design-tokens](https://github.com/JDHalpin/figma-design-tokens) - Reusable sync tool for any Figma file

### Responsive Design

- Mobile-first approach
- Hamburger navigation on mobile
- Desktop navigation bar
- Optimized for all screen sizes

### Design System

**Colors:**
- Accent: `#079E87`
- Text/Primary: `#181818`
- Surface/Default: `#FFFEF9`
- Background/Base: `#FFFFFF`
- And 9 more semantic color tokens

**Typography:**
- Font: Lato (Google Fonts)
- Weights: 400 (Regular), 700 (Bold)

## Project Structure

```
portfolio/
├── index.html              # Portfolio homepage
├── about.html              # About page
├── case-study-*.html       # Case study pages
├── sync-design-tokens.js   # Figma sync tool (local copy)
├── QUICK_START.md          # Quick reference
├── DESIGN_TOKENS.md        # Design system docs
└── .env                    # Figma credentials (not committed)
```

## Development

### Sync Design Tokens from Figma

```bash
# Run the sync script
export $(cat .env | xargs) && node sync-design-tokens.js
```

This fetches the latest colors from Figma and updates `index.html` automatically.

**See:** [figma-design-tokens](https://github.com/JDHalpin/figma-design-tokens) for the standalone tool.

### Local Development

Simply open `index.html` in a browser or use a local server:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve
```

## Tech Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **JavaScript** - Vanilla JS for interactions
- **Figma API** - Design token extraction
- **Node.js** - Automation scripts

## Case Studies

This portfolio includes case studies for:
- Fasenra HCP Website Redesign
- Invitae Genetic Testing Registration
- Pradaxa AR Experience
- Toujeo Dosing Calculator
- And more...

## Links

- **Portfolio:** [View Live Site](#) *(Add your deployed URL)*
- **GitHub:** [@JDHalpin](https://github.com/JDHalpin)
- **Sync Tool:** [figma-design-tokens](https://github.com/JDHalpin/figma-design-tokens)

## Built With

- [Tailwind CSS](https://tailwindcss.com/)
- [Figma](https://www.figma.com/)
- [Claude Code](https://claude.com/claude-code)
- [Lato Font](https://fonts.google.com/specimen/Lato)

## License

© 2026 Jeff Halpin. All rights reserved.

---

Built with [Claude Code](https://claude.com/claude-code)
