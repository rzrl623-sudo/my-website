# CLAUDE.md — AI Assistant Guide for my-website

This file provides context for AI assistants (Claude, Copilot, etc.) working in this repository.

---

## Project Overview

A single-page Hebrew-language landing page for **רז טל (Raz Tal)**, a profit engineer for private clinics. The site is a marketing/lead-generation page built on the **Lovable** platform.

- **Language**: Hebrew (RTL layout)
- **Type**: Single Page Application (SPA) — one main component, no routing
- **Platform**: Lovable (lovable.dev) — manages deployment and IDE integration

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript 5 |
| Build Tool | Vite 5 (with SWC) |
| Styling | Tailwind CSS 3 |
| UI Primitives | Radix UI (via shadcn/ui) |
| Forms | React Hook Form + Zod |
| Data Fetching | TanStack Query (React Query 5) |
| Charts | Recharts |
| Icons | Lucide React |
| Testing | Vitest + Testing Library + jsdom |
| Linting | ESLint 9 (TypeScript ESLint) |

---

## Directory Structure

```
/
├── Index.tsx            # Main app component (entire landing page)
├── index.html           # HTML entry point (RTL, Hebrew lang, Google Fonts)
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite config — dev server on port 8080, alias @→./src
├── vitest.config.ts     # Test config — jsdom env, tests in src/**/*.{test,spec}.{ts,tsx}
├── tailwind.config.ts   # Tailwind — dark mode class, custom fonts, CSS variable colors
├── tsconfig.json        # Base TS config — path alias @/* → ./src/*
├── tsconfig.app.json    # App TS config — strict: false, ES2020 target
├── tsconfig.node.json   # Build-tool TS config — stricter, ES2022
├── eslint.config.js     # ESLint — TS rules, react-hooks, react-refresh
├── postcss.config.js    # PostCSS — Tailwind + Autoprefixer
├── components.json      # shadcn/ui CLI config
├── robots.txt           # SEO robots rules
└── gitignore.txt        # Git ignore patterns (note: not named .gitignore)
```

> **Note**: The `src/` directory is referenced by Vite aliases and HTML (`/src/main.tsx`) but may not physically exist in the repository root. The primary source file is `Index.tsx` at the root.

---

## Development Workflow

### Setup

```bash
git clone <repo-url>
cd my-website
npm install
npm run dev       # Dev server at http://localhost:8080
```

### Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server on port 8080 with HMR |
| `npm run build` | Production build |
| `npm run build:dev` | Dev-mode build (unminified, for debugging) |
| `npm run lint` | Run ESLint |
| `npm run preview` | Locally preview the production build |
| `npm run test` | Run tests once (CI mode) |
| `npm run test:watch` | Run tests in watch mode |

### Development Server

- Port: **8080** (configured in `vite.config.ts`)
- Host: `::` (IPv6/dual-stack)
- HMR overlay: **disabled**

---

## Key Conventions

### TypeScript

- TypeScript strict mode is **disabled** (`strict: false` in `tsconfig.app.json`)
- `noImplicitAny` is **false** — implicit `any` is allowed
- `skipLibCheck` is **true**
- Use the `@/` alias for imports from `src/`: e.g., `import { Button } from "@/components/ui/button"`

### Styling

- Use **Tailwind CSS utility classes** for all styling
- Colors are defined as **CSS custom properties** (HSL format) and referenced in Tailwind config
- **Dark mode** is class-based (toggle `dark` class on `<html>`)
- Custom fonts: **Frank Ruhl Libre** (serif, headings) and **Heebo** (sans-serif, body) — loaded via Google Fonts in `index.html`
- Custom animations available: `fade-in-up`, `accordion-down`, `accordion-up`
- Use `cn()` helper (from `lib/utils`) for conditional class merging: `cn("base-class", condition && "conditional-class")`

### Components

- UI primitives come from **shadcn/ui** — generated into `src/components/ui/`
- Add new shadcn components with: `npx shadcn-ui@latest add <component-name>`
- Business/page components live in `src/components/`
- Page-level components and routes live in `src/pages/`

### RTL / Hebrew

- The entire page is RTL (`dir="rtl"` on `<html>`)
- All user-facing text is in Hebrew
- Tailwind's logical properties (e.g., `ms-`, `me-`, `ps-`, `pe-`) are preferred over `ml-`/`mr-` for RTL compatibility
- WhatsApp integration uses pre-filled Hebrew messages

### Forms

- Forms use **React Hook Form** with **Zod** schema validation
- External form submissions go to `form2.ravpage.co.il` via injected script
- The lead magnet form in the page injects a third-party form script

### Animation

- Scroll-triggered fade-in animations use the `useFadeIn()` custom hook (Intersection Observer API)
- The `Section` component wraps content sections and applies the fade-in effect automatically

---

## Testing

- Framework: **Vitest** with **Testing Library** (React)
- Test environment: **jsdom**
- Test files: `src/**/*.{test,spec}.{ts,tsx}`
- Setup file: `src/test/setup.ts` (configured but may need to be created)
- Globals enabled — no need to import `describe`, `it`, `expect`

```typescript
// Example test file location: src/components/MyComponent.test.tsx
import { render, screen } from '@testing-library/react'
import MyComponent from './MyComponent'

it('renders correctly', () => {
  render(<MyComponent />)
  expect(screen.getByText('...')).toBeInTheDocument()
})
```

> **Current status**: Test infrastructure is configured but no tests have been written yet.

---

## Linting

ESLint is configured with:
- `@typescript-eslint/recommended` rules
- `eslint-plugin-react-hooks` (enforces hooks rules)
- `eslint-plugin-react-refresh` (enforces fast refresh compatibility)
- Unused variable warnings are **disabled**

Run linting with: `npm run lint`

---

## Git Workflow

- Main branch: `master`
- Feature/AI branches follow the convention: `claude/<description>-<session-id>`
- Commit messages should be clear and descriptive
- There is no CI/CD pipeline — deployment is handled by the Lovable platform

---

## Architecture Notes

### Single Component Design

The current codebase is intentionally minimal — the entire landing page is in one file (`Index.tsx`). This is appropriate for the current scope. If the project grows:

- Extract section components into `src/components/sections/`
- Move hooks into `src/hooks/`
- Move types into `src/types/`

### Lovable Platform

This project was scaffolded and is managed by [Lovable](https://lovable.dev). Key implications:

- The `lovable-tagger` Vite plugin is used in dev mode for component tagging in the Lovable editor
- The README references the Lovable project URL (currently a placeholder)
- Deployment is triggered through the Lovable dashboard, not local git push to main

### External Integrations

- **WhatsApp**: CTAs link to `https://wa.me/972...` with pre-filled Hebrew messages
- **Lead form**: Third-party form script from `form2.ravpage.co.il` injected via `useEffect`

---

## Common Tasks for AI Assistants

### Adding a new section to the landing page

1. Add a new section in `Index.tsx` using the existing `<Section>` component wrapper
2. Use `<SectionTitle>` for headings
3. Use `<CtaButton>` for call-to-action links
4. Keep content in Hebrew, maintain RTL layout

### Adding a new shadcn/ui component

```bash
npx shadcn-ui@latest add <component-name>
```

This generates the component in `src/components/ui/`.

### Changing colors or theme

Edit the CSS custom properties in `src/index.css` (HSL values) — these map to the Tailwind color tokens defined in `tailwind.config.ts`.

### Running the full check before committing

```bash
npm run lint && npm run test && npm run build
```
