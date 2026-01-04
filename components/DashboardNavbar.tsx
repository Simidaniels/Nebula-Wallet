import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const DashboardNavbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("currentUser"); // Clear logged-in user
    router.push("/login"); // Redirect to login page
  };

  return (
    <nav className="dashboard-navbar">
      {/* LEFT */}
      <div className="nav-left">
        <Link href="/dashboard" className="logo">
          NebulaWallet
        </Link>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        {/* Search */}
        <input
          type="text"
          placeholder="Search transactions, blocks..."
          className="nav-search"
        />

        {/* Icons */}
        <button className="nav-icon" title="Notifications">🔔</button>
        <button className="nav-icon" title="Settings">⚙️</button>
        <button className="nav-icon profile" title="Profile">👤</button>

        {/* Logout */}
        <button
          className="nav-icon logout"
          title="Logout"
          onClick={handleLogout}
        >
          ➡️ Logout
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
