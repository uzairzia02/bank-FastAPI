'use client';

import { useState } from 'react';

export default function Deposit() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name: name, amount: parseFloat(amount) }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Failed to connect to the server.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="deposit-name" className="block text-sm font-medium">Name</label>
        <input
          id="deposit-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Alice"
        />
      </div>
      <div>
        <label htmlFor="deposit-amount" className="block text-sm font-medium">Amount</label>
        <input
          id="deposit-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., 100.00"
        />
      </div>
      <button type="submit" className="w-full bg-green-600 hover:bg-green-700 rounded-md py-2 font-semibold">
        Deposit
      </button>
      {message && <p className="text-center mt-4">{message}</p>}
    </form>
  );
}
