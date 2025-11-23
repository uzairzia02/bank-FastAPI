'use client';

import { useState } from 'react';

export default function Transfer() {
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/bank-transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender_name: sender,
          recipient_name: recipient,
          amount: parseFloat(amount),
        }),
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
        <label htmlFor="transfer-sender" className="block text-sm font-medium">Your Name (Sender)</label>
        <input
          id="transfer-sender"
          type="text"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Alice"
        />
      </div>
      <div>
        <label htmlFor="transfer-recipient" className="block text-sm font-medium">Recipient's Name</label>
        <input
          id="transfer-recipient"
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Bob"
        />
      </div>
      <div>
        <label htmlFor="transfer-amount" className="block text-sm font-medium">Amount</label>
        <input
          id="transfer-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., 50.00"
        />
      </div>
      <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 rounded-md py-2 font-semibold">
        Transfer
      </button>
      {message && <p className="text-center mt-4">{message}</p>}
    </form>
  );
}
