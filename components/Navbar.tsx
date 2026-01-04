import React, { useEffect, useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <nav className="navbar">
      <Link href="/">
        <h1 className="logo">NebulaWallet</h1>
      </Link>
      <div className="nav-buttons">
        {!user && (
          <>
            <Link href="/login">
              <button className="login">Login</button>
            </Link>
            <Link href="/register">
              <button className="get-started">Register</button>
            </Link>
          </>
        )}
        {user && <span className="welcome">Welcome, {user}</span>}
      </div>
    </nav>
  );
};

export default Navbar;
