# Quick Start - Figma Design Token Sync

## ✅ Setup Complete!

Your Figma → Code sync workflow is now working! Here's everything that's been configured:

---

## 🎯 What's Working

1. ✅ Figma API authentication configured
2. ✅ Sync script extracting colors from your design system
3. ✅ Automatic updates to `index.html` Tailwind config
4. ✅ `.env` file created with your token (gitignored)
5. ✅ MCP configuration updated (`.mcp.json`)

---

## 🚀 How to Use

### Run the sync script:

```bash
# Easy way (uses .env file)
export $(cat .env | xargs) && node sync-design-tokens.js
```

### What it does:

1. Fetches latest design from Figma
2. Extracts all color tokens
3. Updates `index.html` automatically
4. Saves JSON files for reference

---

## 📊 Currently Synced Colors

The script extracted **7 colors** from your Figma file:

| Name | Hex | Usage |
|------|-----|-------|
| Accent | `#079E87` | Links, CTAs |
| Background/Base | `#FFFFFF` | Page background |
| light-gray | `#F7F7F7` | Borders |
| mid-gray | `#DFE1E3` | Secondary text |
| off-white | `#FFFEF9` | Card backgrounds |
| Surface/Default | `#FFFEF9` | Surface color |
| Text/Secondary | `#DFE1E3` | Secondary text |

**Missing:** Text/Primary (near-black)
**Why:** The script only extracts colors that are applied to elements in your Figma document.

---

## 🔧 To Get All Colors

**Option 1: Publish the Library (Recommended)**
1. In Figma, right-click your file
2. Select "Publish styles and components"
3. Publish your color styles
4. Run the sync script again

**Option 2: Apply All Colors**
- Make sure each color style is applied to at least one element in your Figma file

---

## 🎨 Key Files

| File | Purpose |
|------|---------|
| `sync-design-tokens.js` | Main sync script |
| `.env` | Your Figma token (keep secret!) |
| `.mcp.json` | MCP server config for Claude Code |
| `figma_colors.json` | Extracted color data |
| `DESIGN_TOKENS.md` | Full design system documentation |
| `SYNC_WORKFLOW.md` | Complete workflow guide |

---

## ⚙️ Important Discovery

The Figma API requires the `X-Figma-Token` header, NOT `Authorization: Bearer`.

This has been fixed in:
- ✅ `sync-design-tokens.js`
- ✅ `.mcp.json`

---

## 📝 Next Steps for Portfolio

This workflow demonstrates:
- API integration skills
- Design system knowledge
- Automation and tooling
- Documentation abilities
- Problem-solving (we debugged the auth issue!)

Document this process as a case study showing:
1. The problem (keeping design and code in sync)
2. The solution (automated sync script)
3. The technical implementation
4. The value delivered

---

## 🐛 Troubleshooting

If the sync fails:
- Check your token hasn't expired (Figma settings)
- Verify file is in team folder (not Drafts)
- Ensure `.env` file exists and has correct token
- Run with `node sync-design-tokens.js` to see error details

---

**Last Updated:** 2026-01-06
**Status:** ✅ Working!
