import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardLinksFooter from "../components/DashboardLinksFooter";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const Dashboard: NextPage = () => {
  const btcPrice = 90068;

  // 🔹 Balances (start at zero)
  const [totalBalanceBTC, setTotalBalanceBTC] = useState(0);
  const [assetBalanceBTC] = useState(0);
  const [exchangeBalanceBTC] = useState(0);

  const [chartData, setChartData] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loadingTx, setLoadingTx] = useState(true);

  const [coins, setCoins] = useState<Coin[]>([]);
  const [loadingCoins, setLoadingCoins] = useState(true);
  const [username, setUsername] = useState("User");

  // 🔹 Deposit modal
  const [showDeposit, setShowDeposit] = useState(false);

  // 🔹 Withdraw modal
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const btcAddress =
    "bc1pz5jxatjcknvy3na95hhlj3hltptvltld0pxdnx96qsteymhjqqlqf56y5d";

  // 🔹 Get username
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (user?.username) setUsername(user.username);
    else if (user?.name) setUsername(user.name);

    // 🔹 Load transactions from localStorage (persist on logout/login)
    const savedTx = JSON.parse(localStorage.getItem("transactions") || "[]");
    if (savedTx.length > 0) setTransactions(savedTx);
  }, []);

  // 🔹 Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // 🔹 BTC price chart
  useEffect(() => {
    const fetchChart = async () => {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1"
      );
      const data = await res.json();

      setChartData({
        labels: data.prices.map((p: any) => {
          const d = new Date(p[0]);
          return `${d.getHours()}:${d
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
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
    };

    fetchChart();
  }, []);

  // 🔹 Fetch transactions from API periodically
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

  // 🔹 Add pending deposit transaction
  const addPendingTransaction = () => {
    const pendingTx = {
      id: `pending-${Date.now()}`,
      time: new Date().toISOString(),
      side: "deposit",
      amount: "PENDING",
      price: "PENDING",
      status: "pending",
    };
    setTransactions((prev) => [pendingTx, ...prev]);
  };

  // 🔹 Handle MAX button for withdraw
  const handleMax = () => setWithdrawAmount(totalBalanceBTC.toString());

  // 🔹 Fetch live coins
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoadingCoins(true);
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=1h,24h,7d"
        );
        const data = await res.json();

        setCoins(
          data.map((c: any, i: number) => ({
            rank: i + 1,
            name: c.name,
            symbol: c.symbol.toUpperCase(),
            price: c.current_price,
            change1h: c.price_change_percentage_1h_in_currency || 0,
            change24h: c.price_change_percentage_24h_in_currency || 0,
            change7d: c.price_change_percentage_7d_in_currency || 0,
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
      } catch {} finally {
        setLoadingCoins(false);
      }
    };

    fetchCoins();
    const interval = setInterval(fetchCoins, 30000);
    return () => clearInterval(interval);
  }, []);

  const copyAddress = () => {
    navigator.clipboard.writeText(btcAddress);
    alert("BTC address copied!");
  };

  return (
    <div className="dashboard-page">
      <DashboardNavbar />

      {/* Deposit Modal */}
      {showDeposit && (
        <div className="popup-overlay">
          <div className="popup deposit-popup">
            <h3>RECEIVE BTC</h3>
            <p>Scan the QR code or copy the address below to receive BTC</p>
            <Image src="/btc-placeholder.png" alt="QR" width={200} height={200} />
            <div className="btc-address">
              <input value={btcAddress} readOnly />
              <button onClick={copyAddress}>Copy</button>
            </div>
            <p>This address is for receiving BTC only</p>
            <button className="close-btn" onClick={() => setShowDeposit(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="popup-overlay">
          <div className="popup withdraw-popup">
            <div className="btc-icon">
              <Image src="/btc-logo.png" alt="BTC" width={100} height={60} />
            </div>
            <h3>Withdraw BTC</h3>
            <input
              placeholder="Recipient's Bitcoin address"
              value={withdrawAddress}
              onChange={(e) => setWithdrawAddress(e.target.value)}
            />
            <div className="amount-row">
              <input
                type="number"
                placeholder="Amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
              {/* <span className="btc-label">BTC</span> */}
              <button className="max-btn" onClick={handleMax}>
                MAX
              </button>
            </div>
            <p className="available">
              Available: <strong>{totalBalanceBTC} BTC</strong>
            </p>
            <div className="withdraw-actions">
              <button className="confirm-btn">Withdraw</button>
              <button className="close-btn" onClick={() => setShowWithdraw(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <section className="dashboard-header">
        <h1 className="dashboard-heading">Dashboard</h1>
        <p className="dashboard-welcome">
          Welcome, <span className="username">{username}</span>
        </p>
      </section>

      <main className="dashboard-container">
        {/* Balances */}
        <section className="balance-grid">
          <div className="balance-card total">
            <h3>Total Balance</h3>
            <p className="btc">{totalBalanceBTC} BTC</p>
            <p className="usd">$0</p>

            <div className="action-buttons">
              <button
                className="deposit-btn"
                onClick={() => {
                  setShowDeposit(true);
                  addPendingTransaction();
                }}
              >
                Deposit
              </button>
              <button className="withdraw-btn" onClick={() => setShowWithdraw(true)}>
                Withdraw
              </button>
            </div>
          </div>

          <div className="balance-card">
            <h3>Asset Balance</h3>
            <p className="btc">{assetBalanceBTC} BTC</p>
            <p className="usd">$0</p>
          </div>

          <div className="balance-card">
            <h3>Exchange Balance</h3>
            <p className="btc">{exchangeBalanceBTC} BTC</p>
            <p className="usd">$0</p>
          </div>
        </section>

        {/* Chart */}
        {chartData && (
          <section className="main-stat-card">
            <Line data={chartData} />
          </section>
        )}

        {/* Transactions */}
        <section className="main-stat-card">
          <h2 className="section-title">Recent Bitcoin Transactions</h2>
          {loadingTx ? (
            <p>Loading...</p>
          ) : (
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
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>{new Date(tx.time).toLocaleTimeString()}</td>
                    <td style={{ color: "#facc15" }}>
                      {tx.side.toUpperCase()}
                    </td>
                    <td>
                      {tx.amount === "PENDING" ? (
                        <span className="pending-dots">
                          Pending
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                        </span>
                      ) : (
                        tx.amount
                      )}
                    </td>
                    <td>
                      {tx.price === "PENDING"
                        ? <span className="pending-dots">
                            PENDING
                            <span className="dot">.</span>
                            <span className="dot">.</span>
                            <span className="dot">.</span>
                          </span>
                        : `$${tx.price.toLocaleString()}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Crypto Table */}
        <section className="main-stat-card">
          <h2 className="section-title">Top Cryptocurrencies</h2>
          <CryptoTable coins={coins} />
        </section>
      </main>
<DashboardLinksFooter />
      <Footer />
    </div>
  );
};

export default Dashboard;
