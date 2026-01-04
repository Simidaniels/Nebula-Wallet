import React from "react";

export type Coin = {
  rank: number;
  name: string;
  symbol: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume: number;
  circulating: string;
  sparkline: number[];
  sparkColor?: string;
  icon?: string;
};

type Props = {
  coins: Coin[];
};

function Sparkline({ points, color = "#2dd4bf" }: { points: number[]; color?: string }) {
  if (!points || points.length === 0) return null;
  const w = 120;
  const h = 36;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const mapped = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p - min) / range) * h;
    return `${x},${y}`;
  });
  const d = mapped.join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden>
      <polyline fill="none" stroke={color} strokeWidth={2} points={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CryptoTable = ({ coins }: Props) => {
  return (
    <div className="crypto-table-wrap">
      <table className="crypto-table">
        <thead>
          <tr>
            <th className="colRank">#</th>
            <th className="colName">Name</th>
            <th>Price</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>Volume(24h)</th>
            <th>Circulating Supply</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((c) => (
            <tr key={c.rank}>
              <td className="colRank">{c.rank}</td>
              <td className="colName">
                <div className="nameCell">
                  <div className="icon">{c.icon ?? c.name[0]}</div>
                  <div>
                    <div className="namePrimary">{c.name}</div>
                    <div className="nameSecondary">{c.symbol}</div>
                  </div>
                </div>
              </td>
              <td className="colPrice">${c.price.toLocaleString()}</td>
              <td className={c.change1h >= 0 ? "positive" : "negative"}>{c.change1h.toFixed(2)}%</td>
              <td className={c.change24h >= 0 ? "positive" : "negative"}>{c.change24h.toFixed(2)}%</td>
              <td className={c.change7d >= 0 ? "positive" : "negative"}>{c.change7d.toFixed(2)}%</td>
              <td>${c.marketCap.toLocaleString()}</td>
              <td>${c.volume.toLocaleString()}</td>
              <td className="colSupply">{c.circulating}</td>
              <td className="colSpark"><Sparkline points={c.sparkline} color={c.sparkColor} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
