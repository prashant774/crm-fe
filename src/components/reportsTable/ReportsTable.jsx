import React, { useState, useMemo } from "react";
import styles from "./ReportsTable.module.css";

/* ── Hardcoded sample data (7 rows from CSV) ─────────────────── */
const RAW_DATA = [
  {
    id: 1001,
    date: "13-02-2024",
    region: "West",
    product: "Laptop",
    category: "Electronics",
    amount: 3809.61,
    units: 3,
    rep: "Matthew Craig",
  },
  {
    id: 1008,
    date: "18-01-2024",
    region: "South",
    product: "Desk",
    category: "Furniture",
    amount: 5960.24,
    units: 8,
    rep: "Johnathan Hall",
  },
  {
    id: 1022,
    date: "27-10-2024",
    region: "South",
    product: "Phone",
    category: "Electronics",
    amount: 6297.9,
    units: 7,
    rep: "Claire Fowler",
  },
  {
    id: 1036,
    date: "20-10-2024",
    region: "West",
    product: "Sofa",
    category: "Furniture",
    amount: 11756.16,
    units: 9,
    rep: "John Robinson",
  },
  {
    id: 1059,
    date: "27-10-2024",
    region: "North",
    product: "Phone",
    category: "Electronics",
    amount: 7347.4,
    units: 10,
    rep: "Patricia Dudley",
  },
  {
    id: 1074,
    date: "14-02-2024",
    region: "East",
    product: "Laptop",
    category: "Electronics",
    amount: 4392.84,
    units: 3,
    rep: "Cheryl Hill",
  },
  {
    id: 1090,
    date: "29-02-2024",
    region: "South",
    product: "Sofa",
    category: "Furniture",
    amount: 12952.3,
    units: 10,
    rep: "Austin Tucker",
  },
];

/* ── Config ──────────────────────────────────────────────────── */
const REGIONS = ["All", "North", "South", "East", "West"];

const REGION_STYLE = {
  North: { bg: "#f0fdf4", color: "#16a34a", dot: "#16a34a" },
  South: { bg: "#fff7ed", color: "#ea580c", dot: "#ea580c" },
  East: { bg: "#fdf4ff", color: "#9333ea", dot: "#9333ea" },
  West: { bg: "#eff6ff", color: "#2563eb", dot: "#2563eb" },
};

const CATEGORY_STYLE = {
  Electronics: { bg: "#eff6ff", color: "#2563eb", label: "Electronics" },
  Furniture: { bg: "#f0fdf4", color: "#16a34a", label: "Furniture" },
};

const AVATAR_COLORS = [
  "#3b82f6",
  "#10b981",
  "#f97316",
  "#a855f7",
  "#ef4444",
  "#0891b2",
  "#d97706",
];

/* ── Helpers ─────────────────────────────────────────────────── */

/** "DD-MM-YYYY" → Date object */
function parseCsvDate(str) {
  const [d, m, y] = str.split("-");
  return new Date(+y, +m - 1, +d);
}

/** "YYYY-MM-DD" → Date object, or null */
function parseInputDate(str) {
  if (!str) return null;
  const [y, m, d] = str.split("-");
  return new Date(+y, +m - 1, +d);
}

function fmtAmount(n) {
  return (
    "$" +
    n.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function initials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function avatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++)
    h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

/* ── Component ───────────────────────────────────────────────── */
export default function ReportsTable({ fromDate, toDate }) {
  const [regionFilter, setRegionFilter] = useState("All");

  const filtered = useMemo(() => {
    const from = parseInputDate(fromDate);
    const to = parseInputDate(toDate);
    return RAW_DATA.filter((row) => {
      if (regionFilter !== "All" && row.region !== regionFilter) return false;
      const d = parseCsvDate(row.date);
      if (from && d < from) return false;
      if (to && d > to) return false;
      return true;
    });
  }, [regionFilter, fromDate, toDate]);

  return (
    <section className={styles.section}>
      {/* ── Section header (same pattern as Acquisition) ── */}
      <h3 className={styles.sectionTitle}>Quick Reports</h3>

      {/* ── Table card ── */}
      <div className={styles.card}>
        {/* Filter bar */}
        <div className={styles.filterBar}>
          <div className={styles.filterLeft}>
            <label className={styles.filterLabel}>Region</label>
            <select
              className={styles.filterSelect}
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r === "All" ? "All Regions" : r}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterRight}>
            {fromDate && toDate ? (
              <span className={styles.datePill}>
                <span className={styles.datePillDot} />
                {fromDate} → {toDate}
              </span>
            ) : (
              <span className={styles.dateHint}>No date filter applied</span>
            )}
            <span className={styles.countBadge}>
              {filtered.length} / {RAW_DATA.length} records
            </span>
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Sales Rep</th>
                <th>Region</th>
                <th>Product</th>
                <th>Category</th>
                <th className={styles.right}>Sales Amount</th>
                <th className={styles.center}>Units Sold</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className={styles.empty}>
                    No records match the current filters.
                  </td>
                </tr>
              ) : (
                filtered.map((row) => {
                  const rs = REGION_STYLE[row.region];
                  const cs = CATEGORY_STYLE[row.category];
                  const color = avatarColor(row.rep);
                  return (
                    <tr key={row.id} className={styles.row}>
                      {/* Order ID */}
                      <td className={styles.orderId}>#{row.id}</td>

                      {/* Date */}
                      <td className={styles.date}>{row.date}</td>

                      {/* Sales Rep */}
                      <td>
                        <div className={styles.repCell}>
                          <span
                            className={styles.avatar}
                            style={{ background: color }}
                          >
                            {initials(row.rep)}
                          </span>
                          <span className={styles.repName}>{row.rep}</span>
                        </div>
                      </td>

                      {/* Region */}
                      <td>
                        <span
                          className={styles.regionBadge}
                          style={{ background: rs.bg, color: rs.color }}
                        >
                          <span
                            className={styles.regionDot}
                            style={{ background: rs.dot }}
                          />
                          {row.region}
                        </span>
                      </td>

                      {/* Product */}
                      <td className={styles.product}>{row.product}</td>

                      {/* Category */}
                      <td>
                        <span
                          className={styles.categoryBadge}
                          style={{ background: cs.bg, color: cs.color }}
                        >
                          {cs.label}
                        </span>
                      </td>

                      {/* Sales Amount */}
                      <td className={`${styles.amount} ${styles.right}`}>
                        {fmtAmount(row.amount)}
                      </td>

                      {/* Units */}
                      <td className={`${styles.units} ${styles.center}`}>
                        {row.units}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer summary */}
        {filtered.length > 0 && (
          <div className={styles.footer}>
            <span>
              Total Sales:{" "}
              <strong>
                {fmtAmount(filtered.reduce((s, r) => s + r.amount, 0))}
              </strong>
            </span>
            <span>
              Total Units:{" "}
              <strong>{filtered.reduce((s, r) => s + r.units, 0)}</strong>
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
