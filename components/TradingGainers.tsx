import React from "react";

type MarketItem = {
  id: string;
  name: string;
  price: string;
  changePercent: string;
  icon?: React.ReactNode;
};

const FlameIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2s.9 2.3.9 4.2c0 2.5-2.9 4.8-2.9 8.3 0 2.8 2.2 5 5 5s5-2.2 5-5c0-5.4-5-6.7-5-10 0-1.8.9-3.5.9-3.5S14 3 12 2z"
      fill="#FF6B35"
    />
  </svg>
);

const RocketIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2c2.2 0 4 1.8 4 4 0 .9-.3 1.7-.8 2.4L20 12l-3.6 7.2c-.7-.5-1.5-.8-2.4-.8-2.2 0-4 1.8-4 4 0 .6-.4 1-1 1s-1-.4-1-1c0-2.2 1.8-4 4-4 .9 0 1.7.3 2.4.8L12 12 7 8.8C7.7 7.5 8 6.2 8 5c0-2.2 1.8-4 4-4z"
      fill="#FFB86B"
    />
  </svg>
);

const UpArrow = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" className="up-arrow">
    <path d="M12 5l7 7h-4v7h-6v-7H5z" fill="currentColor" />
  </svg>
);

const trending: MarketItem[] = [
  { id: "zk", name: "ZKsync", price: "$0.03924", changePercent: "21.3%" },
  { id: "sui", name: "Sui", price: "$1.96", changePercent: "16.8%" },
  { id: "lighter", name: "Lighter", price: "$3.11", changePercent: "14.9%" },
];

const gainers: MarketItem[] = [
  { id: "onyx", name: "Onyxcoin", price: "$0.01163", changePercent: "97.2%" },
  { id: "sosana", name: "SOSANA", price: "$0.4619", changePercent: "51.8%" },
  { id: "BORA", name: "BORA", price: "$0.03716", changePercent: "56.7%" },
];

function ListCard({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: MarketItem[];
}) {
  return (
    <div className="tg-card">
      <div className="tg-card-header">
        <div className="tg-title">
          {icon}
          <h3>{title}</h3>
        </div>
        <span className="view-more">View more ›</span>
      </div>

      <ul className="tg-list">
        {items.map((item) => (
          <li key={item.id} className="tg-item">
            <span className="tg-name">{item.name}</span>
            <div className="tg-right">
              <span className="tg-price">{item.price}</span>
              <span className="tg-percent positive">
                <UpArrow />
                {item.changePercent}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TrendingGainers() {
  return (
    <div className="tg-container">
      <ListCard title="Trending" icon={<FlameIcon />} items={trending} />
      <ListCard title="Top Gainers" icon={<RocketIcon />} items={gainers} />
    </div>
  );
}
