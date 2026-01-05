Bitcoin Dashboard

A real-time cryptocurrency dashboard built with Next.js, TypeScript, and Chart.js. This platform allows users to monitor Bitcoin prices, track live crypto data, and manage balances with a simple, interactive interface.

Features

Dashboard Overview: View your total, asset, and exchange Bitcoin balances.

Deposit & Receive BTC: Pop-up modal with a copyable BTC address and QR code.

Live Bitcoin Chart: 24-hour price tracking using Chart.js with a responsive line chart.

Recent Transactions: Table showing latest Bitcoin buy/sell transactions.

Top Cryptocurrencies: Live market data for top coins with sparkline charts.

Responsive Design: Works on desktop and mobile devices.

Technologies Used

Next.js – React framework for server-side rendering.

TypeScript – Type-safe JavaScript for better code reliability.

Chart.js – Interactive chart library for BTC price visualization.

React Hooks – State and effect management.

CoinGecko API – Live cryptocurrency data.

LocalStorage – User information storage for username display.

CSS / SCSS – Styling for dashboard, modals, and tables.

Getting Started
Prerequisites

Node.js (>= 18)

npm or yarn

Installation
git clone https://github.com/yourusername/bitcoin-dashboard.git
cd bitcoin-dashboard
npm install

Running the Project
npm run dev


Open http://localhost:3000
 to see the dashboard in your browser.

Environment Variables

No sensitive API keys are required since CoinGecko’s public API is used.
Optional: you can add .env.local for future customization.