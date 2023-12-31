// pages/api/deletePlayer.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const playerId = req.query.id;

    try {
      const deletedPlayer = await prisma.player.delete({
        where: { id: Number(playerId) },
      });

      res.status(200).json(deletedPlayer);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete player" });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
