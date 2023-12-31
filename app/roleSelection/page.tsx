"use client";

import React, { useState } from 'react';
import roles from '../components/rolesData'; // Import roles data
import { Role } from '../components/types';


export default function roleSelection() {


  const [playerName, setPlayerName] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(`https://mafia-game-test.vercel.app/api/addPlayer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playerName, selectedRole }),
      });

      if (response.ok) {
        console.log('Player added successfully');
        setSuccessMessage('Player added successfully!');
        setPlayerName('');
        setSelectedRole('');
        // Additional success handling
      } else {
        console.error('Failed to add player');
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to add player');
        // Error handling
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to add player');
      // Error handling
    }
  };

  const handleCancel = () => {
    // Handle cancel logic here
    setPlayerName('');
    setSelectedRole('');
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <main>
      <div className="p-4">
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
            />
          </div>

          <div>
            <label htmlFor="roleSelect" className="block text-sm font-medium text-gray-700">
              Enter your role
            </label>
            <select
              id="roleSelect"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a role</option>
              {Object.values(roles).flat().map((role: Role) => (
                <option key={role.name} value={role.name}>{role.name}</option>
              ))}
            </select>
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
        <div>
          <br />
          <h2>
            In name please enter your actual name and for the role only select the role you have been assigned to by the paper you were given
          </h2>
        </div>
        <div>
          <br />
          <h2>
            You cannot modify your name or role after creation so make sure the data you put in is correct
          </h2>
        </div>
      </div>
    </main>
  )
}
