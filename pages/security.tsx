import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardLinksFooter from "../components/DashboardLinksFooter";
import Footer from "../components/DashboardFooter";

const SecurityPage: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("User");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setUsername(currentUser?.username || currentUser?.name || "User");
  }, []);

  return (
    <div className="dashboard-page">
      <DashboardNavbar onLogout={handleLogout} />

      <section className="dashboard-header">
        <h1>Security</h1>
        <p>
          Review account protection, recovery hygiene, and operational safety for{" "}
          <span className="username">{username}</span>
        </p>
      </section>

      <main className="dashboard-container">
        <section className="settings-overview-grid">
          <article className="settings-hero-card">
            <span className="settings-kicker">Protection Center</span>
            <h2>Monitor the controls that keep your account and transfers safe.</h2>
            <p>
              Use this page to review session practices, password posture,
              withdrawal awareness, and recovery readiness. Strong security is not
              one setting, it is a disciplined workflow.
            </p>
            <div className="settings-hero-tags">
              <span>Account defense</span>
              <span>Operational hygiene</span>
              <span>Recovery awareness</span>
            </div>
          </article>

          <article className="settings-summary-card">
            <h3>Security Snapshot</h3>
            <div className="settings-summary-list">
              <div>
                <strong>Password Policy</strong>
                <span>Active</span>
              </div>
              <div>
                <strong>Session Scope</strong>
                <span>Browser Local</span>
              </div>
              <div>
                <strong>Recovery Review</strong>
                <span>Recommended</span>
              </div>
              <div>
                <strong>Transfer Awareness</strong>
                <span>Manual Verification</span>
              </div>
            </div>
          </article>
        </section>

        <section className="settings-page-grid">
          <div className="settings-panel">
            <h2>Account Protection Status</h2>
            <div className="security-list">
              <div className="security-item">
                <div>
                  <h3>Password Status</h3>
                  <p>Strong password policy is enabled for this account profile.</p>
                </div>
                <span className="security-badge success">Protected</span>
              </div>

              <div className="security-item">
                <div>
                  <h3>Session Handling</h3>
                  <p>Current access is stored locally for this browser session only.</p>
                </div>
                <span className="security-badge neutral">Local Session</span>
              </div>

              <div className="security-item">
                <div>
                  <h3>Recovery Preparedness</h3>
                  <p>Review backup procedures and offline recovery records regularly.</p>
                </div>
                <span className="security-badge warning">Review Needed</span>
              </div>

              <div className="security-item">
                <div>
                  <h3>Withdrawal Verification</h3>
                  <p>Destination addresses should be manually confirmed before submission.</p>
                </div>
                <span className="security-badge neutral">Manual Check</span>
              </div>
            </div>
          </div>

          <div className="settings-panel">
            <h2>Best Practice Checklist</h2>
            <div className="security-checklist">
              <p>Use a unique password exclusively for Nebula Vault.</p>
              <p>Store recovery materials offline and away from cloud notes.</p>
              <p>Verify wallet addresses character by character before withdrawal.</p>
              <p>Limit access to trusted devices and sign out after shared usage.</p>
              <p>Periodically test your recovery process in a secure environment.</p>
            </div>
          </div>
        </section>

        <section className="settings-wide-grid">
          <article className="settings-panel">
            <h2>Operational Security Guidance</h2>
            <div className="settings-insight-grid">
              <div className="insight-card">
                <strong>Before Sending Funds</strong>
                <p>Check the amount, network, and destination address before confirming.</p>
              </div>
              <div className="insight-card">
                <strong>When Using Shared Devices</strong>
                <p>Avoid persistent sessions and clear access immediately after use.</p>
              </div>
              <div className="insight-card">
                <strong>During Market Volatility</strong>
                <p>Slow down transaction review and verify details twice to reduce mistakes.</p>
              </div>
            </div>
          </article>

          <article className="settings-panel">
            <h2>Recovery & Governance</h2>
            <div className="security-checklist">
              <p>Keep governance for wallet access clear if multiple people operate the account.</p>
              <p>Document who can approve or execute withdrawals in your workflow.</p>
              <p>Maintain an offline record of critical access instructions and recovery steps.</p>
              <p>Review security posture after any browser, device, or team access change.</p>
            </div>
          </article>
        </section>
      </main>

      <DashboardLinksFooter />
      <Footer />
    </div>
  );
};

export default SecurityPage;
