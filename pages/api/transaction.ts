// pages/api/transactions.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin/trades"
    );

    const data = await response.json();

    const transactions = data.slice(0, 15).map((tx: any) => ({
      id: tx.trade_id,
      time: tx.timestamp,
      price: tx.price,
      amount: tx.amount,
      side: tx.side,
    }));

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
}
