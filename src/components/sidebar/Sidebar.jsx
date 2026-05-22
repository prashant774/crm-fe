import React from "react";
import { MdDashboard } from "react-icons/md";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../store/uiSlice";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.ui.activeTab);

  const NavButton = ({ id, label, icon }) => {
    const isActive = activeTab === id;
    return (
      <button
        type="button"
        className={`${styles.sidebarItem} ${isActive ? styles.active : ""}`}
        onClick={() => dispatch(setActiveTab(id))}
        aria-pressed={isActive}
        title={label}
      >
        <span className={styles.icon}>{icon}</span>
      </button>
    );
  };

  return (
    <aside
      className={styles.sidebar}
      role="navigation"
      aria-label="Main sidebar"
    >
      <div className={styles.top}>
        <div className={styles.logo} />
      </div>

      <nav className={styles.nav}>
        <NavButton
          id="dashboard"
          label="Dashboard"
          icon={<MdDashboard size={20} />}
        />
        <NavButton
          id="settings"
          label="Settings"
          icon={<FiSettings size={20} />}
        />
      </nav>

      <div className={styles.bottom}>
        <button
          className={styles.logout}
          onClick={() => console.log("logout")}
          type="button"
          title="Logout"
        >
          <span className={styles.icon}>
            <FiLogOut size={18} />
          </span>
        </button>
      </div>
    </aside>
  );
}
