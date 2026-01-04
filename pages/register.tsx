import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useRouter } from "next/router";

const Register: NextPage = () => {
  const router = useRouter();

  // New state for username
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const isStrongPassword = (password: string) => {
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return strongRegex.test(password);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      if (!isStrongPassword(password)) {
        setError(
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
        );
        setLoading(false);
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = users.find((u: any) => u.email === email);

      if (userExists) {
        setError("User already exists. Please login instead.");
        setLoading(false);
        return;
      }

      const newUser = { username, name, email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      router.push("/login");
    }, 1200);
  };

  return (
    <div>
      <Navbar />

      {/* ERROR POPUP */}
      {error && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Registration Error</h3>
            <p>{error}</p>
            <button onClick={() => setError("")}>Try Again</button>
          </div>
        </div>
      )}

      <div className="auth-container auth-complex">
        <div className="auth-header">
          <h1>Create Your Account</h1>
          <p>Sign up to securely manage your Bitcoin with NebulaWallet</p>
        </div>

        <form className="auth-form" onSubmit={handleRegister}>
          {/* Username Input */}
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Full Name Input */}
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label>Password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="input-group">
            <label>Confirm Password</label>
            <div className="password-field">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>

          <div className="auth-security">
            🔒 Encrypted • Non-custodial • Secure access
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
