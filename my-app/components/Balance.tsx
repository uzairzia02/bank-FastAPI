'use client';

import { useState } from 'react';

export default function Balance() {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setBalance(null);

    if (!name) {
      setMessage('Please enter a name.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/balance/${name}`);
      const data = await response.json();

      if (response.ok) {
        setBalance(data.balance);
        setMessage(`Balance for ${data.user_name}:`);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Failed to connect to the server.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="balance-name" className="block text-sm font-medium">Name</label>
          <input
            id="balance-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Abcd"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 rounded-md py-2 font-semibold">
          Check Balance
        </button>
      </form>
      {message && (
        <div className="mt-4 text-center">
          <p>{message}</p>
          {typeof balance === 'number' && (
            <p className="text-2xl font-bold text-green-400">${balance.toFixed(2)}</p>
          )}
        </div>
      )}
    </div>
  );
}
