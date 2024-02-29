import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Fetch all role limits from the database
    const roleLimits = await prisma.roleLimit.findMany();
    res.status(200).json(roleLimits);
  } catch (error) {
    // Handle potential errors
    console.error('Failed to fetch role limits:', error);
    res.status(500).json({ message: 'Failed to fetch role limits', error });
  }
}
