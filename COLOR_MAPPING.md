# Figma Color Mapping

## Extracted Figma Colors

All colors have been extracted from the Figma API and applied to the HTML.

### Color Palette

| Figma Style | Hex Value | Usage | Applied In HTML |
|-------------|-----------|-------|----------------|
| **Accent** | `#069D87` | Primary accent color for interactive elements | Filter chips (active state), hover effects |
| **Surface/Default** | `#FFFEF9` | Main background surface | Body background, cards, footer |
| **Text/Primary** | `#171718` | Primary text color | Headings, body text |
| **Text/Secondary** | `#DFE0E2` | Secondary text and placeholder images | Image placeholders, secondary text |
| **mid-gray** | `#DFE0E2` | Same as Text/Secondary | Project card image backgrounds |
| **light-gray** | `#F6F6F6` | Subtle borders | Footer border, filter chip borders |
| **Background/Base** | `#FFFFFF` | Pure white background | Not currently used (can replace Surface/Default if needed) |
| **off-white** | `#FFFEF9` | Same as Surface/Default | - |

### Color Applications

#### CSS Custom Styles (lines 14-23)
- Documented all colors in CSS comments
- Custom filter chip hover: `rgba(6, 157, 135, 0.1)` - 10% opacity accent
- Custom filter chip active: `#069D87` solid accent

#### Tailwind Config (lines 42-60)
- Extended Tailwind theme with exact Figma colors
- `surface-default`: `#FFFEF9`
- `accent`: `#069D87`
- `text-primary`: `#171718`
- `text-secondary`: `#DFE0E2`
- `mid-gray`: `#DFE0E2`
- `light-gray`: `#F6F6F6`
- `bg-base`: `#FFFFFF`

#### HTML Elements
- **Body** (line 62): `bg-[#FFFEF9]`
- **Header** (line 71): `bg-[#FFFEF9]`, `border-neutral-200`
- **Profile Image** (line 118): `bg-[#DFE0E2]`
- **Filter Chips** (lines 137-145): `border-light-gray`, active uses `#069D87`
- **Project Cards** (lines 165, 175, 182, 189): All image placeholders use `bg-[#DFE0E2]`
- **Footer** (line 204): `bg-[#FFFEF9]`, `border-[#F6F6F6]`

### Changes Made

1. **Corrected Accent Color**: Changed from `#079E87` to exact Figma value `#069D87`
2. **Updated mid-gray**: Changed from `#DFE1E3` to exact Figma value `#DFE0E2`
3. **Updated light-gray**: Changed from `#F7F7F7` to exact Figma value `#F6F6F6`
4. **Standardized placeholders**: Changed `#D9D9D9` to Figma's `#DFE0E2` (Text/Secondary)

## Verification

All color values now match exactly with the Figma design system as extracted via the Figma API.

**Extraction Method**: Python script (`extract_colors.py`) using Figma API data
**Source File**: `figma_data.json` (209KB)
**Color Data**: `figma_colors.json`
