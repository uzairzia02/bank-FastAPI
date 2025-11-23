'use client';

import { useState } from 'react';

export default function Auth() {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/authent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, pin_number: parseInt(pin) }),
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
        <label htmlFor="auth-name" className="block text-sm font-medium">Name</label>
        <input
          id="auth-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Alice"
        />
      </div>
      <div>
        <label htmlFor="auth-pin" className="block text-sm font-medium">PIN</label>
        <input
          id="auth-pin"
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., 1234"
        />
      </div>
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 rounded-md py-2 font-semibold">
        Authenticate
      </button>
      {message && <p className="text-center mt-4">{message}</p>}
    </form>
  );
}
