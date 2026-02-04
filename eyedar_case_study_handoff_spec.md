# Claude Code Handoff Spec: Eyedar Case Study Template Update

## Overview
Update the Eyedar case study (eyedar.html) with revised copy, restructured image placement, and template changes that will be reusable for future case studies.

---

## Section Order (top to bottom)

1. Hero (existing: title, description, hero image)
2. The Challenge (new section)
3. My Role (existing, minor edits)
4. Research & Discovery (existing, minor edits)
5. Key Design Decisions (existing, minor edits)
6. Outcome (existing, minor edits)
7. Reflection (new section)
8. Sidebar metadata (keep as-is)

---

## New Sections to Add

### The Challenge (insert after hero, before My Role):

```html
<h3 class="text-2xl text-black font-normal mb-4 mt-8">The Challenge</h3>
<p class="text-base text-black leading-relaxed mb-4">Designing for blind users required abandoning visual interface conventions entirely. Eyedar needed an interaction model that users could learn, trust, and operate while moving through physical space.</p>
<p class="text-base text-black leading-relaxed mb-4">Every interaction had to be discoverable and executable without sight. No buttons to find. No screen hierarchy to memorize. The interface would live entirely in gesture, sound, and vibration.</p>
```

### Reflection (insert after Outcome, before footer):

```html
<h3 class="text-2xl text-black font-normal mb-4 mt-8">Reflection</h3>
<p class="text-base text-black leading-relaxed mb-4">This project fundamentally changed how I approach accessibility. Compliance checklists are a starting point, not a destination. The real work is designing for lived experience, which requires direct collaboration with the people you're designing for. I've carried that principle into every project since.</p>
```

---

## Copy Fixes (find and replace)

| Find | Replace |
|------|---------|
| `uneccessary` | `unnecessary` |
| `We ensure that testers could` | `We ensured that testers could` |
| `swipe patterns, tap zones, etc.` | `swipe patterns and tap zones` |
| `The developer leveraged` | `Our developer leveraged` |

---

## Image Changes

### Remove:
- eyedar_board.png (the project board image)

### Add/Reposition:

| Image file | Placement | Caption |
|------------|-----------|---------|
| Property_1_detail_photo.png | Hero area or after hero as section divider | "Complete interaction specification documenting gesture controls, VoiceOver feedback, and screen flows across the application." |
| Eyedar_Blind_Pig_screen_abr.png | After Research & Discovery section | "Annotated wireframes for onboarding and active scanning. The Welcome screen introduces the gesture vocabulary; the scan screen shows the LIDAR view with spatial audio cues mapped to user actions." |
| eyedar_gestures.png | After Key Design Decisions section | "Detail from the Help menu specification showing how each gesture triggers specific VoiceOver feedback. Every interaction was documented and tested with blind users." |
| eyedar_loop.gif | Keep at bottom | "Spatial audio demonstration: closer objects produce louder, more distinct sounds while distant objects are softer and more diffuse." |

---

## Template Requirements

### 1. Captioned images within body content
- Images should support a caption element beneath them
- Caption styling: smaller text, secondary color, centered or left-aligned to match body

### 2. Clickable images (lightbox)
- Images should enlarge on click
- Use a simple lightbox or modal (vanilla JS fine, or lightweight library)
- Close on click outside or escape key

### 3. Reusable structure
- Section order and image placement patterns should work for future case studies
- Consider extracting to a partial or template if not already

---

## Outcome Section Update

Replace current awards-only content with:

```html
<h3 class="text-2xl text-black font-normal mb-4 mt-8">Outcome</h3>
<p class="text-base text-black leading-relaxed mb-4">Eyedar launched as a functional application and received industry recognition including 2x Grand Clio Health, 2x Gold Clio Health, Silver Pencil at One Show, Silver Cannes Lion, and a Manny Award.</p>
```

---

## Files to Upload

Ensure these images are in the /images directory:
- Property_1_detail_photo.png
- Eyedar_Blind_Pig_screen_abr.png
- eyedar_gestures.png (already present)
- eyedar_loop.gif (already present)

---

## Testing Checklist

- [ ] All images load correctly
- [ ] Lightbox opens and closes properly
- [ ] Captions display beneath images
- [ ] Copy fixes applied (search for "uneccessary" to verify)
- [ ] Section order matches spec
- [ ] Mobile responsive (images scale, lightbox works on touch)
