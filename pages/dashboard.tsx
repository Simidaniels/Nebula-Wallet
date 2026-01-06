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

  const [totalBalanceBTC, setTotalBalanceBTC] = useState(0); // Persisted BTC balance
  const [chartData, setChartData] = useState<any>(null);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loadingCoins, setLoadingCoins] = useState(true);

  const btcAddress = "bc1pz5jxatjcknvy3na95hhlj3hltptvltld0pxdnx96qsteymhjqqlqf56y5d";

  // ---------------- Logout ----------------
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  // ---------------- Load user, transactions & balance ----------------
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const name = user?.username || user?.name || "User";
    setUsername(name);

    const savedTx = JSON.parse(localStorage.getItem(`transactions_${name}`) || "[]");
    if (savedTx.length > 0) setTransactions(savedTx);

    const savedBalance = parseFloat(localStorage.getItem(`totalBalance_${name}`) || "0");
    setTotalBalanceBTC(savedBalance);
  }, []);

  // ---------------- Save transactions ----------------
  useEffect(() => {
    localStorage.setItem(`transactions_${username}`, JSON.stringify(transactions));
  }, [transactions, username]);

  // ---------------- Save total balance ----------------
  useEffect(() => {
    localStorage.setItem(`totalBalance_${username}`, totalBalanceBTC.toString());
  }, [totalBalanceBTC, username]);

  // ---------------- BTC Chart ----------------
  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1"
        );
        const data = await res.json();

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

  // ---------------- Fetch coins ----------------
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoadingCoins(true);
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
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
            sparkColor: c.price_change_percentage_7d_in_currency >= 0 ? "#10b981" : "#ef4444",
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

  // ---------------- Copy BTC Address ----------------
  const copyAddress = () => {
    navigator.clipboard.writeText(btcAddress);
    alert("BTC address copied!");
  };

  return (
    <div className="dashboard-page">
      <DashboardNavbar onLogout={handleLogout} />

      <section className="dashboard-header">
        <h1>Dashboard</h1>
        <p>
          Welcome, <span className="username">{username}</span>
        </p>
      </section>

      <main className="dashboard-container">
        <section className="balance-grid">
          {/* Total Balance */}
          <div className="balance-card total">
            <h3>TOTAL BALANCE</h3>
            <p className="btc">{totalBalanceBTC.toFixed(8)} BTC</p>
            <p className="usd">$0</p>

            <div className="action-buttons">
              <button
                className="deposit-btn"
                onClick={() => {
                  addPendingTransaction();
                }}
              >
                Deposit
              </button>
              <button className="withdraw-btn">Withdraw</button>
            </div>
          </div>

          {/* Dashboard cards */}
          <div className="dashboard-cards">
            {/* CoinMining updates totalBalanceBTC via onWithdraw */}
            <CoinMining onWithdraw={(amount) => setTotalBalanceBTC((prev) => +(prev + amount).toFixed(8))} />

            {/* Other cards */}
            <TrendingGainers />
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
          <h2>Recent Bitcoin Transactions</h2>
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
                    <td>{tx.side.toUpperCase()}</td>
                    <td>{tx.amount}</td>
                    <td>{tx.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
