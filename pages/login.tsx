import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const user = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!user) {
        setError("Invalid credentials or account not registered");
        setLoading(false);
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));

      if (remember) {
        localStorage.setItem("rememberUser", email);
      } else {
        localStorage.removeItem("rememberUser");
      }

      router.push("/dashboard");
    }, 1200); // simulate auth delay
  };

  return (
    <div>
      <Navbar />

      {/* ERROR POPUP */}
      {error && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Login Failed</h3>
            <p>{error}</p>
            <button onClick={() => setError("")}>Try Again</button>
          </div>
        </div>
      )}

      <div className="auth-container auth-complex">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to securely access your NebulaWallet</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
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

          <div className="auth-options">
            <label className="remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember me
            </label>

            <span className="forgot">Forgot password?</span>
          </div>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don&apos;t have an account?{" "}
            <a href="/register">Create one</a>
          </p>

          <div className="auth-security">
            🔒 Encrypted • Non-custodial • Secure access
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
