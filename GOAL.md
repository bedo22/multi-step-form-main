# Goal: Multi-Step Form — Pixel-Perfect Build

## 1. Project Overview

Build a **4-step survey/order form** for a gaming platform (Lorem Gaming) where users enter personal info, pick a subscription plan, choose add-ons, review a summary, and confirm. The form must match the design exactly, across **desktop (1440px)** and **mobile (375px)** breakpoints, with all interactive states.

**Current state:** The repo is a bare starter template — raw text in `index.html`, no CSS, no JS, no structure. Everything must be built from scratch.

---

## 2. Layout Architecture

### Desktop (≥992px → 1440px)

```
┌──────────────────────────────────────────────────────┐
│                  Page Background                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  SIDEBAR (274px)  │     CONTENT AREA           │  │
│  │  Purple #483EFF   │     White #FFF              │  │
│  │  with SVG overlay │     Padded form content     │  │
│  │                   │                             │  │
│  │  ○ 1  STEP 1     │     [Step heading]          │  │
│  │     YOUR INFO     │     [Description]           │  │
│  │                   │     [Form fields]           │  │
│  │  ○ 2  STEP 2     │                             │  │
│  │     SELECT PLAN   │                             │  │
│  │                   │                             │  │
│  │  ○ 3  STEP 3     │                             │  │
│  │     ADD-ONS       │     [Go Back]  [Next Step]  │  │
│  │                   │                             │  │
│  │  ○ 4  STEP 4     │                             │  │
│  │     SUMMARY       │                             │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

- **Card container:** centered on page, rounded corners (10px), subtle drop shadow, `max-width: ~940px`
- **Sidebar:** fixed 274px width, purple background (`hsl(243, 100%, 62%)`), decorative SVG blobs overlay (`bg-sidebar-desktop.svg`), left-side rounded corners
- **Content area:** white background, generous padding (~40px top, ~100px sides), holds the current step

### Mobile (<992px → 375px)

```
┌─────────────────────────┐
│  SIDEBAR (top strip)     │
│  bg-sidebar-mobile.svg   │
│  1   2   3   4           │ ← step circles horizontal
├─────────────────────────┤
│  CONTENT CARD            │
│  (overlaps sidebar       │
│   with negative margin)  │
│                          │
│  [Step heading]          │
│  [Description]           │
│  [Form fields]           │
│                          │
├─────────────────────────┤
│  [Go Back]   [Next Step] │ ← fixed bottom bar
└─────────────────────────┘
```

- **Sidebar:** becomes a horizontal strip (~172px tall) at the top with `bg-sidebar-mobile.svg`
- **Step indicators:** arranged in a horizontal row with equal spacing
- **Content card:** overlaps the sidebar strip (negative top margin ~-30px), rounded corners, white background
- **Bottom bar:** sticky/fixed at bottom, full width, contains "Go Back" (left, text) and "Next Step" (right, button)

---

## 3. Step-by-Step Design Spec

### Step 1 — Personal Info

**Heading:** "Personal info" (bold, dark navy ~28px)
**Description:** "Please provide your name, email address, and phone number." (grey, 16px)

**Fields (all required):**

| Field | Label | Placeholder | Validation |
|-------|-------|-------------|------------|
| Name | "Name" | "e.g. Stephen King" | Required — empty shows error |
| Email | "Email Address" | "e.g. stephenking@lorem.com" | Required + must be valid email format |
| Phone | "Phone Number" | "e.g. +1 234 567 890" | Required — empty shows error |

**Field styling:**
- Border: 1px solid `hsl(229, 24%, 87%)` (light grey/purple)
- Border-radius: 8px
- Padding: ~12px vertical, ~16px horizontal
- Font: 16px, dark navy color
- Placeholder: grey `hsl(231, 11%, 63%)`
- Focus state: border color changes to `hsl(243, 100%, 62%)` (purple)
- **Error state:** border becomes `hsl(354, 84%, 57%)` (red), error message "This field is required" appears right-aligned next to the label in red

**Button:** "Next Step" — dark navy (`hsl(213, 96%, 18%)`), white text, rounded (8px), padding ~12px 24px, positioned bottom-right of content area

**No "Go Back" button on Step 1.**

---

### Step 2 — Select Plan

**Heading:** "Select your plan"
**Description:** "You have the option of monthly or yearly billing."

**Plan cards (3 in a row on desktop, stacked on mobile):**

| Plan | Icon | Monthly | Yearly | Badge |
|------|------|---------|--------|-------|
| Arcade | `icon-arcade.svg` (orange circle) | $9/mo | $90/yr | "2 months free" |
| Advanced | `icon-advanced.svg` (pink circle) | $12/mo | $120/yr | "2 months free" |
| Pro | `icon-pro.svg` (purple circle) | $15/mo | $150/yr | "2 months free" |

**Card styling:**
- Border: 1px solid `hsl(229, 24%, 87%)`
- Border-radius: 10px
- Padding: ~20px
- Icon: 40x40px circle with icon inside
- Plan name: bold, dark navy
- Price: grey text, smaller font
- "2 months free" badge: small green/blue text, only visible in yearly mode

**Selected card state:**
- Border: 2px solid `hsl(243, 100%, 62%)` (purple, thicker)
- Background: very light purple tint

**Monthly/Yearly toggle:**
- Pill-shaped container with grey background
- Labels: "Monthly" (left), "Yearly" (right)
- Toggle switch: dark navy track (`hsl(213, 96%, 18%)`), white circle thumb
- Active label: dark navy, bold
- Inactive label: grey `hsl(231, 11%, 63%)`
- Toggle position: left = monthly, right = yearly

**Buttons:** "Go Back" (left, grey text link) | "Next Step" (right, dark navy button)

---

### Step 3 — Pick Add-ons

**Heading:** "Pick add-ons"
**Description:** "Add-ons help enhance your gaming experience."

**Add-on rows (stacked vertically):**

| Add-on | Description | Monthly | Yearly |
|--------|-------------|---------|--------|
| Online service | Access to multiplayer games | +$1/mo | +$10/yr |
| Larger storage | Extra 1TB of cloud save | +$2/mo | +$20/yr |
| Customizable profile | Custom theme on your profile | +$2/mo | +$20/yr |

**Row styling:**
- Border: 1px solid `hsl(229, 24%, 87%)`
- Border-radius: 10px
- Padding: ~20px
- Layout: checkbox (left) | name + description (center) | price (right)
- Custom checkbox: 20x20px square, rounded (4px), grey border when unchecked
- **Checked state:** purple fill (`hsl(243, 100%, 62%)`) with white checkmark (`icon-checkmark.svg`), row border changes to purple, light purple background tint
- Add-on name: bold, dark navy
- Description: grey, smaller font
- Price: purple/blue, right-aligned

**Buttons:** "Go Back" | "Next Step"

---

### Step 4 — Finishing Up (Summary)

**Heading:** "Finishing up"
**Description:** "Double-check everything looks OK before confirming."

**Summary section (in a light grey rounded container):**

```
┌─────────────────────────────────────────┐
│  Arcade (Monthly)              $9/mo    │
│  Change                                  │
│  ─────────────────────────────────────  │
│  Online service                +$1/mo   │
│  Larger storage                +$2/mo   │
└─────────────────────────────────────────┘

  Total (per month)              +$12/mo   │
```

- Plan line: bold name + billing period, price right-aligned
- "Change" link: underlined, purple/blue text, clickable → jumps back to Step 2
- Separator lines: thin grey borders
- Add-on lines: grey text, price right-aligned
- **Total:** bold, purple/blue color (`hsl(243, 100%, 62%)`), larger font
- Yearly label: "Total (per year)" instead of "Total (per month)"
- Yearly total: not prefixed with `+` (shows absolute amount, e.g. "$120/yr")

**Buttons:** "Go Back" | **"Confirm"** (purple button `hsl(243, 100%, 62%)`, NOT dark navy)

---

### Step 5 — Thank You

**Content (centered vertically in content area):**
- `icon-thank-you.svg` (80x80 pink circle with white checkmark)
- "Thank you!" heading (bold, dark navy, ~28px)
- Confirmation message (grey, centered, 16px):
  > "Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com."

**No buttons.** Sidebar still visible with step 4 marked active.

---

## 4. Sidebar Step Indicators

Each step shows:
- **Step label:** "STEP N" (small, uppercase, light white/translucent)
- **Step name:** "YOUR INFO" / "SELECT PLAN" / "ADD-ONS" / "SUMMARY" (bold, white)
- **Number circle:** 32px diameter

**Active step:**
- Circle: filled with `hsl(228, 100%, 84%)` (blue 300), white number text
- Step text: white, full opacity

**Inactive step:**
- Circle: transparent, white border (1px), white number text
- Step text: white, slightly reduced opacity

---

## 5. User Stories

1. **As a user,** I want to enter my name, email, and phone so the platform knows who I am.
2. **As a user,** I want to see validation errors if I skip a field or enter a bad email, so I can fix mistakes before proceeding.
3. **As a user,** I want to choose between Monthly and Yearly billing so I can pick what suits my budget.
4. **As a user,** I want to see different prices when I toggle Monthly/Yearly, including "2 months free" badges on yearly plans.
5. **As a user,** I want to select exactly one plan (Arcade, Advanced, or Pro) with a clear visual highlight on my choice.
6. **As a user,** I want to optionally add extras (Online service, Larger storage, Customizable profile) with checkboxes.
7. **As a user,** I want to see my selections and total price on a summary screen before confirming.
8. **As a user,** I want a "Change" link on the summary that takes me back to Step 2 to revise my plan.
9. **As a user,** I want "Go Back" buttons on Steps 2–4 to return to the previous step without losing my data.
10. **As a user,** I want a confirmation/thank-you screen after I click "Confirm".
11. **As a user,** I want the form to look correct on both mobile (375px) and desktop (1440px).
12. **As a user,** I want hover and focus states on all interactive elements so the UI feels responsive.

---

## 6. Color Palette Reference

| Token | HSL | Usage |
|-------|-----|-------|
| Blue 950 | `hsl(213, 96%, 18%)` | Headings, "Next Step" button bg |
| Purple 600 | `hsl(243, 100%, 62%)` | Sidebar bg, "Confirm" button, active checkbox, toggle, selected card border, total price |
| Blue 300 | `hsl(228, 100%, 84%)` | Active step indicator circle |
| Blue 200 | `hsl(206, 94%, 87%)` | Hover states |
| Red 500 | `hsl(354, 84%, 57%)` | Validation error text + border |
| Grey 500 | `hsl(231, 11%, 63%)` | Body/subheading text, placeholder |
| Purple 200 | `hsl(229, 24%, 87%)` | Input borders, card borders, separators |
| Blue 100 | `hsl(218, 100%, 97%)` | Page background |
| Blue 50 | `hsl(231, 100%, 99%)` | Summary container bg |
| White | `hsl(0, 100%, 100%)` | Card/content area bg |

---

## 7. Typography

- **Font:** Ubuntu (400 Regular, 500 Medium, 700 Bold) — local files in `assets/fonts/`
- **Body text:** 16px
- **Headings:** ~28px, 700 weight, Blue 950
- **Subheadings/descriptions:** 16px, 400 weight, Grey 500
- **Step labels:** ~12px, uppercase, 700 weight
- **Prices:** 16px, 500 weight
- **Error text:** ~14px, Red 500

---

## 8. Interactive States Checklist

| Element | Hover | Focus | Active/Selected | Error |
|---------|-------|-------|-----------------|-------|
| Input fields | — | Purple border | — | Red border + message |
| "Next Step" btn | Lighter bg (`hsl(206, 94%, 87%)`?) | Outline | — | — |
| "Confirm" btn | Lighter purple | Outline | — | — |
| "Go Back" text | Darker grey | Underline | — | — |
| Plan cards | Cursor pointer | — | Purple border + tint | — |
| Monthly/Yearly toggle | Cursor pointer | — | Thumb slides | — |
| Add-on rows | Cursor pointer | — | Purple border + tint + checkmark | — |
| "Change" link | Underline | — | — | — |

---

## 9. Functional Requirements

1. **Step navigation:** Only forward (Next Step) and backward (Go Back / Change). No skipping steps.
2. **Form validation (Step 1):** Block progression if any field is empty or email is invalid. Show inline errors.
3. **Plan selection (Step 2):** Exactly one plan must be selected. Default: first plan (Arcade).
4. **Billing toggle (Step 2):** Updates prices on Steps 2, 3, and 4 in real-time.
5. **Add-on selection (Step 3):** Zero or more add-ons. Checkboxes toggle independently.
6. **Summary (Step 4):** Dynamically renders selected plan, billing period, chosen add-ons, and computed total.
7. **"Change" link (Step 4):** Navigates back to Step 2, preserving all current selections.
8. **Confirmation (Step 5):** Shown after clicking "Confirm". No further navigation.
9. **State persistence:** All user input and selections persist when navigating back/forward between steps.

---

## 10. Pricing Matrix

| Item | Monthly | Yearly |
|------|---------|--------|
| Arcade | $9/mo | $90/yr |
| Advanced | $12/mo | $120/yr |
| Pro | $15/mo | $150/yr |
| Online service | +$1/mo | +$10/yr |
| Larger storage | +$2/mo | +$20/yr |
| Customizable profile | +$2/mo | +$20/yr |

**Total formula:** `plan price + sum(selected add-on prices)`

---

## 11. Assets Inventory

| File | Purpose |
|------|---------|
| `bg-sidebar-desktop.svg` | Desktop sidebar purple background with blobs |
| `bg-sidebar-mobile.svg` | Mobile top-strip background |
| `icon-arcade.svg` | Arcade plan icon (orange circle) |
| `icon-advanced.svg` | Advanced plan icon (pink circle) |
| `icon-pro.svg` | Pro plan icon (purple circle) |
| `icon-checkmark.svg` | White checkmark for checkboxes |
| `icon-thank-you.svg` | Thank you screen icon (pink circle) |
| `favicon-32x32.png` | Browser tab favicon |
| `Ubuntu-Bold.ttf` | Font weight 700 |
| `Ubuntu-Medium.ttf` | Font weight 500 |
| `Ubuntu-Regular.ttf` | Font weight 400 |

---

## 12. Acceptance Criteria

- [ ] Matches desktop design (1440px) pixel-perfectly for all 5 steps
- [ ] Matches mobile design (375px) pixel-perfectly for all 5 steps
- [ ] Step 1 validation: blocks navigation on empty fields or invalid email, shows red errors
- [ ] Step 2: plan cards selectable, toggle switches monthly/yearly, prices update across all steps
- [ ] Step 3: add-on checkboxes toggle independently, prices reflect billing period
- [ ] Step 4: summary shows correct plan, add-ons, and total; "Change" jumps to Step 2
- [ ] Step 5: thank-you screen displays after confirm
- [ ] All hover/focus/active states present on interactive elements
- [ ] Sidebar step indicators update correctly (active step highlighted)
- [ ] "Go Back" buttons on Steps 2–4 return to previous step without data loss
- [ ] Responsive: mobile layout with top strip + stacked cards, desktop layout with sidebar
- [ ] Ubuntu font loaded and applied (400, 500, 700)
