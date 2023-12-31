"use client";
import React, { useEffect, useState } from 'react';

// Define a type for the player data
type Player = {
  id: number;
  name: string;
  role: string;
};

const PASSWORD = "papai123";

async function getPlayers(): Promise<Player[] | null> {
  try {
    const res = await fetch(`https://mafia-game-test.vercel.app/api/addPlayer`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch:', error);
    return null;
  }
}

async function deletePlayer(playerId: number): Promise<void> {
  try {
    const res = await fetch(`https://mafia-game-test.vercel.app/api/deletePlayer?id=${playerId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    console.log('Player deleted successfully');
  } catch (error) {
    console.error('Failed to delete player:', error);
  }
}

const Overseer: React.FC = () => {
  const [data, setData] = useState<Player[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isAuthenticated) {
      getPlayers().then(playersData => {
        if (playersData) {
          setData(playersData);
          console.log("Data:", playersData);
        }
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getPlayers().then(playersData => {
      if (playersData) {
        setData(playersData);
        console.log("Data:", playersData);
      }
    });
  }, []);

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
    await deletePlayer(playerId);
    setData(data.filter(player => player.id !== playerId));
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

  if (!data.length) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Player Overview</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {/* <th className="border px-4 py-2 text-left">ID</th> */}
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map(player => (
            <tr key={player.id}>
              {/* <td className="border px-4 py-2">{player.id}</td> */}
              <td className="border px-4 py-2">{player.name}</td>
              <td className="border px-4 py-2">{player.role}</td>
              <td>
                <button
                  onClick={() => handleDelete(player.id)}
                  className="py-1 px-3 text-white bg-red-500 hover:bg-red-600 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Overseer;
