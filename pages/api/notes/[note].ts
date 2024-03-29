// pages/api/notes/[note].ts

import { NextApiRequest, NextApiResponse } from 'next';

interface Note {
    title: string;
    content: (string | { type: string; items: string[]; })[];
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const note = typeof req.query.note === 'string' ? req.query.note : null;

    const notes: Record<string, Note> = {
        'I3_HS': {
            title: 'Dynamický routing',
            content: [
                'Dynamický routing nám zajišťuje routovací infrastrukturu, do které již nemusíme zasahovat. Nemusíme psát routovací tabulku, nemusíme myslet na změny v síti. Musíme DRP jen nastavit.',
                'Kromě funkcí routingu nám DRP poskytují:',
                {
                    type: 'list',
                    items: ['Škálovatelnost', 'Rychlou konvergenci', 'Dostupnost']
                }
            ]
        },
        // Add more notes here
    };

    if (note && note in notes) {
        res.status(200).json(notes[note as keyof typeof notes]);
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
};

export default handler;