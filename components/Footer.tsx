import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="dashboard-links-brand">
          <div className="dashboard-brand-row">
            <div className="dashboard-brand-logo">N</div>
            <span className="dashboard-brand-name">Nebula Vault</span>
          </div>

          <p className="dashboard-brand-description">
            A polished Bitcoin operations workspace for self-custody, transfer
            review, account protection, and market monitoring.
          </p>

          <div className="dashboard-trust-badges">
            <span className="dashboard-trust-badge">Self-Custody</span>
            <span className="dashboard-trust-badge">Operations Ready</span>
            <span className="dashboard-trust-badge">Bitcoin Focused</span>
          </div>
        </div>

        <div className="footer-links">
          <h4>Platform</h4>
          <ul>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/preferences">Preferences</Link></li>
            <li><Link href="/security">Security</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Access</h4>
          <ul>
            <li><Link href="/register">Create Account</Link></li>
            <li><Link href="/login">Sign In</Link></li>
            <li><Link href="#">Support Desk</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Compliance</h4>
          <ul>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms of Service</Link></li>
            <li><Link href="#">Risk Disclosure</Link></li>
            <li><Link href="#">Security Standards</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Nebula Vault. All rights reserved.</p>
        <p className="footer-disclaimer">
          Nebula Vault is a self-custody product experience. Users remain
          responsible for private key management and transaction review.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
