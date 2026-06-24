# Multi-Step Form

A 5-screen subscription signup flow for a gaming platform (Lorem Gaming) where users enter personal details, select a plan, choose extras, review, and confirm.

## Language

**Step**:
One of 5 sequential stages in the form flow: Personal Info (1), Select Plan (2), Add-ons (3), Summary (4), Thank You (5).
_Avoid_: Page, screen, tab

**Plan**:
A subscription tier with a fixed monthly or yearly price. Exactly one must be selected. Three options: Arcade, Advanced, Pro.
_Avoid_: Package, tier, subscription type

**Add-on**:
An optional extra feature that adds a cost to the base plan. Zero or more can be selected. Three options: Online service, Larger storage, Customizable Profile.
_Avoid_: Extra, accessory, feature

**Billing period**:
The recurring interval for charges. Either `monthly` or `yearly`. Yearly plans show a "2 months free" badge relative to the monthly equivalent.
_Avoid_: Interval, cycle, frequency

**Summary**:
Step 4's read-only review screen showing the selected plan, billing period, add-ons, and computed total price. Includes a "Change" link back to Step 2.

**Sidebar indicator**:
A numbered circle (1–4) in the left sidebar showing which step the user is on. Active step fills with blue; inactive steps have a white outline.
_Avoid_: Progress bar, stepper, step dot

**Toggle**:
The pill-shaped switch in Step 2 that flips between Monthly and Yearly billing. A dark navy track with a white circle thumb.
_Avoid_: Switch, slider, button
