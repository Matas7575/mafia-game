"use client";
import React, { useEffect, useState } from 'react';

type Player = {
    playerName: string;
    role: string;
    // Include other player attributes if necessary
};

const AllPlayers: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch('/api/players');
                if (!response.ok) {
                    throw new Error('Failed to fetch players');
                }
                const data: Player[] = await response.json();
                setPlayers(data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        fetchPlayers();
    }, []);

    return (
        <main className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Players</h2>
            <ul className="list-disc pl-5">
                {players.map((player, index) => (
                    <li key={player.playerName}>{player.playerName}</li>
                    
                ))}
            </ul>
        </main>
    );
};

export default AllPlayers;
