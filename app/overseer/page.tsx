"use client";
// components/Overseer.tsx
import React, { useEffect, useState } from 'react';

// Define a type for the player data
type Player = {
  id: number;
  playerName: string;
  role: string;
};

type RoleLimit = {
  id: number;
  role: string;
  limit: number;
};

const PASSWORD = "papai123";

const GetPlayers: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [roleLimits, setRoleLimits] = useState<RoleLimit[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/players');
      const data = await response.json();
      setPlayers(data);
    }
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError("Incorrect password!");
      setPassword('');
    }
  };

  const handleDelete = async (playerId: number) => {
    await fetch(`/api/players?id=${playerId}`, { method: 'DELETE' });
    setPlayers(prev => prev.filter(player => player.id !== playerId));
  };

  if (!isAuthenticated) {
    return (
      <div className="p-4">
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Enter Password to Access
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Player Overview</h2>
      <ul>
        {players.map(player => (
          <li key={player.id}>
            {player.playerName} - {player.role}
            <button onClick={() => handleDelete(player.id)}
                className="ml-4 py-1 px-3 text-white bg-red-500 hover:bg-red-600 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetPlayers;
