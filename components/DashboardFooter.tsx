import React from "react";
import Link from "next/link";

const DashboardFooter = () => {
  return (
    <footer className="dashboard-footer">
      {/* LEFT */}
      <div className="footer-left">
        <span className="footer-logo">NebulaWallet</span>
        <span className="footer-divider">•</span>
        <span className="footer-copy">
          © {new Date().getFullYear()} Secure Digital Assets
        </span>
      </div>

      {/* CENTER */}
      <div className="footer-center">
        <span className="status-dot" />
        <span className="status-text">Network: Bitcoin Mainnet</span>
      </div>

      {/* RIGHT */}
      <div className="footer-right">
        <Link href="/help">Help</Link>
        <Link href="/security">Security</Link>
        <Link href="/terms">Terms</Link>
      </div>
    </footer>
  );
};

export default DashboardFooter;
