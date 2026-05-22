# Demo Video Script — CRM Sales Dashboard

**Estimated Duration:** 6–8 minutes  
**Recording tip:** Keep the browser at 100% zoom, backend running on port 5000, frontend on port 5173/5174.

---

## Before You Hit Record

- [ ] Backend running: `cd backend && node server.js`
- [ ] Frontend running: `cd frontend && npm run dev`
- [ ] Browser open at `http://localhost:5173` (or 5174)
- [ ] Browser zoom at 100%
- [ ] Both GitHub repos open in tabs: crm-fe and crm-be

---

## SECTION 1 — Introduction (30 seconds)

**What to show:** Browser on the login page

**What to say:**
> "Hi, I'm [Your Name]. This is my submission for the Full Stack CRM Sales Dashboard assignment. I've built a complete full-stack application — a React 18 frontend connected to a Node.js Express backend that reads a 500-row CSV sales dataset. I've covered all core requirements plus the bonus features. Let me walk you through the entire application."

---

## SECTION 2 — Architecture Overview (45 seconds)

**What to show:** Briefly flip between the two GitHub repos, then back to the app

**What to say:**
> "Before I demo the app, a quick architecture overview. The project is split into two repositories — the frontend on crm-fe and the backend on crm-be, both on GitHub."

> "The backend is a Node.js Express server running on port 5000. It reads the CSV file on the first request, caches all 500 rows in memory, and exposes 9 REST endpoints. The frontend is a Vite React app — it calls these endpoints for every piece of data on the page. Nothing on the frontend is hardcoded. Redux Toolkit manages authentication and UI state."

---

## SECTION 3 — Authentication (60 seconds)

**What to show:** Login page

**What to say:**
> "The app starts at the login screen. Let me first try wrong credentials to show the error handling."

*(Type any wrong email/password and submit)*

> "The frontend calls POST /api/auth/login on the backend. The server returns a 401 and we show the error banner immediately."

> "The key point here is that credentials are stored only on the server — the frontend has zero knowledge of the valid email or password. I used Node's built-in crypto.timingSafeEqual for the comparison, which prevents timing-based attacks."

*(Now type: admin@crm.com / admin123 and log in)*

> "On success the backend returns the user's email and name, and we store the authenticated state in Redux. The logout button in the sidebar dispatches a Redux action that clears this state and sends you back to the login screen."

---

## SECTION 4 — KPI Acquisition Cards (45 seconds)

**What to show:** Top of the dashboard — the 6 stat cards

**What to say:**
> "After login we land on the main dashboard. At the top are six KPI acquisition cards — Total Orders, Total Sales, Units Sold, Leading Category, Leading Product, and Leading Region."

> "Every value here is live data from the backend's /api/sales/kpi endpoint. When the page loads, a single API call returns all six metrics calculated from the full 500-row dataset. You can see 500 orders, over $1.7 million in total sales, South as the leading region, and Electronics as the leading category."

---

## SECTION 5 — Charts Section (90 seconds)

**What to show:** Scroll through all 6 charts slowly, hover on a few bars/slices

**What to say:**
> "Below the KPI cards are six charts, each powered by a separate backend endpoint."

*(Point to each as you go)*

> "First — Sales by Region as a vertical bar chart. South leads, followed by East, North, and West. This comes from /api/sales/by-region."

> "Second — Sales by Category as a donut pie chart. Electronics accounts for roughly 55% of revenue, Furniture the remaining 45%. From /api/sales/by-category."

> "Third — Monthly Sales Trend as a line chart showing all 12 months of 2024. You can see the seasonal pattern — peaks in April, May, and November. From /api/sales/trends."

> "Fourth — Sales by Product, top 10 by revenue, as a horizontal bar. Laptop is the clear leader, followed by Sofa and Phone. From /api/sales/top-products."

> "Fifth — Top 6 Sales Reps by revenue, also a horizontal bar. From /api/sales/top-reps."

> "Sixth — a stacked bar showing how Electronics and Furniture revenue breaks down within each region. South and East have the most balanced split. From /api/sales/region-category."

---

## SECTION 6 — Date Range Filter (60 seconds)

**What to show:** Use the From/To date pickers in the header, apply a filter, watch the whole page update

**What to say:**
> "Now let me show the global date range filter at the top of the dashboard. I'll set it from January 1st to March 31st 2024 and click the Apply button."

*(Apply the filter)*

> "Notice every widget on the page updated simultaneously — the KPI cards now reflect only Q1 data, all six charts have re-drawn with filtered data, and the table below has updated too. The date parameters are sent as query strings to every backend endpoint on each fetch."

> "Click the X to clear and everything returns to the full dataset."

*(Clear the filter)*

---

## SECTION 7 — Quick Reports Table (60 seconds)

**What to show:** Scroll to the table, use the region filter, navigate pages

**What to say:**
> "The Quick Reports table at the bottom shows raw order data. This uses server-side pagination — the backend handles slicing the data, so only 10 records are sent per request instead of all 500."

> "Let me filter by the South region."

*(Select South from the dropdown)*

> "The backend filters and re-paginates. The footer shows 134 matching records across 14 pages, along with the total sales and total units for all South records — not just this page."

*(Click to page 2 or 3)*

> "Each row shows Order ID, Date, Sales Rep with their avatar initials, Region and Category as colour-coded badges, Sales Amount, and Units Sold."

*(Clear the region filter)*

---

## SECTION 8 — Bonus: Ask AI Chat (45 seconds)

**What to show:** Click the floating button bottom-right, ask a question

**What to say:**
> "As a bonus feature I built an AI chat assistant — the floating button at the bottom right of the screen."

*(Click to open the chat panel)*

> "On first open it shows suggestion chips for common questions. Let me ask about the top products."

*(Click the suggestion chip or type "top products")*

> "It responds with a ranked breakdown of the top products by revenue. The assistant understands questions about regions, categories, sales reps, totals, and monthly trends."

*(Ask one more question — e.g. "best region")*

> "This is a keyword-matched knowledge base built from the dashboard data — a foundation that can easily be replaced with a real LLM API call in a production version."

---

## SECTION 9 — Code Structure (30 seconds)

**What to show:** Briefly flip to VS Code or the GitHub repo file tree

**What to say:**
> "Quickly on the code structure — the frontend uses CSS Modules for scoped styles, Redux Toolkit for state management, and all API calls are centralised in a single services/api.js file. The backend separates concerns with a csvLoader utility for data access and separate route files for auth and sales."

---

## SECTION 10 — Closing (30 seconds)

**What to show:** Back to the live dashboard

**What to say:**
> "To summarise — this is a complete full-stack CRM dashboard: React 18 frontend, Node.js Express backend, CSV as the data source with no database. I've implemented all required features — the backend endpoints, KPI cards, three required charts plus three extras, a paginated and filterable data table — plus the bonus authentication with backend credential storage and the AI chat assistant."

> "Both GitHub repositories have full READMEs with setup instructions and API documentation. I've also written a separate enterprise-grade implementation plan covering what I'd build next to take this to production. Thank you."

---

## Quick Reference — Things to Demo

| Feature | Where | Endpoint |
|---------|-------|----------|
| Login error | Login page | POST /api/auth/login |
| Login success | Login page | POST /api/auth/login |
| KPI cards | Top of dashboard | GET /api/sales/kpi |
| Sales by Region chart | Charts section | GET /api/sales/by-region |
| Sales by Category chart | Charts section | GET /api/sales/by-category |
| Monthly Trend chart | Charts section | GET /api/sales/trends |
| Top Products chart | Charts section | GET /api/sales/top-products |
| Top Reps chart | Charts section | GET /api/sales/top-reps |
| Region × Category chart | Charts section | GET /api/sales/region-category |
| Date range filter | Dashboard header | All endpoints (from/to params) |
| Table pagination | Quick Reports | GET /api/sales/raw |
| Region filter on table | Quick Reports | GET /api/sales/raw?region=X |
| Ask AI chat | Bottom-right FAB | (client-side) |
