import React from "react";

export type Coin = {
  rank: number;
  name: string;
  symbol: string;
  price: number;
  change1h: number | null;
  change24h: number | null;
  change7d: number | null;
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

function formatPercentChange(value: number | null) {
  if (value === null || Number.isNaN(value)) {
    return { label: "N/A", className: "" };
  }

  return {
    label: `${value.toFixed(2)}%`,
    className: value >= 0 ? "positive" : "negative",
  };
}

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
          {coins.map((c) => {
            const change1h = formatPercentChange(c.change1h);
            const change24h = formatPercentChange(c.change24h);
            const change7d = formatPercentChange(c.change7d);

            return (
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
                <td className={change1h.className}>{change1h.label}</td>
                <td className={change24h.className}>{change24h.label}</td>
                <td className={change7d.className}>{change7d.label}</td>
                <td>${c.marketCap.toLocaleString()}</td>
                <td>${c.volume.toLocaleString()}</td>
                <td className="colSupply">{c.circulating}</td>
                <td className="colSpark">
                  <Sparkline points={c.sparkline} color={c.sparkColor} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
