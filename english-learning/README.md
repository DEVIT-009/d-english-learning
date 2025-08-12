# English Learning App

A React + Vite + TypeScript + Tailwind CSS application with a responsive dashboard, products CRUD, authentication mock, dark mode, and PWA support.

## Tech Stack

- React 19, TypeScript
- Vite 7
- Tailwind CSS v4
- React Router 7
- Redux Toolkit + React Redux
- React Hook Form + Yup
- Axios (reserved for API integration)
- Recharts
- react-hot-toast
- vite-plugin-pwa

## Features

- Responsive layout: navbar, collapsible sidebar, main content
- Dark mode toggle (class-based `dark`)
- Auth mock: Login/Register, protected routes, logout
- Dashboard: profile card, quick actions, chart
- Products: table with search, sort, pagination, optional infinite scroll, add/edit modal, image upload with preview, localStorage-backed mock API
- Skeleton loaders for better perceived performance
- PWA: offline caching and installable

## Getting Started

### Prerequisites

- Node.js >= 18

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open the app at the URL printed in the terminal.

### Build

```bash
npm run build
```

The output is generated in `dist/`.

### Preview production build

```bash
npm run preview
```

## Environment Variables

Create a `.env` file at the project root. See `.env.example` for keys.

- `VITE_API_BASE_URL` – optional API base URL when switching from localStorage to a real backend
- `VITE_ENABLE_PWA` – set to `true` to enable PWA registration
- `VITE_ENABLE_MOCK_API` – set to `true` to use local mock API
- `VITE_APP_NAME` – app display name
- `VITE_APP_THEME_COLOR` – theme color for PWA

## Notes

- Tailwind v4 is configured via `@tailwindcss/postcss` and `@import "tailwindcss"` in `src/index.css`.
- Dark mode is enabled with `darkMode: 'class'` in `tailwind.config.js`. The `useDarkMode` hook toggles the `dark` class on `<html>`.
- PWA is configured in `vite.config.ts` with `vite-plugin-pwa`. Service worker is registered in `src/main.tsx`.
- For a real backend, replace functions in `src/api/products.ts` with Axios calls.

## Scripts

- `npm run dev` – start dev server
- `npm run build` – type-check and build
- `npm run preview` – preview built app
- `npm run lint` – run ESLint

## Accessibility & Responsiveness

- Layout adapts from mobile (collapsible sidebar) to desktop (two-column)
- All components support light and dark themes via Tailwind classes
