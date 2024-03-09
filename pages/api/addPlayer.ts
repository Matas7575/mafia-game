// pages/api/addPlayer.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import prisma from '../../prisma/client'
import roles from '@/app/components/rolesData';
// const prisma = new PrismaClient();

type Data = {
  name: string
}

// Utility function to randomly assign roles
const assignRole = async () => {
  // Fetch all existing players to determine which roles have been assigned
  const players = await prisma.player.findMany();
  const assignedRoles = players.map(player => player.role);

  // Filter roles that can be assigned multiple times and those that can only be assigned once
  const uniqueRoles: string[] = [];
  const multipleRoles: string[] = [];
  Object.values(roles).flat().forEach((role) => {
    if (role.name === 'Survivor' || role.name === 'Medium' || role.name === 'Mafioso') {
      multipleRoles.push(role.name);
    } else if (!assignedRoles.includes(role.name)) {
      uniqueRoles.push(role.name);
    }
  });

  // Combine all available roles and select one randomly
  const availableRoles = [...uniqueRoles, ...multipleRoles];
  if (availableRoles.length === 0) throw new Error('No available roles');
  const randomIndex = Math.floor(Math.random() * availableRoles.length);
  return availableRoles[randomIndex];
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try{
      const data = await prisma.player.findMany()
      return res.status(200).json(data)
    }catch(error){
      return res.status(500).json(error)
    }
  }
  if (req.method === 'POST') {
    // const {  playerName, selectedRole } = req.body;
    const { playerName } = req.body;


    const existingPlayer = await prisma.player.findFirst({
      where: { name: playerName },
    });

    if (existingPlayer) {
      return res.status(400).json({ message: "Player with this name already exists" });
    }

    try {
       // Fetch all current player roles
       const players = await prisma.player.findMany();
       const assignedRoles = players.map(player => player.role);
 
       // Define your roles and their max counts
       const roleDefinitions: any = {
         Doctor: 2,
         Escort: 1,
         Jailor: 1,
         Mayor: 1,
         Medium: 1,
         Godfather: 1,
         Mafioso: 2, // Example of a role that can have duplicates
         Jester: 2,
         SerialKiller: 1,
         Survivor: 3, // Another role with duplicates allowed
       };
 
       // Determine available roles
       let availableRoles = Object.keys(roleDefinitions).filter(role => {
         const count = assignedRoles.filter(r => r === role).length;
         return count < roleDefinitions[role];
       });


      const selectedRole = availableRoles[Math.floor(Math.random() * availableRoles.length)];


      const newPlayer = await prisma.player.create({
        data: {
          name: playerName,
          role: selectedRole,
        },
      });

      res.status(200).json(newPlayer);
    } catch (error) {
      console.error('Error adding player:', error);
      res.status(500).json({ error: "Failed to add player" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    // Handle GET requests or other methods
    if (req.method === 'GET') {
      try {
        const players = await prisma.player.findMany();
        res.status(200).json(players);
      } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({ error: "Failed to fetch players." });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
}
