import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { id, role, limit } = req.body;

    try {
      const existingLimit = await prisma.roleLimit.upsert({
        where: { id, role },
        update: { limit },
        create: { role, limit },
      });

      res.status(200).json(existingLimit);
    } catch (error) {
      res.status(500).json({ message: "Failed to update role limit", error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
