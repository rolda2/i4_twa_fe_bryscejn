// pages/api/notes/update.ts

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { id, title, content } = req.body;
        const updatedNote = await prisma.notes.update({
            where: {
                id: Number(id),
            },
            data: {
                title,
                content,
            },
        });
        res.json(updatedNote);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}