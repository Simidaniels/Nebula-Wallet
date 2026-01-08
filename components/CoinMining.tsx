import React, { useState, useEffect } from "react";

interface CoinMiningProps {
  onWithdraw?: (amount: number) => void;
}

// FAST TESTING SETTINGS
const MINING_INCREMENT = 0.0000001; // BTC per interval (slightly bigger for faster accumulation)
const MINING_INTERVAL = (3 * 60 * 60 * 1000); // 100 ms interval
const WITHDRAW_THRESHOLD = 0.00001; // Minimum yield to withdraw

const CoinMining: React.FC<CoinMiningProps> = ({ onWithdraw }) => {
  const [isMining, setIsMining] = useState(false);
  const [dailyYield, setDailyYield] = useState(0);

  // Load mining state from localStorage
  useEffect(() => {
    const storedIsMining = localStorage.getItem("isMining") === "true";
    const storedYield = parseFloat(localStorage.getItem("dailyYield") || "0");
    const lastUpdate = parseInt(localStorage.getItem("lastUpdate") || "0", 10);

    setIsMining(storedIsMining);
    setDailyYield(storedYield);

    if (storedIsMining && lastUpdate) {
      // Calculate elapsed intervals
      const elapsed = Date.now() - lastUpdate;
      const intervals = Math.floor(elapsed / MINING_INTERVAL);
      if (intervals > 0) {
        const newYield = +(storedYield + intervals * MINING_INCREMENT).toFixed(8);
        setDailyYield(newYield);
        localStorage.setItem("dailyYield", newYield.toString());
        localStorage.setItem("lastUpdate", Date.now().toString());
      }
    }
  }, []);

  // Mining effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isMining) {
      interval = setInterval(() => {
        setDailyYield((prev) => {
          const newYield = +(prev + MINING_INCREMENT).toFixed(8);
          localStorage.setItem("dailyYield", newYield.toString());
          localStorage.setItem("lastUpdate", Date.now().toString());
          return newYield;
        });
      }, MINING_INTERVAL);
    }

    localStorage.setItem("isMining", isMining.toString());

    return () => {
      if (interval) clearInterval(interval);
      localStorage.setItem("isMining", isMining.toString());
    };
  }, [isMining]);

  const handleWithdraw = () => {
    if (dailyYield >= WITHDRAW_THRESHOLD && onWithdraw) {
      onWithdraw(dailyYield);
      setDailyYield(0);
      localStorage.setItem("dailyYield", "0");
    }
  };

  return (
    <div className="balance-card mining-card">
      <h3>Bitcoin Mining</h3>

      <p>
        Status:{" "}
        <span className={`status ${isMining ? "active" : "inactive"}`}>
          {isMining ? "Active" : "Inactive"}
        </span>
      </p>

      <p>
        Hash Rate: <strong>{isMining ? "120 TH/s" : "0 TH/s"}</strong>
      </p>

      <p>
        Daily Yield: <strong>{dailyYield.toFixed(8)} BTC</strong>
      </p>

      <div className="mining-buttons">
        <button
          className={`mining-btn ${isMining ? "stop" : "start"}`}
          onClick={() => setIsMining(!isMining)}
        >
          {isMining ? "Stop Mining" : "Mine BTC"}
        </button>

        <button
          className="mining-btn withdraw"
          onClick={handleWithdraw}
          disabled={dailyYield < WITHDRAW_THRESHOLD}
        >
          Withdraw to Balance
        </button>
      </div>
    </div>
  );
};

export default CoinMining;
