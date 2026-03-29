import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

type DashboardNavbarProps = {
  onLogout: () => void;
};

const BellIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 3a4 4 0 0 0-4 4v1.14a7 7 0 0 1-1.63 4.5L5 14.25V16h14v-1.75l-1.37-1.61A7 7 0 0 1 16 8.14V7a4 4 0 0 0-4-4Zm0 18a3 3 0 0 0 2.82-2H9.18A3 3 0 0 0 12 21Z"
      fill="currentColor"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="m19.14 12.94.86-1.49-1.41-2.44-1.71.2a5.94 5.94 0 0 0-1.03-.6l-.68-1.58h-2.82l-.68 1.58c-.36.15-.71.35-1.03.6l-1.71-.2L4.86 11.45l.86 1.49c-.03.31-.03.6 0 .91l-.86 1.49 1.41 2.44 1.71-.2c.32.25.67.45 1.03.6l.68 1.58h2.82l.68-1.58c.36-.15.71-.35 1.03-.6l1.71.2 1.41-2.44-.86-1.49c.03-.31.03-.6 0-.91ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z"
      fill="currentColor"
    />
  </svg>
);

const ProfileIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
      fill="currentColor"
    />
  </svg>
);

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ onLogout }) => {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    onLogout();
    router.push("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="dashboard-navbar">
      <button
        type="button"
        className="dashboard-brand-button"
        onClick={() => router.push("/dashboard")}
        aria-label="Go to dashboard"
      >
        <div className="dashboard-brand-row">
          <div className="dashboard-brand-logo">N</div>
          <span className="logo">Nebula Vault</span>
        </div>
      </button>

      <div className="nav-right">
        <div className="dashboard-search-wrap">
          <input
            type="text"
            placeholder="Search transactions, blocks, wallets..."
            className="nav-search"
          />
        </div>

        <button className="nav-icon" title="Notifications" aria-label="Notifications">
          <BellIcon />
        </button>

        <div className="dropdown-wrapper" ref={settingsRef}>
          <button
            className="nav-icon"
            title="Settings"
            aria-label="Settings"
            onClick={() => setShowSettings((prev) => !prev)}
          >
            <SettingsIcon />
          </button>

          {showSettings && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => router.push("/security")}
              >
                Security
              </button>
              <button
                className="dropdown-item"
                onClick={() => router.push("/preferences")}
              >
                Preferences
              </button>
              <button className="dropdown-item logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="dropdown-wrapper" ref={profileRef}>
          <button
            className="nav-icon profile"
            title="Profile"
            aria-label="Profile"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            <ProfileIcon />
          </button>

          {showProfile && (
            <div className="dropdown-menu left">
              <button className="dropdown-item">Change Username</button>
              <button className="dropdown-item">Change Password</button>
              <button className="dropdown-item">Verify Email</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
