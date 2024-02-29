"use client";
import React, { useEffect, useState } from 'react';

// Define a type for the player data
type Player = {
  id: number;
  name: string;
  role: string;
};

type RoleLimit = {
  id: number;
  role: string;
  limit: number;
};

const PASSWORD = "papai123";

async function getPlayers(): Promise<Player[] | null> {
  try {
    const res = await fetch(`/api/addPlayer`);
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
    const res = await fetch(`/api/deletePlayer?id=${playerId}`, {
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

// Function to update role limits
const updateRoleLimit = async (id: number, role: string, limit: number) => {
  try {
    const response = await fetch('/api/updateRoleLimit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, role, limit }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log('Role limit updated successfully');
  } catch (error) {
    console.error('Failed to update role limit:', error);
  }
};

const Overseer: React.FC = () => {
  const [data, setData] = useState<Player[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [roleToUpdate, setRoleToUpdate] = useState('');
  const [newLimit, setNewLimit] = useState('');
  const [roleLimits, setRoleLimits] = useState<RoleLimit[]>([]);


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

  useEffect(() => {
    const fetchRoleLimits = async () => {
      const response = await fetch(`/api/getRoleLimits`);
      const limits = await response.json();
      setRoleLimits(limits);
    };

    fetchRoleLimits();
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

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>, roleId: number) => {
    const newLimit = parseInt(event.target.value, 10);
    const updatedLimits = roleLimits.map(limit => {
      if (limit.id === roleId) {
        return { ...limit, limit: newLimit };
      }
      return limit;
    });
    setRoleLimits(updatedLimits);
  };

  const submitNewLimit = async (roleId: number, newLimit: number) => {
    await updateRoleLimit(roleId, roleLimits.find(limit => limit.id === roleId)!.role, newLimit);
    // Optionally, refresh the role limits here or rely on optimistic updates
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
      {/* <div>
    <h2>Adjust Role Limits</h2>
    <form onSubmit={(e) => {
      e.preventDefault();
      updateRoleLimit(roleToUpdate, Number(newLimit));
    }}>
      <input
        type="text"
        placeholder="Role"
        value={roleToUpdate}
        onChange={(e) => setRoleToUpdate(e.target.value)}
      />
      <input
        type="number"
        placeholder="New Limit"
        value={newLimit}
        onChange={(e) => setNewLimit(e.target.value)}
      />
      <button type="submit">Update Limit</button>
    </form>
    
  </div> */}
  <h2>Role Limits</h2>
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Limit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roleLimits.map(limit => (
            <tr key={limit.id}>
              <td>{limit.role}</td>
              <td>
                <input
                  type="number"
                  value={limit.limit}
                  onChange={(e) => handleLimitChange(e, limit.id)}
                  style={{ width: '60px' }}
                />
              </td>
              <td>
                <button onClick={() => submitNewLimit(limit.id, limit.limit)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
