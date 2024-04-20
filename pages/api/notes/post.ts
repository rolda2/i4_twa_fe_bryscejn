// pages/api/notes/post.ts

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { title, content } = req.body;
        const newNote = await prisma.notes.create({
            data: {
                title,
                content,
            },
        });
        res.json(newNote);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}