import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FiCheck, FiX } from "react-icons/fi";
import Sidebar from "../components/sidebar/Sidebar";
import AcquisitionCards from "../components/acquisitionCards/AcquisitionCards";
import styles from "../style/Dashboard.module.css";

export default function Dashboard() {
  const activeTab = useSelector((state) => state.ui.activeTab);

  const today = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState("2022-06-08");
  const [toDate, setToDate] = useState("2022-07-21");
  const [applied, setApplied] = useState(false);

  const handleApply = () => setApplied(true);
  const handleClear = () => {
    setFromDate("");
    setToDate("");
    setApplied(false);
  };

  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <div className={styles.pageHeader}>
            <h2 className={styles.pageTitle}>Dashboard</h2>
            <div className={styles.dateRange}>
              <div className={styles.dateField}>
                <span className={styles.dateLabel}>From Date</span>
                <input
                  type="date"
                  className={styles.dateInput}
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div className={styles.dateField}>
                <span className={styles.dateLabel}>To Date</span>
                <input
                  type="date"
                  className={styles.dateInput}
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
              {fromDate && toDate && (
                <div className={styles.dateBtnGroup}>
                  <button
                    className={`${styles.dateBtn} ${styles.applyBtn}`}
                    onClick={handleApply}
                    title="Apply"
                  >
                    <FiCheck size={11} />
                  </button>
                  <button
                    className={`${styles.dateBtn} ${styles.clearBtn}`}
                    onClick={handleClear}
                    title="Clear"
                  >
                    <FiX size={11} />
                  </button>
                </div>
              )}
            </div>
          </div>
          <AcquisitionCards />
        </div>
      </main>
    </div>
  );
}
