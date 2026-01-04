import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-brand">
          <h3>NebulaWallet</h3>
          <p>
            A secure, non-custodial Bitcoin wallet built for global access.
            Own your keys. Control your future.
          </p>
        </div>

        {/* PRODUCT */}
        <div className="footer-links">
          <h4>Product</h4>
          <ul>
            <li><Link href="/register">Create Wallet</Link></li>
            <li><Link href="/login">Login</Link></li>
            {/* <li><Link href="/dashboard">Dashboard</Link></li> */}
            <li><Link href="#">Live Bitcoin Price</Link></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li><Link href="#">About</Link></li>
            <li><Link href="#">Security</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Blog</Link></li>
          </ul>
        </div>

        {/* LEGAL */}
        <div className="footer-links">
          <h4>Legal</h4>
          <ul>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms of Service</Link></li>
            <li><Link href="#">Risk Disclosure</Link></li>
            <li><Link href="#">Compliance</Link></li>
          </ul>
        </div>
      </div>
      

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 NebulaWallet. All rights reserved.</p>
        <p className="footer-disclaimer">
          NebulaWallet is a self-custody wallet. We do not hold user funds.
          Cryptocurrency involves risk.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
