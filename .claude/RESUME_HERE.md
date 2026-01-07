# 👋 RESTART RECOVERY - READ THIS FIRST

**If you're a new Claude Code session, start here!**

---

## 📖 Read These Files In Order

1. **This file** - Quick overview (you are here)
2. **`.claude/CONTEXT.md`** - Full project context, user background, and decision history
3. **`README.md`** - Current project state
4. **`QUICK_START.md`** - How to use the sync tool

---

## ⚡ Quick Summary

### What This Project Is

Two GitHub repositories working together:

1. **Portfolio** (`JDHalpin/portfolio`) - Jeff's UX portfolio website
2. **Figma Design Tokens** (`JDHalpin/figma-design-tokens`) - Reusable sync tool

### What We Just Built

An automated workflow that syncs design tokens from Figma → Code:
- ✅ 13 color tokens extracted from Figma
- ✅ Automatic Tailwind CSS updates
- ✅ Both repos pushed to GitHub
- ✅ Comprehensive documentation

### Current Status: ✅ WORKING

Both repos are live and functional. The sync tool successfully extracts all colors from Jeff's published Figma library and updates the portfolio website.

---

## 👤 About The User (Jeff)

**Background:**
- UX professional with 15 years experience
- Learning front-end development and AI tools
- Building portfolio for job applications
- Wants to demonstrate technical growth

**Communication Style:**
- Appreciates clear, patient explanations
- Wants to understand the "why" behind decisions
- Values simple, working solutions
- Asks good questions about architecture and naming

**Important:** Read `.claude/CONTEXT.md` for full details on Jeff's preferences and learning style.

---

## 🔑 Key Technical Details

### Authentication Discovery

**CRITICAL:** Figma API requires `X-Figma-Token` header (NOT `Authorization: Bearer`)

```javascript
// ✅ Correct
headers: { 'X-Figma-Token': token }

// ❌ Wrong
headers: { 'Authorization': `Bearer ${token}` }
```

This is fixed in both `sync-design-tokens.js` and `.mcp.json`.

### Published Library

The Figma library is now **published**, which means:
- All 13 color styles are available via API
- Uses `/v1/files/:id/styles` endpoint
- Falls back to document parsing if needed

### Repositories

**Portfolio:** https://github.com/JDHalpin/portfolio
- Main portfolio website
- Contains local copy of sync tool
- 3 commits pushed

**Sync Tool:** https://github.com/JDHalpin/figma-design-tokens
- Standalone, reusable tool
- Full documentation
- 1 initial release commit

---

## 📊 What's Working

### Figma → Code Sync
```bash
# From portfolio directory
export $(cat .env | xargs) && node sync-design-tokens.js
```

**Output:** 13 color tokens
- Accent: #079E87
- Text/Primary: #181818
- Surface/Default: #FFFEF9
- Background/Base: #FFFFFF
- And 9 more...

### Files Updated Automatically
- `index.html` - Tailwind config and CSS comments
- `figma_colors.json` - Color data with hex + RGB
- `figma_data.json` - Full Figma file structure

---

## 🗺️ Potential Next Steps

**Not a todo list - just possibilities:**

### Portfolio
- Add case study page content
- Deploy to GitHub Pages/Netlify
- Add project screenshots
- Create About page content

### Sync Tool
- Extract typography tokens
- Support more output formats
- Publish to npm
- Add visual diff tool

### Documentation
- Create video walkthrough
- Write blog post
- Add to LinkedIn
- Create case study about the tool itself

**Note:** These are options, not commitments. Always ask Jeff what he wants to work on next.

---

## 🎯 How to Resume Work

### Starting a New Session

**Ask Jeff what he wants to work on:**
```
"What would you like to work on today?
- Portfolio content (case studies, images)?
- Sync tool enhancements (typography, spacing)?
- Deployment (GitHub Pages, custom domain)?
- Something else?"
```

### If Context Is Unclear

**Read the docs:**
- `.claude/CONTEXT.md` - Deep dive on everything
- `QUICK_START.md` - Tool usage
- `README.md` - Project overview

### If Making Architectural Decisions

**Always ask first.** Jeff values:
- Understanding the tradeoffs
- Making informed decisions
- Simple, maintainable solutions

Use `AskUserQuestion` tool to present options.

---

## ⚠️ Important Reminders

### What NOT to Do
- ❌ Over-engineer solutions
- ❌ Assume technical knowledge
- ❌ Make decisions without asking
- ❌ Use the `pow` or `pow-importer` projects (separate work)

### What TO Do
- ✅ Explain clearly and patiently
- ✅ Ask questions when multiple approaches exist
- ✅ Keep solutions simple
- ✅ Document decisions in `.claude/CONTEXT.md`

---

## 📍 Key Locations

**Working Directory:** `/Users/jeffhalpin/Projects/portfolio/`

**Related Directories:**
- `/Users/jeffhalpin/Projects/figma-design-tokens/` - Standalone tool repo
- `/Users/jeffhalpin/Projects/pow/` - Separate project (not current focus)
- `/Users/jeffhalpin/Projects/pow-importer/` - Separate project (not current focus)

**Figma Details:**
- File ID: `vFzy38cYS83Xj5CCqdTvi4`
- File: "Jeff Halpin - XD Portfolio Design System"
- Token: Stored in `.env` (gitignored)
- Library: Published (13 colors available)

---

## 🔗 Quick Links

- **Portfolio Repo:** https://github.com/JDHalpin/portfolio
- **Sync Tool Repo:** https://github.com/JDHalpin/figma-design-tokens
- **Figma Settings:** https://www.figma.com/settings
- **Full Context Doc:** `.claude/CONTEXT.md` ← **Read this for deep understanding**

---

## 📝 Last Session Summary

**Date:** 2026-01-06

**What We Did:**
1. ✅ Built Figma design token sync tool
2. ✅ Fixed API authentication (X-Figma-Token discovery)
3. ✅ Published Figma library (13 colors now available)
4. ✅ Split into two repos (portfolio + tool)
5. ✅ Pushed both repos to GitHub
6. ✅ Created comprehensive documentation

**Status:** Both repos are working and live on GitHub. Ready for next steps.

**Next Session:** Ask Jeff what he wants to work on next!

---

**Remember:** Read `.claude/CONTEXT.md` for the full story. This file is just the quick start.

---

Built with [Claude Code](https://claude.com/claude-code)
