import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardLinksFooter from "../components/DashboardLinksFooter";
import Footer from "../components/DashboardFooter";

const PreferencesPage: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("User");
  const [currency, setCurrency] = useState("USD");
  const [compactView, setCompactView] = useState(false);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [themeMode, setThemeMode] = useState("Professional Dark");
  const [timeFormat, setTimeFormat] = useState("24-hour");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const name = currentUser?.username || currentUser?.name || "User";
    setUsername(name);

    setCurrency(localStorage.getItem(`pref_currency_${name}`) || "USD");
    setCompactView(localStorage.getItem(`pref_compact_${name}`) === "true");
    setPriceAlerts(localStorage.getItem(`pref_alerts_${name}`) !== "false");
    setWeeklySummary(localStorage.getItem(`pref_weekly_${name}`) !== "false");
    setThemeMode(localStorage.getItem(`pref_theme_${name}`) || "Professional Dark");
    setTimeFormat(localStorage.getItem(`pref_time_${name}`) || "24-hour");
  }, []);

  useEffect(() => {
    localStorage.setItem(`pref_currency_${username}`, currency);
    localStorage.setItem(`pref_compact_${username}`, String(compactView));
    localStorage.setItem(`pref_alerts_${username}`, String(priceAlerts));
    localStorage.setItem(`pref_weekly_${username}`, String(weeklySummary));
    localStorage.setItem(`pref_theme_${username}`, themeMode);
    localStorage.setItem(`pref_time_${username}`, timeFormat);
  }, [username, currency, compactView, priceAlerts, weeklySummary, themeMode, timeFormat]);

  return (
    <div className="dashboard-page">
      <DashboardNavbar onLogout={handleLogout} />

      <section className="dashboard-header">
        <h1>Preferences</h1>
        <p>
          Configure how Nebula Vault looks and behaves for{" "}
          <span className="username">{username}</span>
        </p>
      </section>

      <main className="dashboard-container">
        <section className="settings-overview-grid">
          <article className="settings-hero-card">
            <span className="settings-kicker">Workspace Profile</span>
            <h2>Build a dashboard that matches your operating style.</h2>
            <p>
              Tune interface density, reporting behavior, alerts, and regional
              formatting so your workspace stays clean, consistent, and easy to
              use during day-to-day treasury activity.
            </p>
            <div className="settings-hero-tags">
              <span>Saved per account</span>
              <span>Fast local updates</span>
              <span>Professional defaults</span>
            </div>
          </article>

          <article className="settings-summary-card">
            <h3>Current Profile</h3>
            <div className="settings-summary-list">
              <div>
                <strong>Display Currency</strong>
                <span>{currency}</span>
              </div>
              <div>
                <strong>Theme Mode</strong>
                <span>{themeMode}</span>
              </div>
              <div>
                <strong>Time Format</strong>
                <span>{timeFormat}</span>
              </div>
              <div>
                <strong>Dashboard Density</strong>
                <span>{compactView ? "Compact" : "Comfortable"}</span>
              </div>
            </div>
          </article>
        </section>

        <section className="settings-page-grid">
          <div className="settings-panel">
            <h2>Display & Regional Settings</h2>

            <div className="settings-row">
              <div>
                <h3>Default Currency</h3>
                <p>Control how balances, holdings, and summaries are valued.</p>
              </div>
              <select
                className="settings-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="NGN">NGN</option>
              </select>
            </div>

            <div className="settings-row">
              <div>
                <h3>Theme Profile</h3>
                <p>Choose the visual profile used across the workspace.</p>
              </div>
              <select
                className="settings-select"
                value={themeMode}
                onChange={(e) => setThemeMode(e.target.value)}
              >
                <option value="Professional Dark">Professional Dark</option>
                <option value="Executive Blue">Executive Blue</option>
                <option value="High Contrast">High Contrast</option>
              </select>
            </div>

            <div className="settings-row">
              <div>
                <h3>Time Format</h3>
                <p>Set the timestamp display used for charts and transactions.</p>
              </div>
              <select
                className="settings-select"
                value={timeFormat}
                onChange={(e) => setTimeFormat(e.target.value)}
              >
                <option value="24-hour">24-hour</option>
                <option value="12-hour">12-hour</option>
              </select>
            </div>

            <div className="settings-row">
              <div>
                <h3>Compact Dashboard</h3>
                <p>Reduce padding and spacing to surface more information at once.</p>
              </div>
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  checked={compactView}
                  onChange={() => setCompactView((prev) => !prev)}
                />
                <span>{compactView ? "Enabled" : "Disabled"}</span>
              </label>
            </div>
          </div>

          <div className="settings-panel">
            <h2>Notifications & Reporting</h2>

            <div className="settings-row">
              <div>
                <h3>Price Alerts</h3>
                <p>Receive market prompts when volatility or price movement increases.</p>
              </div>
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  checked={priceAlerts}
                  onChange={() => setPriceAlerts((prev) => !prev)}
                />
                <span>{priceAlerts ? "Enabled" : "Disabled"}</span>
              </label>
            </div>

            <div className="settings-row">
              <div>
                <h3>Weekly Workspace Summary</h3>
                <p>Keep a lightweight recap of balances, recent activity, and status.</p>
              </div>
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  checked={weeklySummary}
                  onChange={() => setWeeklySummary((prev) => !prev)}
                />
                <span>{weeklySummary ? "Enabled" : "Disabled"}</span>
              </label>
            </div>

            <div className="settings-note">
              <strong>Preference storage:</strong> Your current selections are
              saved locally in this browser for the signed-in account, making the
              workspace feel consistent every time you return.
            </div>
          </div>
        </section>

        <section className="settings-wide-grid">
          <article className="settings-panel">
            <h2>Workspace Guidance</h2>
            <div className="settings-insight-grid">
              <div className="insight-card">
                <strong>Analyst Mode</strong>
                <p>Use compact density and 24-hour time for high-frequency review.</p>
              </div>
              <div className="insight-card">
                <strong>Operations Mode</strong>
                <p>Keep alerts enabled to catch transfer and market changes quickly.</p>
              </div>
              <div className="insight-card">
                <strong>Executive Mode</strong>
                <p>Use simplified summaries and a clear base currency for reporting.</p>
              </div>
            </div>
          </article>

          <article className="settings-panel">
            <h2>Experience Principles</h2>
            <div className="security-checklist">
              <p>Keep balance reporting aligned with your operating currency.</p>
              <p>Use a denser layout only if your workflow benefits from faster scanning.</p>
              <p>Enable summaries and alerts if you manage multiple holdings or accounts.</p>
              <p>Review preferences regularly as your reporting habits change.</p>
            </div>
          </article>
        </section>
      </main>

      <DashboardLinksFooter />
      <Footer />
    </div>
  );
};

export default PreferencesPage;
