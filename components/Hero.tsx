import React from "react";
import { useRouter } from "next/router";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="hero">
      <div className="hero-shell">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-badge">Professional Bitcoin Treasury Workspace</span>

            <h1 className="hero-title">
              Operate your Bitcoin
              <br />
              <span>with clarity and control.</span>
            </h1>

            <p className="hero-description">
              Nebula Vault is a modern self-custody dashboard for monitoring balances,
              reviewing transactions, tracking market movement, and managing digital
              asset operations from one professional interface.
            </p>

            <ul className="hero-features">
              <li>Live wallet visibility with clear balance reporting</li>
              <li>Responsive transfer workflows for deposits and withdrawals</li>
              <li>Integrated market intelligence and performance tables</li>
              <li>Security-focused workspace built for daily use</li>
            </ul>

            <div className="hero-actions">
              <button
                className="hero-button primary"
                onClick={() => router.push("/register")}
              >
                Launch Workspace
              </button>

              <button
                className="hero-button secondary"
                onClick={() => router.push("/login")}
              >
                Sign In
              </button>
            </div>

            <div className="hero-trust">
              <span>Self-custody</span>
              <span>Operational clarity</span>
              <span>Professional dashboarding</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-wallet">
              <div className="wallet-header">
                <span>Nebula Vault</span>
                <span className="wallet-status">Mainnet Active</span>
              </div>

              <div className="wallet-balance">
                <p>Portfolio Balance</p>
                <h2>BTC 0.8421</h2>
                <span>$42,380.50 USD</span>
              </div>

              <div className="wallet-actions">
                <button>Send</button>
                <button>Receive</button>
                <button>Review</button>
              </div>

              <div className="hero-metrics">
                <div className="hero-metric">
                  <strong>24h Volume</strong>
                  <span>$1.28M</span>
                </div>
                <div className="hero-metric">
                  <strong>Transactions</strong>
                  <span>148</span>
                </div>
                <div className="hero-metric">
                  <strong>Status</strong>
                  <span>Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
