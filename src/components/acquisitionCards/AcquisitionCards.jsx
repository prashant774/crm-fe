import React from "react";
import {
  FiShoppingCart,
  FiDollarSign,
  FiPackage,
  FiTag,
  FiStar,
  FiMapPin,
} from "react-icons/fi";
import styles from "./AcquisitionCards.module.css";

const CARDS = [
  {
    label: "Total Orders",
    value: "500",
    icon: FiShoppingCart,
    bg: "#eff6ff",
    color: "#3b82f6",
  },
  {
    label: "Total Sales",
    value: "$2,41,450",
    icon: FiDollarSign,
    bg: "#f0fdf4",
    color: "#10b981",
  },
  {
    label: "Units Sold",
    value: "2,481",
    icon: FiPackage,
    bg: "#fff7ed",
    color: "#f97316",
  },
  {
    label: "Leading Category",
    value: "Electronics",
    icon: FiTag,
    bg: "#fdf4ff",
    color: "#a855f7",
  },
  {
    label: "Leading Product",
    value: "Laptop",
    icon: FiStar,
    bg: "#fff1f2",
    color: "#f43f5e",
  },
  {
    label: "Leading Region",
    value: "South",
    icon: FiMapPin,
    bg: "#f0fdfa",
    color: "#14b8a6",
  },
];

export default function AcquisitionCards() {
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Acquisition</h3>
      <div className={styles.grid}>
        {CARDS.map(({ label, value, icon: Icon, bg, color }) => (
          <div key={label} className={styles.card}>
            <div className={styles.iconWrap} style={{ background: bg }}>
              <Icon size={20} color={color} />
            </div>
            <div className={styles.info}>
              <span className={styles.label}>{label}</span>
              <span className={styles.value}>{value}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
