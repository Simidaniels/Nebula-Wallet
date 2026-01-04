import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";
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
  const totalBalanceBTC = 1.2845;
  const assetBalanceBTC = 0.7342;
  const exchangeBalanceBTC = 0.5503;
  const btcPrice = 90068;

  const [chartData, setChartData] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loadingTx, setLoadingTx] = useState(true);

  const [coins, setCoins] = useState<Coin[]>([]);
  const [loadingCoins, setLoadingCoins] = useState(true);
  const [username, setUsername] = useState("User");

  // Deposit Modal
  const [showDeposit, setShowDeposit] = useState(false);
  const btcAddress =
    "bc1pz5jxatjcknvy3na95hhlj3hltptvltld0pxdnx96qsteymhjqqlqf56y5d";

  // Get username from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (user?.username) setUsername(user.username);
    else if (user?.name) setUsername(user.name);
  }, []);

  // BTC price chart
  useEffect(() => {
    const fetchChart = async () => {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1"
      );
      const data = await res.json();

      const labels = data.prices.map((p: any) => {
        const d = new Date(p[0]);
        return `${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")}`;
      });

      const prices = data.prices.map((p: any) => p[1]);

      setChartData({
        labels,
        datasets: [
          {
            label: "BTC Price (USD)",
            data: prices,
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            tension: 0.4,
            fill: true,
          },
        ],
      });
    };

    fetchChart();
  }, []);

  // Fetch transactions
  useEffect(() => {
    const fetchTx = async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();
        setTransactions(data);
        setLoadingTx(false);
      } catch {
        setLoadingTx(false);
      }
    };
    fetchTx();
    const interval = setInterval(fetchTx, 15000);
    return () => clearInterval(interval);
  }, []);

  // Fetch live coins
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoadingCoins(true);
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=1h,24h,7d"
        );
        const data = await res.json();

        const formatted: Coin[] = data.map((c: any, i: number) => ({
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
            c.price_change_percentage_7d_in_currency >= 0 ? "#10b981" : "#ef4444",
          icon: c.symbol.toUpperCase()[0],
        }));

        setCoins(formatted);
      } catch (err) {
        console.error("Error fetching coins:", err);
      } finally {
        setLoadingCoins(false);
      }
    };
    fetchCoins();
    const interval = setInterval(fetchCoins, 30000);
    return () => clearInterval(interval);
  }, []);

  // Copy BTC address
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
            <p>Send Bitcoin to your address:</p>

            {/* IMAGE SPACE */}
            <div className="btc-image">
              <Image
                src="/btc-placeholder.png"
                alt="BTC QR Code"
                width={200}
                height={200}
              />
            </div>

            <div className="btc-address">
              <input type="text" value={btcAddress} readOnly />
              <button onClick={copyAddress}>Copy</button>
            </div>
            <p>This address can only be used to receive compatible tokens.</p>
            <button
              className="close-btn"
              onClick={() => setShowDeposit(false)}
            >
              Close
            </button>
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
        {/* Balance Cards */}
        <section className="balance-grid">
          <div className="balance-card total">
            <h3>Total Balance</h3>
            <p className="btc">{totalBalanceBTC} BTC</p>
            <p className="usd">${(totalBalanceBTC * btcPrice).toLocaleString()}</p>
            <div className="action-buttons">
              <button
                className="deposit-btn"
                onClick={() => setShowDeposit(true)}
              >
                Deposit
              </button>
              <button className="withdraw-btn">Withdraw</button>
            </div>
          </div>

          <div className="balance-card">
            <h3>Asset Balance</h3>
            <p className="btc">{assetBalanceBTC} BTC</p>
            <p className="usd">${(assetBalanceBTC * btcPrice).toLocaleString()}</p>
          </div>

          <div className="balance-card">
            <h3>Exchange Balance</h3>
            <p className="btc">{exchangeBalanceBTC} BTC</p>
            <p className="usd">${(exchangeBalanceBTC * btcPrice).toLocaleString()}</p>
          </div>
        </section>

        {/* BTC Price Chart */}
        {chartData && (
          <section className="main-stat-card">
            <h2 className="section-title">Bitcoin Price (24h)</h2>
            <Line data={chartData} />
          </section>
        )}

        {/* Recent Transactions */}
        <section className="main-stat-card">
          <h2 className="section-title">Recent Bitcoin Transactions</h2>
          {loadingTx ? (
            <p>Loading transactions...</p>
          ) : (
            <div className="tx-table-wrapper">
              <table className="tx-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Side</th>
                    <th>Amount (BTC)</th>
                    <th>Price (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td>{new Date(tx.time).toLocaleTimeString()}</td>
                      <td
                        style={{
                          color: tx.side === "buy" ? "#00F5D4" : "#FF5C5C",
                        }}
                      >
                        {tx.side.toUpperCase()}
                      </td>
                      <td>{tx.amount}</td>
                      <td>${tx.price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Live Crypto Table */}
        <section className="main-stat-card">
          <h2 className="section-title">Top Cryptocurrencies</h2>
          {loadingCoins ? (
            <div className="table-loading">
              <div className="spinner"></div>
              <p>Updating live data...</p>
            </div>
          ) : (
            <CryptoTable coins={coins} />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
