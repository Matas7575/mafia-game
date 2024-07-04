import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

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

type Data = {
    message: string;
    role?: string;
    id?: string;
};

// Helper function to determine the category key from a role's alignment
function getCategoryFromAlignment(alignment: string): keyof RolesData | undefined {
    if (alignment.includes("Town")) return 'town';
    if (alignment.includes("Mafia")) return 'mafia';
    if (alignment.includes("Neutral")) return 'neutral';
    return undefined;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const filePath = path.join(process.cwd(), 'data', 'players.json');
    const rolesPath = path.join(process.cwd(), 'data', 'roles.json');

    if (req.method === 'POST') {
        const { playerName } = req.body;

        try {
            const rolesData: RolesData = JSON.parse(fs.readFileSync(rolesPath, 'utf8'));
            const players: Player[] = JSON.parse(fs.readFileSync(filePath, 'utf8') || '[]');

            // Combine all roles into a single array and filter available ones
            const availableRoles: Role[] = ([] as Role[]).concat(...Object.values(rolesData))
                .filter(role => role.currentCount < role.limit);

            if (availableRoles.length === 0) {
                return res.status(400).json({ message: "No available roles due to limit constraints." });
            }

            const assignedRole = availableRoles[Math.floor(Math.random() * availableRoles.length)];
            const categoryKey = getCategoryFromAlignment(assignedRole.alignment);

            if (!categoryKey || !rolesData[categoryKey]) {
                console.error(`Role category for alignment ${assignedRole.alignment} not found.`);
                return res.status(400).json({ message: "Role category not found." });
            }

            const roleCategory = rolesData[categoryKey];
            const roleToUpdate = roleCategory.find(role => role.name === assignedRole.name);
            if (!roleToUpdate) {
                console.error(`Role ${assignedRole.name} not found in category ${assignedRole.alignment}.`);
                return res.status(404).json({ message: "Role not found in category." });
            }

            roleToUpdate.currentCount++;

            const newPlayer: Player = {
                id: uuidv4(),
                playerName,
                role: assignedRole.name
            };
            players.push(newPlayer);

            // Write the updated players and roles back to their respective files
            fs.writeFileSync(filePath, JSON.stringify(players, null, 2), 'utf8');
            fs.writeFileSync(rolesPath, JSON.stringify(rolesData, null, 2), 'utf8');

            res.status(200).json({ message: 'Player added successfully!', role: assignedRole.name, id: newPlayer.id });
        } catch (err) {
            console.error('Failed to handle request:', err);
            res.status(500).json({ message: 'Failed to process data file' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
