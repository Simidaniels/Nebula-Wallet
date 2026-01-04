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

export const coins: Coin[] = [
  {
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 91081.49,
    change1h: -0.13,
    change24h: 1.26,
    change7d: 3.75,
    marketCap: 1819026123232,
    volume: 26580110256,
    circulating: "19.97M BTC",
    sparkline: [82000, 83500, 84500, 86000, 87000, 88000, 90000, 90500, 90700, 91081],
    sparkColor: "#10b981",
    icon: "₿",
  },
  {
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 3133.69,
    change1h: -0.10,
    change24h: 0.98,
    change7d: 6.61,
    marketCap: 378220837189,
    volume: 12525760006,
    circulating: "120.69M ETH",
    sparkline: [2300, 2400, 2500, 2700, 2850, 3000, 3050, 3100, 3120, 3133],
    sparkColor: "#06b6d4",
    icon: "Ξ",
  },
  {
    rank: 3,
    name: "Tether",
    symbol: "USDT",
    price: 0.9993,
    change1h: -0.01,
    change24h: -0.01,
    change7d: 0.03,
    marketCap: 186990471081,
    volume: 62992327902,
    circulating: "187.11B USDT",
    sparkline: [1.0, 1.0, 1.0, 0.999, 1.0, 1.0, 0.999, 0.9993],
    sparkColor: "#10b981",
    icon: "T",
  },
  // Add more coins as needed...
];
