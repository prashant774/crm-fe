# CRM Sales Dashboard — Frontend

React 18 single-page application for a CRM sales analytics dashboard. Connects to the Node.js backend API to display live data from a CSV dataset.

---

## Tech Stack

| Tool          | Purpose                         |
| ------------- | ------------------------------- |
| React 18      | UI library                      |
| Vite 5        | Build tool & dev server         |
| Redux Toolkit | Global state (auth, active tab) |
| react-redux   | React bindings for Redux        |
| recharts      | Chart components                |
| react-icons   | Icon library (Feather icons)    |
| CSS Modules   | Scoped component styles         |

---

## Project Structure

```
frontend/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                        # Entry point — Redux Provider
    ├── App.jsx                         # Auth gate (Login vs Dashboard)
    ├── services/
    │   └── api.js                      # All API calls to the backend
    ├── store/
    │   ├── index.js                    # Redux store
    │   ├── authSlice.js                # Auth state (isAuthenticated, userEmail)
    │   └── uiSlice.js                  # UI state (activeTab)
    ├── screens/
    │   ├── Login.jsx                   # Login page
    │   └── Dashboard.jsx               # Main dashboard screen
    ├── components/
    │   ├── sidebar/                    # Icon-only navigation sidebar
    │   ├── acquisitionCards/           # 6 KPI stat cards
    │   ├── chartsSection/              # 6 recharts charts
    │   ├── reportsTable/               # Paginated data table with filters
    │   └── askAI/                      # Floating AI chat assistant (FAB)
    └── style/
        ├── Dashboard.module.css
        └── Login.module.css
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running on `http://localhost:5000` (see [backend README](../backend/README.md))

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Opens at **http://localhost:5173** (or next available port).

### Build for Production

```bash
npm run build     # Output in dist/
npm run preview   # Preview the production build locally
```

---

## Features

### Authentication

- Login screen with email + password
- Credentials validated against the backend (`POST /api/auth/login`)
- Auth state persisted in Redux (`authSlice`)
- Logout button in the sidebar clears the session

**Demo credentials:**

```
Email:    admin@crm.com
Password: admin123
```

### Dashboard

- **Date range filter** — From / To date pickers in the header; click ✓ to apply, ✗ to clear. All widgets (KPI cards, charts, table) re-fetch with the applied date range.
- **Acquisition section** — 6 KPI cards (Total Orders, Total Sales, Units Sold, Leading Category, Leading Product, Leading Region) fetched from `/api/sales/kpi`
- **Charts section** — 6 charts in a responsive 3-column grid:
  - Sales by Region (vertical bar)
  - Sales by Category (donut pie)
  - Monthly Sales Trend (line)
  - Sales by Product — top 10 (horizontal bar)
  - Top Sales Reps by Revenue — top 6 (horizontal bar)
  - Sales by Region & Category (stacked bar)
- **Quick Reports table** — Paginated (10 per page, server-side), filterable by Region; shows Order ID, Date, Sales Rep, Region, Category, Sales Amount, Units Sold
- **Ask AI** — Floating chat assistant (bottom-right FAB) with keyword-matched responses about the dashboard data

---

## API Integration

All API calls are centralised in `src/services/api.js`. The base URL defaults to `http://localhost:5000/api`.

| Export                        | Endpoint                     |
| ----------------------------- | ---------------------------- |
| `loginUser(email, password)`  | `POST /auth/login`           |
| `fetchKPI(params)`            | `GET /sales/kpi`             |
| `fetchByRegion(params)`       | `GET /sales/by-region`       |
| `fetchByCategory(params)`     | `GET /sales/by-category`     |
| `fetchTopProducts(params)`    | `GET /sales/top-products`    |
| `fetchTrends(params)`         | `GET /sales/trends`          |
| `fetchTopReps(params)`        | `GET /sales/top-reps`        |
| `fetchRegionCategory(params)` | `GET /sales/region-category` |
| `fetchRaw(params)`            | `GET /sales/raw`             |

All `GET` functions accept an optional `{ from, to, region, page, limit }` params object. Empty/null values are stripped before the request is sent.
