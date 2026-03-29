import React from "react";
import Link from "next/link";

const DashboardFooter = () => {
  return (
    <footer className="dashboard-footer">
      <div className="footer-left">
        <span className="footer-logo">Nebula Vault</span>
        <span className="footer-divider">&bull;</span>
        <span className="footer-copy">
          &copy; {new Date().getFullYear()} Secure Digital Assets
        </span>
      </div>

      <div className="footer-center">
        <span className="status-dot" />
        <span className="status-text">Network: Bitcoin Mainnet</span>
      </div>

      <div className="footer-right">
        <Link href="/help">Help</Link>
        <Link href="/security">Security</Link>
        <Link href="/terms">Terms</Link>
      </div>
    </footer>
  );
};

export default DashboardFooter;
