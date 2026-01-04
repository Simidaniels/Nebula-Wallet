import React from "react";
import { useRouter } from "next/router";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="hero">
      <div className="hero-content">
        {/* LEFT CONTENT */}
        <div className="hero-text">
          <span className="hero-badge">Built for the Future of Bitcoin</span>

          <h1 className="hero-title">
            Own Your Bitcoin.
            <br />
            <span>Anywhere. Anytime.</span>
          </h1>

          <p className="hero-description">
            NebulaWallet is a secure, non-custodial Bitcoin wallet designed for
            speed, simplicity, and global access. Buy, send, receive, and track
            Bitcoin seamlessly — without borders or intermediaries.
          </p>

          <ul className="hero-features">
            <li>🔐 Non-custodial security — you own your keys</li>
            <li>⚡ Fast transactions with real-time tracking</li>
            <li>🌍 Borderless access — anywhere in the world</li>
            <li>📊 Live Bitcoin price & portfolio insights</li>
          </ul>

          <div className="hero-actions">
            <button
              className="hero-button primary"
              onClick={() => router.push("/register")}
            >
              Create Free Wallet
            </button>

            <button
              className="hero-button secondary"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          </div>

          <div className="hero-trust">
            <span>🔒 Bank-grade encryption</span>
            <span>🚀 No setup fees</span>
            <span>🌐 Global support</span>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="hero-visual">
          <div className="hero-wallet">
            <div className="wallet-header">
              <span>NebulaWallet</span>
              <span className="wallet-status">● Secure</span>
            </div>

            <div className="wallet-balance">
              <p>Total Balance</p>
              <h2>₿ 0.8421</h2>
              <span>$42,380.50</span>
            </div>

            <div className="wallet-actions">
              <button>Send</button>
              <button>Receive</button>
              <button>Buy</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
