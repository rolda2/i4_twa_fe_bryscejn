// pages/api/notes/delete.ts

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { id } = req.body;
        const deletedNote = await prisma.notes.delete({
            where: {
                id: Number(id),
            },
        });
        res.json(deletedNote);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}