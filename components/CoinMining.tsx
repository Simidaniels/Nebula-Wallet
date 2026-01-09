import React, { useEffect, useState } from "react";

interface CoinMiningProps {
  onWithdraw?: (amount: number) => void;
}

// ===== TEST MODE (VERY FAST) =====
const BTC_PER_MS = 0.0000000005;
const UI_TICK = 50;
const WITHDRAW_THRESHOLD = 0.00001;

const CoinMining: React.FC<CoinMiningProps> = ({ onWithdraw }) => {
  const [isMining, setIsMining] = useState(false);
  const [dailyYield, setDailyYield] = useState(0);
  const [userKey, setUserKey] = useState<string | null>(null);

  // 🔐 GET CURRENT USER KEY
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (!user?.email) return;

    setUserKey(user.email);
  }, []);

  // 🔁 LOAD USER-SPECIFIC STATE
  useEffect(() => {
    if (!userKey) return;

    const mining = localStorage.getItem(`isMining_${userKey}`) === "true";
    const storedYield = parseFloat(
      localStorage.getItem(`dailyYield_${userKey}`) || "0"
    );
    const lastUpdate = parseInt(
      localStorage.getItem(`lastUpdate_${userKey}`) || Date.now().toString(),
      10
    );

    setIsMining(mining);

    if (mining) {
      const elapsedMs = Date.now() - lastUpdate;
      const earned = elapsedMs * BTC_PER_MS;
      const newYield = +(storedYield + earned).toFixed(8);

      setDailyYield(newYield);
      localStorage.setItem(`dailyYield_${userKey}`, newYield.toString());
    } else {
      setDailyYield(storedYield);
    }

    localStorage.setItem(`lastUpdate_${userKey}`, Date.now().toString());
  }, [userKey]);

  // ⚡ FAST MINING LOOP (USER-ISOLATED)
  useEffect(() => {
    if (!isMining || !userKey) return;

    localStorage.setItem(`isMining_${userKey}`, "true");

    const interval = setInterval(() => {
      const now = Date.now();
      const lastUpdate = parseInt(
        localStorage.getItem(`lastUpdate_${userKey}`) || now.toString(),
        10
      );

      const elapsedMs = now - lastUpdate;
      const earned = elapsedMs * BTC_PER_MS;

      setDailyYield(prev => {
        const next = +(prev + earned).toFixed(8);
        localStorage.setItem(`dailyYield_${userKey}`, next.toString());
        localStorage.setItem(`lastUpdate_${userKey}`, now.toString());
        return next;
      });
    }, UI_TICK);

    return () => clearInterval(interval);
  }, [isMining, userKey]);

  // 🛑 MANUAL TOGGLE ONLY (PER USER)
  const toggleMining = () => {
    if (!userKey) return;

    setIsMining(prev => {
      const next = !prev;
      localStorage.setItem(`isMining_${userKey}`, next.toString());
      localStorage.setItem(`lastUpdate_${userKey}`, Date.now().toString());
      return next;
    });
  };

  const handleWithdraw = () => {
    if (!userKey) return;

    if (dailyYield >= WITHDRAW_THRESHOLD && onWithdraw) {
      onWithdraw(dailyYield);
      setDailyYield(0);
      localStorage.setItem(`dailyYield_${userKey}`, "0");
      localStorage.setItem(`lastUpdate_${userKey}`, Date.now().toString());
    }
  };

  if (!userKey) return null;

  return (
    <div className="balance-card mining-card">
      <h3>Bitcoin Mining (TEST MODE)</h3>

      <p>
        Status:{" "}
        <span className={`status ${isMining ? "active" : "inactive"}`}>
          {isMining ? "Active" : "Inactive"}
        </span>
      </p>

      <p>
        Hash Rate: <strong>{isMining ? "9999 TH/s" : "0 TH/s"}</strong>
      </p>

      <p>
        Daily Yield: <strong>{dailyYield.toFixed(8)} BTC</strong>
      </p>

      <div className="mining-buttons">
        <button
          className={`mining-btn ${isMining ? "stop" : "start"}`}
          onClick={toggleMining}
        >
          {isMining ? "Stop Mining" : "Mine BTC"}
        </button>

        <button
          className="mining-btn withdraw"
          onClick={handleWithdraw}
          disabled={dailyYield < WITHDRAW_THRESHOLD}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default CoinMining;
