# Figma → Code Sync Workflow

This document explains the automated workflow for syncing design tokens from Figma to your portfolio website.

---

## Overview

The sync workflow keeps your code in sync with your Figma design system by:
1. Fetching the latest design tokens (colors) from Figma via API
2. Extracting and normalizing the data
3. Automatically updating `index.html` with the new tokens
4. Saving JSON files for reference and debugging

---

## Prerequisites

1. **Figma Personal Access Token**
   - Go to https://www.figma.com/settings
   - Scroll to "Personal access tokens"
   - Click "Generate new token"
   - Select these scopes:
     - Current user: read
     - File content: read
     - File metadata: read
     - Design systems library assets: read
   - Copy the token immediately (you won't see it again!)

2. **Node.js** installed on your system

3. **Figma File Access**
   - File must be in a team workspace (not Drafts)
   - You must have read access to the file

---

## Setup

1. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Add your Figma token:**
   Edit `.env` and replace `your_figma_token_here` with your actual token

3. **Verify file ID:**
   Make sure `FIGMA_FILE_ID` in `.env` matches your Figma file

---

## Usage

### Run the sync script:

```bash
# Using environment file
export $(cat .env | xargs) && node sync-design-tokens.js

# Or set token directly
FIGMA_TOKEN=your_token_here node sync-design-tokens.js
```

### What happens:

1. Script fetches file data from Figma
2. Extracts all color styles from the design system
3. Converts RGB values to hex codes
4. Updates these files:
   - `figma_data.json` - Full file data
   - `figma_colors.json` - Extracted color tokens
   - `index.html` - Updated Tailwind config and CSS comments

5. Prints a summary of all color tokens

---

## Output Files

| File | Purpose | When to Use |
|------|---------|-------------|
| `figma_data.json` | Complete Figma file structure | Debugging, understanding file organization |
| `figma_colors.json` | Extracted color tokens with hex + RGB | Reference, integration with other tools |
| `DESIGN_TOKENS.md` | Human-readable documentation | Onboarding, design system reference |
| `index.html` | Updated website code | Production use |

---

## Troubleshooting

### "Invalid token" error

**Causes:**
- Token expired or revoked
- Token copied incorrectly
- Missing required scopes

**Solutions:**
1. Generate a new token at https://www.figma.com/settings
2. Make sure to select all required scopes
3. Copy the token immediately (click "Copy the token" button)
4. Update `.env` with the new token

### "File not found" or "Forbidden" error

**Causes:**
- File is in Drafts folder
- No access to the file
- Wrong file ID

**Solutions:**
1. Move file from Drafts to a team project
2. Verify you have access to the file in Figma
3. Check that `FIGMA_FILE_ID` is correct

### No colors extracted

**Causes:**
- No color styles defined in Figma
- Styles are text/effect styles (not fills)
- Permission issue

**Solutions:**
1. Check Figma file has color styles in the "Local styles" panel
2. Ensure styles are fill/color styles (not text or effects)
3. Verify token has "Design systems library assets: read" scope

---

## Integration with Git

The sync script is designed to work with version control:

```bash
# Run sync
export $(cat .env | xargs) && node sync-design-tokens.js

# Review changes
git diff index.html

# Commit if everything looks good
git add index.html figma_colors.json
git commit -m "Update design tokens from Figma

🎨 Synced from Figma design system
- Updated color palette
- Refreshed design tokens

Generated with sync-design-tokens.js"

git push
```

---

## Portfolio Case Study

This workflow demonstrates:

1. **AI Tool Proficiency**
   - Using Claude Code for automation
   - Understanding of MCP (Model Context Protocol)

2. **API Integration**
   - Working with Figma REST API
   - Authentication and error handling
   - Data transformation

3. **Design Systems Knowledge**
   - Design tokens concept
   - Maintaining design-code consistency
   - Automated workflows

4. **Front-end Development**
   - Tailwind CSS configuration
   - CSS custom properties
   - Build tools and automation

5. **Problem Solving**
   - Bridging design and development
   - Creating efficient workflows
   - Documentation and maintainability

---

## Future Enhancements

Potential improvements to consider:

- [ ] Add typography token extraction
- [ ] Support spacing/sizing tokens
- [ ] Generate CSS custom properties (variables)
- [ ] Add component token extraction
- [ ] Create visual diff of token changes
- [ ] Set up CI/CD integration
- [ ] Add token validation and linting
- [ ] Support multiple Figma files

---

## Resources

- **Figma API Docs:** https://www.figma.com/developers/api
- **Design Tokens:** https://designtokens.org/
- **Tailwind CSS:** https://tailwindcss.com/docs/customizing-colors
- **Claude Code:** https://code.claude.com/

---

*Last Updated: 2026-01-06*
