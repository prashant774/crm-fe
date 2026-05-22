import React, { useState, useEffect } from "react";
import styles from "./ReportsTable.module.css";
import { fetchRaw } from "../../services/api";

/* ── Config ──────────────────────────────────────────────────── */
const REGIONS = ["All", "North", "South", "East", "West"];
const PAGE_SIZE = 10;

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
function fmtAmount(n) {
  return (
    "$" +
    Number(n).toLocaleString("en-US", {
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
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    totalSales: 0,
    totalUnits: 0,
  });
  const [loading, setLoading] = useState(true);

  /* Reset to page 1 when filters change */
  useEffect(() => {
    setCurrentPage(1);
  }, [regionFilter, fromDate, toDate]);

  /* Fetch whenever page or filters change */
  useEffect(() => {
    setLoading(true);
    fetchRaw({
      page: currentPage,
      limit: PAGE_SIZE,
      region: regionFilter !== "All" ? regionFilter : undefined,
      from: fromDate || undefined,
      to: toDate || undefined,
    })
      .then(({ data, pagination: pg }) => {
        setRows(data);
        setPagination(pg);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [currentPage, regionFilter, fromDate, toDate]);

  const { total, totalPages, totalSales, totalUnits } = pagination;
  const firstIdx = total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const lastIdx = Math.min(currentPage * PAGE_SIZE, total);

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Quick Reports</h3>

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
            <span className={styles.countBadge}>{total} records</span>
            <span className={styles.pageSizeBadge}>{PAGE_SIZE} per page</span>
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
              {loading ? (
                <tr>
                  <td colSpan={8} className={styles.empty}>
                    Loading…
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className={styles.empty}>
                    No records match the current filters.
                  </td>
                </tr>
              ) : (
                rows.map((row) => {
                  const rs = REGION_STYLE[row.region] || {};
                  const cs = CATEGORY_STYLE[row.category] || {};
                  const color = avatarColor(row.salesRep);
                  return (
                    <tr key={row.orderID} className={styles.row}>
                      <td className={styles.orderId}>#{row.orderID}</td>
                      <td className={styles.date}>{row.date}</td>
                      <td>
                        <div className={styles.repCell}>
                          <span
                            className={styles.avatar}
                            style={{ background: color }}
                          >
                            {initials(row.salesRep)}
                          </span>
                          <span className={styles.repName}>{row.salesRep}</span>
                        </div>
                      </td>
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
                      <td className={styles.product}>{row.product}</td>
                      <td>
                        <span
                          className={styles.categoryBadge}
                          style={{ background: cs.bg, color: cs.color }}
                        >
                          {cs.label}
                        </span>
                      </td>
                      <td className={`${styles.amount} ${styles.right}`}>
                        {fmtAmount(row.salesAmount)}
                      </td>
                      <td className={`${styles.units} ${styles.center}`}>
                        {row.unitsSold}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer: pagination + summary */}
        <div className={styles.footer}>
          <span className={styles.footerInfo}>
            {total === 0
              ? "No records"
              : `Showing ${firstIdx}–${lastIdx} of ${total} records`}
          </span>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageArrow}
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
              >
                ‹
              </button>

              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                // Show window of 7 pages centred around current page
                const half = 3;
                let start = Math.max(1, currentPage - half);
                const end = Math.min(totalPages, start + 6);
                start = Math.max(1, end - 6);
                return start + i;
              }).map((p) => (
                <button
                  key={p}
                  className={`${styles.pageBtn} ${p === currentPage ? styles.pageBtnActive : ""}`}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </button>
              ))}

              <button
                className={styles.pageArrow}
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
              >
                ›
              </button>
            </div>
          )}

          {total > 0 && (
            <div className={styles.footerTotals}>
              <span>
                Total Sales: <strong>{fmtAmount(totalSales)}</strong>
              </span>
              <span>
                Units: <strong>{totalUnits.toLocaleString()}</strong>
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
