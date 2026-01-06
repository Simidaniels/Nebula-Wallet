import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import DashboardNavbar from "../components/DashboardNavbar";
import DashboardLinksFooter from "../components/DashboardLinksFooter";
import CoinMining from "../components/CoinMining";
import TrendingGainers from "../components/TradingGainers";
import Footer from "../components/DashboardFooter";
import CryptoTable from "../components/CryptoTable";
import { Coin } from "../pages/api/coins";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const Dashboard: NextPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState("User");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loadingTx, setLoadingTx] = useState(true);
  const [showAllTx, setShowAllTx] = useState(false);

  const [totalBalanceBTC, setTotalBalanceBTC] = useState(0);
  const [btcPriceUSD, setBtcPriceUSD] = useState(0);
  const [chartData, setChartData] = useState<any>(null);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loadingCoins, setLoadingCoins] = useState(true);

  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const btcAddress = "bc1pz5jxatjcknvy3na95hhlj3hltptvltld0pxdnx96qsteymhjqqlqf56y5d";

  // ---------------- Logout ----------------
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  // ---------------- Load user & transactions ----------------
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const name = user?.username || user?.name || "User";
    setUsername(name);

    const savedTx = JSON.parse(localStorage.getItem(`transactions_${name}`) || "[]");
    if (savedTx.length) setTransactions(savedTx);

    const savedBalance = parseFloat(localStorage.getItem(`totalBalance_${name}`) || "0");
    setTotalBalanceBTC(savedBalance);
  }, []);

  // ---------------- Save transactions & balance ----------------
  useEffect(() => {
    localStorage.setItem(`transactions_${username}`, JSON.stringify(transactions));
    localStorage.setItem(`totalBalance_${username}`, totalBalanceBTC.toString());
  }, [transactions, totalBalanceBTC, username]);

  // ---------------- Fetch BTC chart & price ----------------
  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1"
        );
        const data = await res.json();

        if (data?.prices?.length) {
          const latestPrice = data.prices[data.prices.length - 1][1];
          setBtcPriceUSD(latestPrice);

          setChartData({
            labels: data.prices.map((p: any) => {
              const d = new Date(p[0]);
              return `${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")}`;
            }),
            datasets: [
              {
                label: "BTC Price (USD)",
                data: data.prices.map((p: any) => p[1]),
                borderColor: "#10b981",
                backgroundColor: "rgba(16,185,129,0.15)",
                tension: 0.4,
                fill: true,
              },
            ],
          });
        }
      } catch {}
    };
    fetchChart();
  }, []);

  // ---------------- Fetch transactions ----------------
  useEffect(() => {
    const fetchTx = async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();
        setTransactions((prev) => [...prev, ...data]);
      } catch {}
      setLoadingTx(false);
    };
    fetchTx();
    const interval = setInterval(fetchTx, 15000);
    return () => clearInterval(interval);
  }, []);

  // ---------------- Fetch coins ----------------
  useEffect(() => {
  const fetchCoins = async () => {
    try {
      setLoadingCoins(true);

      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?" +
          "vs_currency=usd&order=market_cap_desc&per_page=10&page=1&" +
          "sparkline=true&price_change_percentage=1h,24h,7d"
      );

      const data = await res.json();

      setCoins(
        data.map((c: any, i: number) => ({
          rank: i + 1,
          name: c.name,
          symbol: c.symbol.toUpperCase(),
          price: c.current_price,

          // ✅ NOW THESE WILL BE REAL VALUES
          change1h: c.price_change_percentage_1h_in_currency,
          change24h: c.price_change_percentage_24h_in_currency,
          change7d: c.price_change_percentage_7d_in_currency,

          marketCap: c.market_cap,
          volume: c.total_volume,
          circulating: `${c.circulating_supply?.toLocaleString()} ${c.symbol.toUpperCase()}`,
          sparkline: c.sparkline_in_7d?.price || [],
          sparkColor:
            c.price_change_percentage_7d_in_currency >= 0
              ? "#10b981"
              : "#ef4444",
          icon: c.symbol.toUpperCase()[0],
        }))
      );
    } finally {
      setLoadingCoins(false);
    }
  };

  fetchCoins();
  const interval = setInterval(fetchCoins, 30000);
  return () => clearInterval(interval);
}, []);


  // ---------------- Pending Transaction ----------------
  const addPendingTransaction = () => {
    setTransactions((prev) => [
      {
        id: `pending-${Date.now()}`,
        time: new Date().toISOString(),
        side: "deposit",
        amount: "PENDING",
        price: "PENDING",
      },
      ...prev,
    ]);
  };

  // ---------------- Copy BTC Address ----------------
  const copyAddress = () => {
    navigator.clipboard.writeText(btcAddress);
    alert("BTC address copied!");
  };

  // ---------------- Withdraw ----------------
  const handleWithdraw = () => {
    if (!withdrawAddress || !withdrawAmount) {
      alert("Please fill in both address and amount.");
      return;
    }
    if (parseFloat(withdrawAmount) > totalBalanceBTC) {
      alert("Insufficient balance.");
      return;
    }

    setTotalBalanceBTC((prev) => +(prev - parseFloat(withdrawAmount)).toFixed(8));
    setTransactions((prev) => [
      {
        id: `withdraw-${Date.now()}`,
        time: new Date().toISOString(),
        side: "withdraw",
        amount: withdrawAmount,
        price: "N/A",
      },
      ...prev,
    ]);
    alert("Withdrawal submitted!");
    setWithdrawAddress("");
    setWithdrawAmount("");
    setShowWithdrawModal(false);
  };

  return (
    <div className="dashboard-page">
      <DashboardNavbar onLogout={handleLogout} />

      {/* Header */}
      <section className="dashboard-header">
        <h1>Dashboard</h1>
        <p>
          Welcome, <span className="username">{username}</span>
        </p>
      </section>

      {/* Balance Grid */}
      <main className="dashboard-container">
        <section className="balance-grid">
          <div className="balance-card total">
            <h3>TOTAL BALANCE</h3>
            <p className="btc">{totalBalanceBTC.toFixed(8)} BTC</p>
            <p className="usd">
              ≈ $
              {(totalBalanceBTC * btcPriceUSD).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>

            <div className="action-buttons">
              <button
                className="action-btn deposit-btn"
                onClick={() => {
                  addPendingTransaction();
                  setShowDepositModal(true);
                }}
              >
                Deposit
              </button>
              <button
                className="action-btn withdraw-btn"
                onClick={() => setShowWithdrawModal(true)}
              >
                Withdraw
              </button>
            </div>
          </div>

          <div className="dashboard-cards">
            <CoinMining
              onWithdraw={(amount) =>
                setTotalBalanceBTC((prev) => +(prev + amount).toFixed(8))
              }
            />
            <TrendingGainers />
          </div>
        </section>

        {/* Deposit Modal */}
        {showDepositModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Send BTC to your address:</h3>
              <img src={"/btc-placeholder.png"} alt="BTC QR Code" />
              <input
                type="text"
                className="btc-address-input"
                value={btcAddress}
                readOnly
                onFocus={(e) => e.target.select()}
              />
              <p>This address can only be used to receive BTC</p>
              <div className="modal-buttons">
                <button onClick={copyAddress}>Copy Address</button>
                <button onClick={() => setShowDepositModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Withdraw Modal */}
        {showWithdrawModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Withdraw BTC</h3>
              <img
                src="/btc-logo.png"
                alt="BTC Logo"
                style={{ width: "100px", margin: "0 auto 0.5rem", display: "block" }}
              />

              {/* Recipient */}
              <div className="input-with-embedded-btn">
                <input
                  type="text"
                  placeholder="Recipient BTC Address"
                  value={withdrawAddress}
                  onChange={(e) => setWithdrawAddress(e.target.value)}
                  className="modal-input embedded-input"
                />
                <button
                  type="button"
                  className="embedded-btn"
                  onClick={async () => {
                    const text = await navigator.clipboard.readText();
                    setWithdrawAddress(text);
                  }}
                >
                  Paste
                </button>
              </div>

              {/* Amount */}
              <div className="input-with-embedded-btn">
                <input
                  type="number"
                  placeholder="Amount BTC"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="modal-input embedded-input"
                  min="0"
                  step="0.00000001"
                />
                <button
                  type="button"
                  className="embedded-btn"
                  onClick={() => setWithdrawAmount(totalBalanceBTC.toString())}
                >
                  Max
                </button>
              </div>

              <p className="total-balance">
                Total Balance: {totalBalanceBTC.toFixed(8)} BTC
              </p>

              <div className="modal-buttons">
                <button onClick={handleWithdraw}>Submit</button>
                <button onClick={() => setShowWithdrawModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Chart */}
        {chartData && (
          <section className="main-stat-card">
            <Line data={chartData} />
          </section>
        )}

        {/* Transactions */}
        <section className="main-stat-card">
          <h2>Recent Bitcoin Transactions</h2>
          {loadingTx ? (
            <p>Loading...</p>
          ) : (
            <>
              <table className="tx-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Side</th>
                    <th>Amount</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions
                    .slice(0, showAllTx ? transactions.length : 12)
                    .map((tx) => (
                      <tr key={tx.id}>
                        <td>{new Date(tx.time).toLocaleTimeString()}</td>
                        <td>{tx.side.toUpperCase()}</td>
                        <td>
                          {tx.amount === "PENDING" ? (
                            <span className="tx-pending">
                              Pending
                              <span className="dot"></span>
                              <span className="dot"></span>
                              <span className="dot"></span>
                            </span>
                          ) : (
                            tx.amount
                          )}
                        </td>
                        <td>
                          {tx.price === "PENDING" ? (
                            <span className="tx-pending">
                              <span className="dot"></span>
                              <span className="dot"></span>
                              <span className="dot"></span>
                            </span>
                          ) : (
                            tx.price
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {transactions.length > 12 && (
                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                  <button
                    className="see-more-btn"
                    onClick={() => setShowAllTx(!showAllTx)}
                  >
                    {showAllTx ? "See Less" : "See More..."}
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Crypto Table */}
        <section className="main-stat-card">
          <h2>Top Cryptocurrencies</h2>
          <CryptoTable coins={coins} />
        </section>
      </main>

      <DashboardLinksFooter />
      <Footer />
    </div>
  );
};

export default Dashboard;
