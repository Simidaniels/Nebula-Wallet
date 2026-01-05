import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const DashboardNavbar = () => {
  const router = useRouter();

  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  /* Close dropdowns when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setShowProfile(false);
      }
      if (
        settingsRef.current &&
        !settingsRef.current.contains(e.target as Node)
      ) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="dashboard-navbar">
      {/* LEFT */}
      {/* <div className="nav-left">
        <Link href="/dashboard" className="logo">
          NebulaWallet
        </Link>
      </div> */}


          <div className="dashboard-brand-row">
            <div className="dashboard-brand-logo">N</div>
            <span className="logo">NebulaWallet</span>
          </div>

      {/* RIGHT */}
      <div className="nav-right">
        {/* Search */}
        <input
          type="text"
          placeholder="Search transactions, blocks..."
          className="nav-search"
        />

        {/* Notifications */}
        <button className="nav-icon" title="Notifications">
          🔔
        </button>

        {/* Settings Dropdown */}
        <div className="dropdown-wrapper" ref={settingsRef}>
          <button
            className="nav-icon"
            title="Settings"
            onClick={() => setShowSettings(!showSettings)}
          >
            ⚙️
          </button>

          {showSettings && (
            <div className="dropdown-menu">
              <button className="dropdown-item">Security</button>
              <button className="dropdown-item">Preferences</button>
              <button className="dropdown-item logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="dropdown-wrapper" ref={profileRef}>
          <button
            className="nav-icon profile"
            title="Profile"
            onClick={() => setShowProfile(!showProfile)}
          >
            👤
          </button>

          {showProfile && (
            <div className="dropdown-menu left">
              <button className="dropdown-item">Change Username</button>
              <button className="dropdown-item">Change Password</button>
              <button className="dropdown-item">Verify Email</button>
              {/* Add more profile options here */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
