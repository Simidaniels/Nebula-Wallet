import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/" className="brand-link" aria-label="Nebula Vault home">
        <div className="dashboard-brand-row">
          <div className="dashboard-brand-logo">N</div>
          <span className="logo">Nebula Vault</span>
        </div>
      </Link>

      <div className="nav-buttons">
        <Link href="/login">
          <button className="login">Login</button>
        </Link>
        <Link href="/register">
          <button className="get-started">Create Account</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
