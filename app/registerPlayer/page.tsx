"use client";

// pages/registerPlayer.tsx
import React, { useState } from 'react';
import roles from '../components/rolesData'
import { Roles, Role } from '../components/types'

export default function RegisterPlayer() {
  const [playerName, setPlayerName] = useState<string>('');
  const [role, setRole] =  useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const generateRole = (): string => {
    const allRoles: Role[] = [...roles.town, ...roles.mafia, ...roles.neutral];
    const randomRole: Role = allRoles[Math.floor(Math.random() * allRoles.length)];
    return `${randomRole.name} - ${randomRole.alignment}`;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const assignedRole: string = generateRole();
    setRole(assignedRole);

    try {
      const response = await fetch(`/api/addPlayer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playerName, role: assignedRole }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Player added successfully:', data);
        setSuccessMessage(`Player added successfully! Your role is ${data.role}.`);
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

  const handleCancel = (): void => {
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
      <div>
          <br />
          <h2>
            In name please enter your actual name to avoid confusion
          </h2>
        </div>
        <div>
          <br />
          <h2>
            You cannot modify your name after creation so make sure it is correct
          </h2>
        </div>
    </main>
  );
}
