import React, { useEffect, useState } from "react";

type MarketItem = {
  id: string;
  name: string;
  price: string;
  change24h: number; // store as number for comparison
  volume: string;
  trend?: "up" | "down" | "none"; // for row color animation
};

const UpArrow = () => (
  <svg width="12" height="12" viewBox="0 0 24 24">
    <path d="M12 5l7 7h-4v7h-6v-7H5z" fill="currentColor" />
  </svg>
);

const DownArrow = () => (
  <svg width="12" height="12" viewBox="0 0 24 24">
    <path d="M12 19l-7-7h4V5h6v7h4z" fill="currentColor" />
  </svg>
);

function ListCard({ title, items }: { title: string; items: MarketItem[] }) {
  return (
    <div className="tg-card">
      <div className="tg-card-header">
        <h3>{title}</h3>
      </div>

      <ul className="tg-list">
        {/* Subheader */}
        {/* Subheader */}
<li
  className="tg-item"
  style={{ fontWeight: "bold" }}
>
  <span style={{ flex: 2, textAlign: "left" }}>Name</span>
  <span style={{ flex: 1, textAlign: "right" }}>Price</span>
  <span style={{ flex: 1, textAlign: "right" }}>Volume</span>
  <span style={{ flex: 1, textAlign: "right" }}>24h</span> {/* Right-aligned */}
</li>


        {/* Market items */}
        {items.map((item) => (
          <li
            key={item.id}
            className={`tg-item ${
              item.trend === "up"
                ? "trend-up"
                : item.trend === "down"
                ? "trend-down"
                : ""
            }`}
          >
            <span style={{ flex: 2, textAlign: "left" }}>{item.name}</span>
            <span style={{ flex: 1, textAlign: "right" }}>{item.price}</span>
            <span style={{ flex: 1, textAlign: "right" }}>{item.volume}</span>
            <span
              style={{ flex: 1, textAlign: "right" }}
              className={`tg-percent ${
                item.change24h >= 0 ? "positive" : "negative"
              }`}
            >
              {item.change24h >= 0 ? <UpArrow /> : <DownArrow />}
              {item.change24h.toFixed(2)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TrendingGainers() {
  const [gainers, setGainers] = useState<MarketItem[]>([]);
  const [losers, setLosers] = useState<MarketItem[]>([]);
  const [prevData, setPrevData] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  const fetchMarketData = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&price_change_percentage=24h"
      );
      const data = await res.json();

      const sortedByChange = data.sort(
        (a: any, b: any) =>
          b.price_change_percentage_24h - a.price_change_percentage_24h
      );

      const mapTrend = (coin: any) => {
        const prev = prevData[coin.id] ?? coin.price_change_percentage_24h;
        const trend =
          coin.price_change_percentage_24h > prev
            ? "up"
            : coin.price_change_percentage_24h < prev
            ? "down"
            : "none";
        return {
          id: coin.id,
          name: coin.name,
          price: `$${coin.current_price.toLocaleString()}`,
          change24h: coin.price_change_percentage_24h,
          volume: `$${coin.total_volume.toLocaleString()}`,
          trend,
        };
      };

      const topGainers = sortedByChange.slice(0, 7).map(mapTrend);
      const topLosers = sortedByChange
        .slice(-7)
        .reverse()
        .map(mapTrend);

      const newPrevData: { [key: string]: number } = {};
      [...topGainers, ...topLosers].forEach(
        (coin) => (newPrevData[coin.id] = coin.change24h)
      );
      setPrevData(newPrevData);

      setGainers(topGainers);
      setLosers(topLosers);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();

    const interval = setInterval(() => {
      fetchMarketData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading market data...</div>;

  return (
    <div className="tg-container trending-wrapper">
      <ListCard title="Top Gainers" items={gainers} />
      <ListCard title="Top Losers" items={losers} />
    </div>
  );
}
