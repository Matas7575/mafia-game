import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface Player {
    id: string;
    playerName: string;
    role: string;
}

interface Role {
    name: string;
    alignment: string;
    abilities: string;
    attributes: string;
    goal: string;
    limit: number;
    currentCount: number;
}

type RolesData = {
    town: Role[];
    mafia: Role[];
    neutral: Role[];
};

// Helper function to manage file reading/writing
const handleFile = async (filePath: string, method: 'read' | 'write', data?: any): Promise<any> => {
    return new Promise<void>((resolve, reject) => {
        switch (method) {
            case 'read':
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) reject(err);
                    else resolve(JSON.parse(data));
                });
                break;
            case 'write':
                fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
                break;
        }
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const filePath = path.join(process.cwd(), 'data', 'players.json');
    const rolesPath = path.join(process.cwd(), 'data', 'roles.json');

    if (req.method === 'GET') {
        try {
            const players = await handleFile(filePath, 'read');
            res.status(200).json(players);
        } catch (err) {
            res.status(500).json({ message: 'Failed to read data file' });
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
        if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: "ID is required for deletion." });
        }
        try {
            const players: Player[] = await handleFile(filePath, 'read');
            const rolesData: RolesData = await handleFile(rolesPath, 'read');
            const playerIndex = players.findIndex(player => player.id === id);

            if (playerIndex === -1) {
                return res.status(404).json({ message: "Player not found." });
            }

            const playerRoleName = players[playerIndex].role;
            const roleCategoryKeys = Object.keys(rolesData) as Array<keyof RolesData>;
            let updated = false;

            roleCategoryKeys.forEach(key => {
                const roleIndex = rolesData[key].findIndex(role => role.name === playerRoleName);
                if (roleIndex !== -1) {
                    rolesData[key][roleIndex].currentCount = Math.max(0, rolesData[key][roleIndex].currentCount - 1);
                    updated = true;
                }
            });

            if (!updated) {
                console.error(`Role ${playerRoleName} not found in any category.`);
                return res.status(404).json({ message: "Role not found." });
            }

            // Remove player and update role count
            players.splice(playerIndex, 1);

            await handleFile(filePath, 'write', players);
            await handleFile(rolesPath, 'write', rolesData);

            res.status(200).json({ message: 'Player deleted successfully' });
        } catch (err) {
            console.error('Error processing request:', err);
            res.status(500).json({ message: 'Failed to process data file' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
