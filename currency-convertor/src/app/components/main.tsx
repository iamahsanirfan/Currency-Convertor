"use client";

import { useState } from "react";

// Define a type for the currency keys
type CurrencyKey = keyof typeof currency;

const currency = {
  USD: 1,
  EUR: 0.91,
  PKR: 280,
  INR: 74.57,
};

export default function Home() {
  const [from, setFrom] = useState<CurrencyKey>("USD");
  const [to, setTo] = useState<CurrencyKey>("USD");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || isNaN(Number(amount))) {
      setResult("Please enter a valid amount.");
      return;
    }

    const fromAmount = currency[from];
    const toAmount = currency[to];
    const baseAmount = parseFloat(amount) / fromAmount;
    const convertedAmount = baseAmount * toAmount;

    setResult(`Converted amount: ${Math.round(convertedAmount)}`);
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="from">From Currency:</label>
        <select
          name="from"
          id="from"
          value={from}
          onChange={(e) => setFrom(e.target.value as CurrencyKey)}
        >
          {Object.keys(currency).map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>

        <label htmlFor="to">To Currency:</label>
        <select
          name="to"
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value as CurrencyKey)}
        >
          {Object.keys(currency).map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>

        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          required
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div id="result">{result}</div>

        <button type="submit">Convert</button>
      </form>

      <style jsx>{`
        .container {
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          color: #333;
          max-width: 400px;
          margin: auto;
        }

        h1 {
          color: #333;
          text-align: center;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        label {
          margin-top: 10px;
          color: #555;
        }

        select,
        input {
          padding: 10px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        button {
          margin-top: 20px;
          padding: 10px;
          background-color: #28a745;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #218838;
        }

        #result {
          margin-top: 20px;
          font-size: 1.2rem;
          color: #333;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
