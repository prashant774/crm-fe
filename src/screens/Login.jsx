import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { login } from "../store/authSlice";
import { loginUser } from "../services/api";
import styles from "../style/Login.module.css";

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    loginUser(email.trim(), password)
      .then((data) => dispatch(login(data.email)))
      .catch((err) => {
        setError(err.error || "Invalid email or password. Please try again.");
        setLoading(false);
      });
  }

  return (
    <div className={styles.page}>
      {/* Background decoration */}
      <div className={styles.bgBlob1} />
      <div className={styles.bgBlob2} />

      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logoWrap}>
          <div className={styles.logo} />
        </div>

        {/* Heading */}
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to your CRM Dashboard</p>

        {/* Error */}
        {error && (
          <div className={styles.errorBanner}>
            <FiAlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              Email address
            </label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>
                <FiMail size={15} />
              </span>
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="admin@crm.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>
                <FiLock size={15} />
              </span>
              <input
                id="password"
                type={showPwd ? "text" : "password"}
                className={styles.input}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPwd((v) => !v)}
                tabIndex={-1}
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                {showPwd ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? <span className={styles.spinner} /> : "Sign In"}
          </button>
        </form>

        {/* Demo hint */}
        <div className={styles.hint}>
          <span className={styles.hintLabel}>Demo credentials</span>
          <div className={styles.hintRow}>
            <span className={styles.hintKey}>Email</span>
            <code className={styles.hintVal}>admin@crm.com</code>
          </div>
          <div className={styles.hintRow}>
            <span className={styles.hintKey}>Password</span>
            <code className={styles.hintVal}>admin123</code>
          </div>
        </div>
      </div>
    </div>
  );
}
