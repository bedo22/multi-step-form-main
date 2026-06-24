# Multi-Step Form — Lorem Gaming

A responsive subscription signup flow for a gaming platform. Built with vanilla JS, Vite, and Playwright.

## Stack

- **Build:** Vite
- **Language:** JavaScript (vanilla)
- **Testing:** Playwright (e2e)
- **Package manager:** pnpm

## Development

```bash
pnpm install
pnpm dev
```

Opens at `http://localhost:3000`.

## Tests

```bash
pnpm test
```

Runs 7 Playwright journey tests (happy path, validation, navigation, billing toggle, summary, change link, sidebar indicators).

## Design

5-step flow: Personal Info → Select Plan → Add-ons → Summary → Thank You. Monthly/Yearly billing toggle with dynamic pricing. Mobile-responsive layout (375px → 1440px).

## Deploy

```bash
pnpm exec vite build
```

Output in `dist/`. Deploy to GitHub Pages via:
- `gh-pages` branch, or
- GitHub Actions deploy to `gh-pages`, or
- Push `dist/` contents to `docs/` folder and serve from `docs/` in Pages settings.

## Domain

Key terms defined in [`CONTEXT.md`](./CONTEXT.md). Full design spec in [`GOAL.md`](./GOAL.md).
