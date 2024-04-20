/* eslint-disable @typescript-eslint/no-unused-vars */

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const notes = await prisma.notes.findMany();
        res.json(notes);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}