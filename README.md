# Personal Expense Tracker

A React single-page application for logging income and expenses, watching your running balance, and understanding spending habits at a glance. All data is stored privately in your browser via localStorage, so your history survives page refreshes without any account or server. The dashboard bundles a prominent balance summary, a validated add-transaction form, filterable/sortable transaction history, a category spending chart, and a monthly budget warning — plus a dedicated monthly summary page.

## Features

### Core

- **Add transactions** with type (income/expense), amount, category, description, and date, via a controlled form with validation (rejects empty descriptions, non-positive/invalid amounts, missing category or date).
- **Prominent running balance** — income − expenses — shown with income and expense totals on the dashboard.
- **Transaction list** rendered with `.map()` and stable generated-id keys, with per-entry delete buttons.
- **Filter & sort** — filter by category, sort by date (newest/oldest) or amount (high/low).
- **localStorage persistence** — transactions and the budget limit are saved on every change and restored on load (corrupt storage data falls back to defaults).

### Stretch goals

- **Expense chart** — a donut (pie) chart of spending by category built with Recharts, with an empty state before any expenses exist.
- **Monthly summary view** — a separate routed page (React Router) with total income, expenses, net balance, and transaction count per calendar month.
- **Budget limit & warning** — set a monthly limit; the app shows a green "on track" meter normally and a red warning banner when current-month expenses exceed it.

## Technologies

- [React 19](https://react.dev/) — functional components only, with `useState`, `useEffect`, and `useMemo` hooks
- [React Router 7](https://reactrouter.com/) — client-side routing between Dashboard and Monthly Summary
- [Recharts 3](https://recharts.org/) — lightweight charting for the category breakdown
- [Vite](https://vite.dev/) — dev server and production bundler
- Plain CSS (flexbox/grid, custom properties, responsive breakpoints) — no CSS framework
- [ESLint 9](https://eslint.org/) with React Hooks and React Refresh plugins

## Project structure

```
personal-expense-tracker/
├── index.html                  # Single HTML entry point
├── package.json
├── vite.config.js
├── eslint.config.js
└── src/
    ├── main.jsx                # Mounts <App /> inside BrowserRouter + StrictMode
    ├── App.jsx                 # Owns all state, routing, and callbacks
    ├── index.css               # Global responsive styles
    ├── components/
    │   ├── Header.jsx          # Title + navigation links
    │   ├── BalanceSummary.jsx  # Prominent balance / income / expenses cards
    │   ├── TransactionForm.jsx # Controlled add-transaction form with validation
    │   ├── TransactionList.jsx # Empty state + .map() over transactions
    │   ├── TransactionItem.jsx # Single row with delete callback
    │   ├── CategoryFilter.jsx  # Category filter + sort mode selects
    │   ├── BudgetSettings.jsx  # Monthly budget limit input + presets
    │   ├── BudgetWarning.jsx   # Warning / on-track banner with progress meter
    │   ├── ExpenseChart.jsx    # Recharts donut of expenses by category
    │   └── MonthlySummaryTable.jsx
    ├── pages/
    │   ├── DashboardPage.jsx   # Main view composing the above components
    │   └── MonthlyPage.jsx     # Monthly summary view
    ├── hooks/
    │   └── useLocalStorage.js  # useState that syncs to localStorage via useEffect
    └── utils/
        ├── categories.js       # Transaction types and category lists
        ├── format.js           # Currency and timezone-safe date formatting
        ├── storage.js          # Safe localStorage JSON read/write helpers
        └── transactions.js     # Create/filter/sort/aggregate transaction logic
```

## Setup

```bash
npm install    # install dependencies
npm run dev    # start the dev server (defaults to http://localhost:5173)
```

Other scripts:

```bash
npm run build    # production build into dist/
npm run preview  # serve the production build locally
npm run lint     # ESLint check over the source
```

## Screenshots




1. **Dashboard** — balance summary, add-transaction form, transaction list, and chart.
   `![Dashboard screenshot](screenshots/dashboard.png)`
2. **Budget warning** — the red over-budget state with the progress meter.
   `![Budget warning screenshot](screenshots/budget-warning.png)`
3. **Monthly summary** — per-month income, expenses, and net balance table.
   `![Monthly summary screenshot](screenshots/monthly-summary.png)`

   ## Live Demo
   https://expense-tracker-theta-roan-51.vercel.app


## Known limitations

- **Single-currency (INR)** — amounts are formatted as Indian Rupees (₹); there is no currency selection or conversion.
- **Browser-local only** — data lives in one browser's localStorage; it is not synced across devices or browsers, and clearing site data erases it. Private-browsing modes may block persistence.
- **No editing** — transactions can be added and deleted but not edited after the fact.
- **Budget is calendar-month** — the budget compares against the current calendar month only; custom budget periods (weekly, per-category) are not supported.
- **Decimal amounts** — monetary values use plain JavaScript numbers, which is fine at this scale but not suited to high-precision financial accounting.
- **No tests or auth** — the app has no automated test suite and no user accounts.
