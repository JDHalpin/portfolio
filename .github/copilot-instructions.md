# Jeff Halpin Portfolio - AI Coding Instructions

## Project Overview
Single-file HTML portfolio with Tailwind CSS (CDN), featuring a carousel, project cards, and responsive navigation. This is a static site showcasing UX/Product Design work with a Figma-derived design system.

## Architecture

### Single-File Structure
- **No build process**: Everything lives in `index.html` (419 lines)
- **Vanilla JavaScript**: Direct DOM manipulation, no frameworks
- **CDN Dependencies**: Tailwind CSS, Google Fonts (Lato, Playfair Display)

### Key Components (all in index.html)
1. **Sticky Header**: Hamburger mobile menu + desktop nav links
2. **Hero Carousel**: Auto-rotating 3-slide carousel (5s intervals) with manual navigation dots
3. **Project Cards Grid**: 2-column desktop, 1-column mobile layout
4. **Mobile Menu Overlay**: Full-screen sidebar with backdrop

## Design System (Figma-Extracted)

### Color Palette
Use Tailwind extended colors defined in `tailwind.config`:
- **off-white** (`#FFFEF9`): Primary background
- **near-black** (`#181818`): Primary text
- **accent** (`#079E87`): Hover states, active indicators
- **aquamarine** (`#61EDD8`): Secondary accent
- **mid-gray** (`#DFE1E3`): Inactive carousel dots, secondary text
- **border-subtle** (`#F7F7F7`): Card borders

### Typography
- **Headings**: `font-playfair` (Playfair Display serif)
- **Body**: `font-lato` (Lato sans-serif)
- **Sizes**: Hero `text-2xl`, project cards `text-2xl`, body `text-sm`/`text-base`

## Critical Patterns

### Card Navigation System
Project cards use `data-card` attributes linked to `cardLinks` object:
```javascript
const cardLinks = { '1': 'ux-methodology.html', '2': 'eyedar.html', ... }
```
**Important**: Missing closing quote on line ~360 (`'3'experiential_design.html'`) - syntax error

### Carousel Implementation
- Auto-advance every 5s via `setInterval`
- Pauses on hover, restarts after manual dot navigation
- Each slide has `data-card` for click-through navigation
- Opacity-based transitions (not transform/translate)

### Mobile Menu Behavior
- Prevents body scroll when open (`overflow-hidden`)
- Closes on: close button, backdrop click, nav link click
- Only visible `<md` breakpoint

## Common Modifications

### Adding Project Cards
1. Duplicate `<article data-card="N">` in grid
2. Update image path, heading, description
3. Add entry to `cardLinks` object
4. Ensure card number is sequential

### Carousel Slides
1. Add `<div class="carousel-slide ...">` with unique `data-card`
2. Add corresponding `<button class="carousel-dot">` with `data-slide="N"`
3. Update `cardLinks` for click-through destination

### Color Adjustments
Modify `tailwind.config.theme.extend.colors` object (lines 48-63)
- Colors are referenced via Tailwind classes like `bg-accent`, `text-near-black`
- Also update CSS comment block (lines 15-28) for documentation

## Commented-Out Features
- **Filter chips** (lines ~125-140): Category filtering system, ready to implement
- **Project Card 3** (lines ~153-157): Fasenra case study, currently hidden

## Development Notes
- **No hot-reload**: Static HTML, manual browser refresh required
- **Image paths**: Relative `images/` directory assumed
- **External pages**: Navigation assumes sibling HTML files (`about.html`, `contact.html`, etc.)
- **Responsive**: Mobile-first with `md:` breakpoint for desktop (768px+)

## Common Pitfalls
1. Forgetting to update both carousel `data-card` AND `cardLinks` when adding projects
2. Breaking Tailwind config JSON syntax (watch trailing commas)
3. Mobile menu z-index conflicts (currently `z-50`, header is `z-40`)
4. Carousel timer not restarting after interactions

## External Dependencies
- Tailwind CSS 3.x (CDN, no config file)
- Google Fonts API (Lato 400/700, Playfair Display 400/700)
- No analytics, no third-party scripts beyond above
