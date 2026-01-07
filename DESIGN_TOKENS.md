# Design Tokens - Jeff Halpin Portfolio

**Source:** Figma Design System
**File:** vFzy38cYS83Xj5CCqdTvi4 - Jeff Halpin - XD Portfolio Design System
**Last Extracted:** 2025-12-17

---

## Color System

### Primary Colors

| Token Name | Hex | RGB | Usage | Figma ID |
|------------|-----|-----|-------|----------|
| **Accent** | `#069D87` | rgb(6, 157, 135) | Primary accent color, links, CTAs | 8:62 |
| **Text/Primary** | `#171718` | rgb(23, 23, 24) | Body copy, headings | 9:68 |
| **Text/Secondary** | `#DFE0E2` | rgb(223, 224, 226) | Secondary text, muted content | 9:69 |
| **Surface/Default** | `#FFFEF9` | rgb(255, 254, 249) | Card backgrounds, surfaces | 9:72 |
| **Background/Base** | `#FFFFFF` | rgb(255, 255, 255) | Page background | 9:71 |

### Supporting Colors

| Token Name | Hex | RGB | Usage | Figma ID |
|------------|-----|-----|-------|----------|
| **mid-gray** | `#DFE0E2` | rgb(223, 224, 226) | Secondary text (alias) | 1:7 |
| **light-gray** | `#F6F6F6` | rgb(246, 246, 246) | Subtle borders | 1:8 |

---

## Typography

- **Font Family:** Lato (Google Fonts)
- **Weights:** 400 (Regular), 700 (Bold)

---

## Implementation

### Current Files Using Design Tokens

1. **index.html** - Portfolio homepage
   - Tailwind config extended with custom colors
   - CSS variables defined in `<style>` block
   - Colors: Lines 45-52 (Tailwind config), Lines 14-22 (CSS comments)

### Token Locations

| File | Format | Purpose |
|------|--------|---------|
| `color_styles.json` | JSON | Color style metadata from Figma |
| `figma_colors.json` | JSON | Full color data with hex + RGB values |
| `figma_summary.json` | JSON | Figma file structure and pages |
| `index.html` | HTML/CSS | Implemented design tokens |

---

## Sync Workflow

### Manual Process (Current)
1. Extract colors from Figma via API
2. Store in JSON files
3. Manually update `index.html` Tailwind config

### Automated Process (To Be Built)
1. Script fetches latest colors from Figma API
2. Generates CSS custom properties
3. Updates `index.html` automatically
4. Option to commit changes to git

---

## Design System Structure (Figma)

**Pages:**
- Foundations (0:1) - Color system, typography
- Components (12:211) - Reusable UI components
- Screens (1:3) - Page layouts
- Functional Annotations (43:78) - Design documentation
- Notes and Playground (10:87) - Exploration

---

## Notes

- **Last Modified in Figma:** 2025-12-17
- **File Location:** Currently in Drafts folder (may affect API access)
- **Token Format:** Using slash notation (e.g., `Text/Primary`, `Surface/Default`)
- **Missing Values:** Some color styles missing hex values in extraction (near-black, white, Aquamarine)

---

## Next Steps

1. ✅ Extract existing design tokens (complete)
2. ⏳ Resolve Figma API authentication
3. ⏳ Build automated sync script
4. ⏳ Document workflow for portfolio case study
