// pages/api/addPlayer.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import prisma from '../../prisma/client'
// const prisma = new PrismaClient();

type Data = {
  name: string
}

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
    const {  playerName, selectedRole } = req.body;

    const existingPlayer = await prisma.player.findFirst({
      where: { name: playerName },
    });

    if (existingPlayer) {
      return res.status(400).json({ message: "Player with this name already exists" });
    }

    try {
      const newPlayer = await prisma.player.create({
        data: {
          name: playerName,
          role: selectedRole,
        },
      });

      res.status(200).json(newPlayer);
    } catch (error) {
      res.status(500).json({ error: "Failed to add player" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
