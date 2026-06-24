# Multi-Step Form — Lorem Gaming

![Preview](./preview.jpg)

A responsive subscription signup flow for the gaming platform Lorem Gaming. Users enter personal info, pick a plan and add-ons, review their summary, and confirm.

Built as a practice project for e2e testing with Playwright — no framework overhead, just vanilla JS.

## Features

- **5-step flow:** Personal Info → Select Plan → Add-ons → Summary → Thank You
- **Monthly/Yearly billing toggle** with live price updates and "2 months free" badges
- **Form validation** with inline error messages
- **Responsive layout:** desktop sidebar layout and mobile top-strip layout
- **Summary screen** with Change link back to plan selection

## Tech

- **Vite** — dev server and build
- **Vanilla JavaScript** — no framework
- **CSS** — one stylesheet, custom properties, responsive
- **Playwright** — 7 e2e tests covering the full user journey

## Quick start

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Test

```bash
pnpm test
```

## Build

```bash
pnpm build
```

Output in `dist/` — ready to deploy to GitHub Pages, Netlify, or any static host.

## Design

Font: Ubuntu (400, 500, 700). Colors from `style-guide.md`. Layout targets: 1440px desktop, 375px mobile. All design images in `/design`.
