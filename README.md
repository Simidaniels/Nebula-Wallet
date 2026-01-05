
# NebulaWallet Dashboard

This is a **Next.js** Bitcoin wallet dashboard project that allows users to view balances, track transactions, deposit and withdraw BTC, and view live cryptocurrency data. The dashboard is fully interactive, with modals, charts, and dynamic updates.


### Features

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

CSS  – Styling for dashboard, modals, and tables.


---

## Features Implemented Today

### 1. Dashboard Layout
- **Header with Username:** Displays "Welcome, `<username>`" using data from `localStorage`.
- **Balance Cards:**  
  - Total Balance  
  - Asset Balance  
  - Exchange Balance  
- **Action Buttons:** Deposit and Withdraw buttons included with styling.

### 2. BTC Deposit Flow
- **Deposit Modal:**  
  - Shows a **centered QR code**.
  - BTC address with copy-to-clipboard functionality.
  - Instructional text.
- **Pending Transactions:**  
  - Clicking "Deposit" adds a pending transaction in the Recent Bitcoin Transactions table.
  - Pending transactions show **animated dots (`...`)** to indicate loading.
- **Persistence:** Pending transactions remain visible even after logout and re-login.

### 3. BTC Withdraw Flow
- **Withdraw Modal:**  
  - Shows **BTC logo** in an orange circle.
  - Input for recipient Bitcoin address.
  - Input for amount:
    - Shows BTC label on the right.
    - Includes a **MAX button** to fill the input with the total BTC balance.
  - Displays available BTC under the amount input.
  - **Confirm and Close buttons** for action.
- Fully styled for usability and accessibility.

### 4. Recent Bitcoin Transactions
- Displays **time, side, amount, and price** in a table.
- Pending deposits show **animated loading dots**.
- Data persists even after logout/login.
- Auto-refresh every 15 seconds.

### 5. BTC Price Chart
- Line chart showing **BTC price over 24 hours**.
- Data fetched from **CoinGecko API**.
- Auto-updates on load.

### 6. Live Crypto Table
- Displays top 10 cryptocurrencies.
- Includes:
  - Name, Symbol, Price
  - Market cap
  - 1h, 24h, 7d percentage change
  - Circulating supply
  - Sparkline chart
- Auto-refresh every 30 seconds.

### 7. CSS Enhancements
- **Modals**: Fully centered with overlay background.
- **QR Code**: Centered in deposit modal.
- **Inputs**:
  - Amount input without scroll or number spinners.
  - MAX button styles applied.
- **Buttons**:
  - `deposit-btn`, `withdraw-btn`, `close-btn`, `max-btn` fully styled.
  - Hover and cursor pointer improvements.
- **Pending Transaction Dots**: Animated with three moving dots.

---

## Key Components

- `DashboardNavbar` - Top navigation bar.  
- `Footer` - Page footer.  
- `CryptoTable` - Table component displaying top cryptocurrencies.  
- `Dashboard.tsx` - Main dashboard page handling:
  - Fetching data
  - Deposit/Withdraw modals
  - Transactions table
  - BTC price chart
  - Balance cards

---

## APIs Used

- [CoinGecko API](https://www.coingecko.com/en/api)  
  - `/coins/bitcoin/market_chart` for BTC 24h chart  
  - `/coins/markets` for top cryptocurrencies data

---

## State Management

- **Balances**: Stored in component state (currently start at 0).  
- **Transactions**: Stored in `transactions` state, including pending deposits.  
- **User Info**: Fetched from `localStorage` (`currentUser`).  
- **Coins**: Live coin data fetched and stored in `coins` state.  

---