import React, { useState, useEffect } from "react";
import {
  FiShoppingCart,
  FiDollarSign,
  FiPackage,
  FiTag,
  FiStar,
  FiMapPin,
} from "react-icons/fi";
import styles from "./AcquisitionCards.module.css";
import { fetchKPI } from "../../services/api";

const CARD_META = [
  {
    key: "totalOrders",
    label: "Total Orders",
    icon: FiShoppingCart,
    bg: "#eff6ff",
    color: "#3b82f6",
  },
  {
    key: "totalSales",
    label: "Total Sales",
    icon: FiDollarSign,
    bg: "#f0fdf4",
    color: "#10b981",
  },
  {
    key: "totalUnits",
    label: "Units Sold",
    icon: FiPackage,
    bg: "#fff7ed",
    color: "#f97316",
  },
  {
    key: "leadingCategory",
    label: "Leading Category",
    icon: FiTag,
    bg: "#fdf4ff",
    color: "#a855f7",
  },
  {
    key: "leadingProduct",
    label: "Leading Product",
    icon: FiStar,
    bg: "#fff1f2",
    color: "#f43f5e",
  },
  {
    key: "bestRegion",
    label: "Leading Region",
    icon: FiMapPin,
    bg: "#f0fdfa",
    color: "#14b8a6",
  },
];

function formatValue(key, raw) {
  if (raw === undefined || raw === null) return "—";
  if (key === "totalSales")
    return (
      "$" +
      Number(raw).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  if (key === "totalOrders" || key === "totalUnits")
    return Number(raw).toLocaleString("en-US");
  return raw;
}

export default function AcquisitionCards({ fromDate, toDate }) {
  const [kpi, setKpi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchKPI({ from: fromDate, to: toDate })
      .then(setKpi)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [fromDate, toDate]);

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Acquisition</h3>
      <div className={styles.grid}>
        {CARD_META.map(({ key, label, icon: Icon, bg, color }) => (
          <div key={key} className={styles.card}>
            <div className={styles.iconWrap} style={{ background: bg }}>
              <Icon size={20} color={color} />
            </div>
            <div className={styles.info}>
              <span className={styles.label}>{label}</span>
              <span className={styles.value}>
                {loading ? "…" : formatValue(key, kpi?.[key])}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
