import React, { useState, useEffect } from "react";
// import "./CoinMining.css"; // we'll put styles here

const CoinMining: React.FC = () => {
  const [isMining, setIsMining] = useState(false);
  const [dailyYield, setDailyYield] = useState(0.0000000);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isMining) {
      interval = setInterval(() => {
        setDailyYield((prev) => Number((prev + 0.0000001).toFixed(7)));
      }, 1200); // adjust speed as needed
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMining]);

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
        Daily Yield: <strong>{dailyYield.toFixed(7)} BTC</strong>
      </p>

      <button
        className={`mining-btn ${isMining ? "stop" : "start"}`}
        onClick={() => setIsMining(!isMining)}
      >
        {isMining ? "Stop Mining" : "Mine BTC"}
      </button>
    </div>
  );
};

export default CoinMining;
