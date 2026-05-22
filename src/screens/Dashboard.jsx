import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FiCheck, FiX } from "react-icons/fi";
import Sidebar from "../components/sidebar/Sidebar";
import AcquisitionCards from "../components/acquisitionCards/AcquisitionCards";
import ChartsSection from "../components/chartsSection/ChartsSection";
import ReportsTable from "../components/reportsTable/ReportsTable";
import styles from "../style/Dashboard.module.css";

export default function Dashboard() {
  const activeTab = useSelector((state) => state.ui.activeTab);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");

  const handleApply = () => {
    setAppliedFrom(fromDate);
    setAppliedTo(toDate);
  };
  const handleClear = () => {
    setFromDate("");
    setToDate("");
    setAppliedFrom("");
    setAppliedTo("");
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
          <AcquisitionCards fromDate={appliedFrom} toDate={appliedTo} />
          <ChartsSection fromDate={appliedFrom} toDate={appliedTo} />
          <ReportsTable fromDate={appliedFrom} toDate={appliedTo} />
        </div>
      </main>
    </div>
  );
}
