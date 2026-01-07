# Project Context - Portfolio & Figma Sync Tool

**Last Updated:** 2026-01-06
**Status:** Active Development

---

## 👤 About Jeff (The User)

### Background
- **Role:** UX Professional with 15 years of experience
- **Experience:** User research, wireframing, prototyping, interaction design
- **Technical Skills:** Learning front-end development and AI tools
- **Notable Achievement:** Built an internal app that was adopted company-wide

### Current Goals
1. **Build a portfolio** to showcase work for job applications
2. **Demonstrate technical growth** - Show ability to code and use modern tools
3. **Learn AI tools** - Specifically Claude Code and how to work effectively with AI
4. **Create shareable work** - Build tools that others can use

### Learning Style
- Appreciates clear, patient explanations
- Wants to understand the "why" behind decisions
- Values practical, working solutions over theoretical perfection
- Prefers simple, maintainable code over complex abstractions

---

## 🎯 Project Overview

### What We Built

**Two GitHub Repositories:**

1. **Portfolio** (`JDHalpin/portfolio`)
   - Personal portfolio website showcasing 15 years of UX work
   - HTML/CSS/JavaScript with Tailwind CSS
   - Responsive design (mobile + desktop)
   - Case study pages for major projects
   - **URL:** https://github.com/JDHalpin/portfolio

2. **Figma Design Tokens Tool** (`JDHalpin/figma-design-tokens`)
   - Standalone, reusable automation tool
   - Syncs design tokens from Figma → Code
   - Node.js script with comprehensive docs
   - Can be used by anyone with a Figma design system
   - **URL:** https://github.com/JDHalpin/figma-design-tokens

### Why We Split Into Two Repos

**Original Question:** "Should this be called 'portfolio' or something else?"

**Jeff's Insight:** The sync tool is generic and could work with any Figma file, not just the portfolio.

**Decision Made:** Split into two repositories
- **Reasoning:**
  - Portfolio showcases Jeff's work (primary goal)
  - Tool is reusable by others (demonstrates technical skills)
  - Cleaner separation of concerns
  - Tool can evolve independently (maybe npm package later)
  - Both repos demonstrate different skills to employers

**User's Stated Goal:** "Both equally - portfolio AND tool" - wants to showcase both his portfolio and provide a useful tool

---

## 🔍 Technical Discoveries & Lessons Learned

### Major Discovery #1: Figma API Authentication

**Problem:** All tokens returned "Invalid token" error (403)
- Tried multiple tokens
- Generated fresh tokens multiple times
- All failed initially

**Solution:** Figma API requires `X-Figma-Token` header, NOT `Authorization: Bearer`

```javascript
// ❌ Doesn't work
headers: { 'Authorization': `Bearer ${token}` }

// ✅ Works!
headers: { 'X-Figma-Token': token }
```

**Impact:** This wasn't obvious from Figma docs. Fixed in both sync script and `.mcp.json`.

### Major Discovery #2: Published Library vs Document Parsing

**Initial Approach:** Parse document tree to find color styles
- Worked but only found 7 colors
- Missing colors that weren't applied to elements

**Better Approach:** Use published library styles
- Jeff published his Figma library
- Now extracts all 13 color styles
- Cleaner, more reliable

**Implementation:** Script tries published library first, falls back to document parsing

### Major Discovery #3: MCP Configuration

**Challenge:** MCP (Model Context Protocol) tools weren't loading
- Configured `.mcp.json` with Figma endpoint
- Token issues prevented it from working
- Eventually discovered Figma has HTTP MCP server

**Current Status:**
- `.mcp.json` configured with correct header
- Not critical for current workflow (using REST API directly)
- Could be useful for future Claude Code sessions

---

## 🏗️ Architecture Decisions

### File Organization

**Portfolio Repo:**
```
portfolio/
├── index.html              # Main portfolio page
├── about.html, etc.        # Other pages
├── sync-design-tokens.js   # Local copy of tool
├── .env                    # Figma credentials (gitignored)
├── .claude/                # Context for Claude Code
│   ├── RESUME_HERE.md      # Quick restart guide
│   ├── SESSION_STATE.md    # Project state
│   └── CONTEXT.md          # This file!
└── README.md               # Portfolio overview
```

**Tool Repo:**
```
figma-design-tokens/
├── sync-design-tokens.js   # Main script
├── README.md               # Usage guide
├── SYNC_WORKFLOW.md        # Detailed workflow
├── package.json            # npm package info
└── .env.example            # Config template
```

### Technology Choices

**Tailwind CSS via CDN**
- Chosen for: Quick setup, no build process
- Tradeoff: Not optimized for production
- Why it's OK: Portfolio is small, performance is fine

**Vanilla JavaScript**
- Chosen for: Simplicity, no dependencies
- Tradeoff: More verbose than frameworks
- Why it's OK: Limited interactivity needed

**Node.js for Sync Tool**
- Chosen for: Built-in HTTPS, no dependencies needed
- Tradeoff: Requires Node.js installed
- Why it's OK: Standard for automation scripts

---

## 📊 Current State

### What's Working ✅

**Portfolio:**
- Responsive design (mobile + desktop)
- 13 color tokens from Figma design system
- Auto-updated Tailwind configuration
- Hamburger menu on mobile
- Navigation structure
- Pushed to GitHub

**Sync Tool:**
- Fetches colors from Figma API
- Publishes library support (13 colors)
- Fallback to document parsing (7 colors)
- RGB to hex conversion
- Auto-updates HTML files
- Comprehensive documentation
- Pushed to GitHub as standalone repo

### What's Not Done Yet ⏳

**Portfolio:**
- Case study content pages need content
- No deployment yet (GitHub Pages, Netlify, etc.)
- Could add more case studies
- Images folder exists but may need organization

**Sync Tool:**
- Only extracts colors (not typography, spacing, etc.)
- Only updates one specific HTML format
- Could be published to npm
- Could add visual diff tool
- Could add CI/CD integration

---

## 🎓 Key Context for Future Sessions

### Important Files to Read First

When resuming this project, read these in order:
1. **This file** (`.claude/CONTEXT.md`) - Understand the full picture
2. **`.claude/RESUME_HERE.md`** - Quick technical summary
3. **`README.md`** - Current project state
4. **`QUICK_START.md`** - How to use the tools

### User Preferences (Jeff's Style)

**Communication:**
- Wants clear explanations, not assumptions
- Appreciates being asked questions when there are multiple approaches
- Values learning alongside building

**Technical Approach:**
- Prefers working code over perfect code
- Likes simple, maintainable solutions
- Wants to understand the "why" behind decisions
- Appreciates being shown alternatives

**Project Goals:**
- Primary: Portfolio for job applications
- Secondary: Build shareable, useful tools
- Tertiary: Learn modern development practices

### What NOT to Do

❌ **Don't over-engineer** - Jeff values simplicity
❌ **Don't assume technical knowledge** - Explain as you go
❌ **Don't skip the "why"** - Context matters
❌ **Don't make decisions without asking** - When multiple approaches exist, ask

### What TO Do

✅ **Be clear and patient** - Jeff is learning
✅ **Explain tradeoffs** - Help inform decisions
✅ **Ask questions** - Clarify before implementing
✅ **Keep it simple** - Avoid unnecessary complexity
✅ **Document as you go** - Knowledge transfer is important

---

## 🗺️ Potential Next Steps

These are possible directions, NOT commitments:

### Portfolio Development
- [ ] Add content to case study pages
- [ ] Deploy to GitHub Pages or Netlify
- [ ] Add project screenshots/images
- [ ] Create "About" page content
- [ ] Add contact form
- [ ] Set up custom domain

### Sync Tool Enhancement
- [ ] Extract typography tokens (font sizes, weights)
- [ ] Extract spacing tokens (margins, padding)
- [ ] Support multiple output formats (CSS vars, SCSS, etc.)
- [ ] Add visual diff for token changes
- [ ] Create example repository
- [ ] Publish to npm
- [ ] Add GitHub Actions CI/CD

### Documentation & Sharing
- [ ] Create video walkthrough
- [ ] Write blog post about the workflow
- [ ] Add to LinkedIn portfolio
- [ ] Create case study page about building the tool
- [ ] Submit to design/dev communities

---

## 🔗 Important Links

**Repositories:**
- Portfolio: https://github.com/JDHalpin/portfolio
- Sync Tool: https://github.com/JDHalpin/figma-design-tokens

**External Resources:**
- Figma API: https://www.figma.com/developers/api
- Figma Settings: https://www.figma.com/settings
- Tailwind CSS: https://tailwindcss.com/
- Claude Code: https://code.claude.com/

**Figma Details:**
- File ID: `vFzy38cYS83Xj5CCqdTvi4`
- File Name: "Jeff Halpin - XD Portfolio Design System"
- Library: Published (all 13 colors available)

---

## 💡 Problem-Solving History

### Challenge: "How should I organize this code?"

**Context:** Sync tool works for any Figma file, but it's in portfolio repo

**Options Presented:**
1. Keep everything together
2. Split into two repos
3. Rename portfolio to focus on tool

**Decision:** Split into two repos
- Portfolio focuses on showcasing work
- Tool focuses on reusability
- Both repos cross-reference each other
- Demonstrates understanding of separation of concerns

### Challenge: "Multiple tokens not working"

**Context:** Generated 3 different tokens, all failed

**Discovery Process:**
1. Tried with `/me` endpoint - failed
2. Tried with file endpoint - failed
3. Tried verbose curl - still 403
4. Moved file from Drafts to team folder - still failed
5. Published library - still failed initially
6. Tried `X-Figma-Token` header instead - SUCCESS!

**Lesson:** Sometimes the solution isn't in the docs. Systematic debugging pays off.

### Challenge: "Naming and version control confusion"

**User Quote:** "My challenge with git and version control lies in naming and the sequencing of the various versions / places."

**Context:** User is thoughtful about naming and organization
- Recognized tool is more generic than "portfolio"
- Asked good questions before committing
- Values clear structure

**Approach:** Ask questions, present options, let user decide
- Used AskUserQuestion tool to present choices
- Explained tradeoffs of each approach
- User made informed decision

---

## 📝 Session Notes

### Working Directory
Primary: `/Users/jeffhalpin/Projects/portfolio/`
Secondary: `/Users/jeffhalpin/Projects/figma-design-tokens/`

### Related Projects (Context Only)
- `pow/` - TypeScript CLI for converting natural language → flow plans
- `pow-importer/` - Figma plugin to import JSON plans
- **Note:** These are separate projects, not part of current workflow

### Git Configuration
- Both repos on branch `main`
- GitHub username: `JDHalpin`
- Commits include Claude Code attribution
- `.env` files are gitignored (correct!)

---

**Remember:** Jeff is a UX professional learning development. Be patient, explain clearly, and keep things practical. The goal is a working portfolio that demonstrates skills, not a perfect codebase that no one understands.

---

Built with [Claude Code](https://claude.com/claude-code)
