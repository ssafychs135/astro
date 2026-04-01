# Enhanced Stitch Prompt: The Architectural Developer (Refined)

## 1. Creative North Star: "The Digital Blueprint v2"
**Goal:** Transition the current design from a standard technical blog to a high-end, editorial engineering showcase. The interface should feel like a precision drafting table—organized, mathematical, and unapologetically expert.

---

## 2. Core Aesthetic Directives (Based on Design System)

### Layout & Spacing
- **Intentional Asymmetry:** Break the rigid centered grid. Use a 12-column layout but offset primary content blocks (e.g., a 7-column content area with a 5-column whitespace/technical sidebar).
- **The "No-Line" Rule:** strictly prohibit 1px solid borders for sectioning. Define all boundaries through tonal shifts using `surface-container-low` (#131b2e) for background sections.
- **Mathematical Rhythm:** Use consistent spacing increments (spacing.4, spacing.8, spacing.12) to create a clear visual hierarchy that feels "engineered."

### Surface & Depth
- **Tonal Nesting:** Create depth by stacking surfaces. A `surface-container` (#171f33) card should sit on a `surface-container-low` (#131b2e) section.
- **Glassmorphism:** Apply a sophisticated glass effect to sticky headers and code snippet toolbars. 
  - *Spec:* 70% opacity `surface_container`, 24px backdrop-blur, and a subtle 0.5px top-edge highlight.

### Typography (The "Editorial High-Contrast" Strategy)
- **Primary Voice:** Use **Inter** for headings. Set `display-lg` headings with tight letter-spacing (-0.02em) for an authoritative, editorial feel.
- **Technical Precision:** Use **Space Grotesk** for all metadata, labels, and code. This mono-leaning font should be used for "Tech Metadata" in `label-md` scale, set in ALL CAPS.

---

## 3. Targeted Improvements for Screen Components

### Portfolio Cards
- **Structure:** Remove all borders. Use `surface-container` as the base.
- **Hover State:** Transition to `surface-container-highest` and add a 2px `primary` (#c0c1ff) accent bar at the extreme top of the card.
- **Imagery:** Use high-resolution mockups that overlap the container edges slightly to break the frame.

### Study Note List
- **Timeline View:** Instead of a list, use a vertical technical timeline. Dates should be in `label-md` (Space Grotesk) on the left, with titles in `headline-sm` (Inter) on the right.
- **Category Tags:** Use `secondary-container` backgrounds with sharp, `roundedness.sm` (2px) corners. No pills.

### Code Snippets
- **Detailing:** Include a "breadcrumb" style header in the code block showing the filename in `label-sm`. The background should be `surface_container_lowest` (#060e20) for maximum contrast.

---

## 4. Specific Action Prompt for Stitch
"On the Portfolio list screen, refine the layout to embrace intentional asymmetry. Move the section headers to the far left. Replace all visible border lines with tonal background shifts using the surface hierarchy. Update all technical metadata (dates, tags, read-time) to use the Space Grotesk font in All Caps. Ensure all project cards have a sharp 2px corner radius and a subtle 2px primary accent bar that appears on the top edge during hover."
