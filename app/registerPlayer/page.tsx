"use client";

// pages/registerPlayer.tsx
import React, { useState } from 'react';

export default function RegisterPlayer() {
  const [playerName, setPlayerName] = useState('');
  const [role, setRole] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(`/api/addPlayer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playerName }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Player added successfully:', data);
        setSuccessMessage(`Player added successfully! Your role is ${data.role}.`);
        setRole(data.role); // Display the assigned role
        setPlayerName(''); // Reset for next entry, if needed
      } else {
        console.error('Failed to add player');
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to add player');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to add player');
    }
  };

  const handleCancel = () => {
    setPlayerName('');
    setRole('');
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <main className="p-4">
      <h1 className="text-xl font-semibold mb-4">Register Player</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="playerName" className="block text-sm font-medium text-gray-700">
            Player Name
          </label>
          <input
            type="text"
            id="playerName"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
      {successMessage && (
        <div className="mt-4 p-2 bg-green-200 text-green-800 rounded">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mt-4 p-2 bg-red-200 text-red-800 rounded">
          {errorMessage}
        </div>
      )}
    </main>
  );
}
