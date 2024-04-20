import React, { useState, useEffect } from 'react';
import "@/app/globals.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faGear, faAnglesRight, faAnglesLeft, faFile, faTimes, faPlus, faPrint, faShare, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface Note {
    id: number;
    slug: string;
    title: string;
    content: string;
}

const Note: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteContent, setNewNoteContent] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await axios.get('/api/notes/get');
            setNotes(response.data);
        };

        fetchNotes();
    }, []);

    useEffect(() => {
        if (selectedNote) {
            setTitle(selectedNote.title);
            setContent(selectedNote.content);
        }
    }, [selectedNote]);

    const updateNote = async () => {
        if (selectedNote) {
            await axios.put('/api/notes/update', {
                id: selectedNote.id,
                title,
                content,
            });
        }

        setEditing(false);
    };

    const createNote = async () => {
        const response = await axios.post('/api/notes/post', {
            title: newNoteTitle,
            content: newNoteContent,
        });

        const newNote = response.data;
        setNotes(oldNotes => [...oldNotes, newNote]);
        setShowModal(false);
    };

    const deleteNote = async () => {
        await axios.delete('/api/notes/delete', {
            data: {
                id: noteToDelete,
            },
        });

        setNotes(oldNotes => oldNotes.filter(note => note.id !== noteToDelete));
        setShowDeleteModal(false);
    };

    const handleDeleteClick = (id: number) => {
        setNoteToDelete(id);
        setShowDeleteModal(true);
    };

    
    return (
        <div className='flex items-start bg-[#fff] w-screen h-screen'>
            <div className='flex pt-[10px] pb-[10px] flex-col justify-between items-start self-stretch shrink-0 border-r-2 border-[#fbfbfa] text-2xl w-[82px]'>
                <div className='flex flex-col items-start gap-4 self-stretch'>
                    <button className='flex h-16 flex-col justify-center items-center gap-[10px] self-stretch hover:bg-[#EAEAE8] hover:cursor-pointer'>
                        <FontAwesomeIcon icon={faHome} />
                    </button>
                    <button className='flex h-16 flex-col justify-center items-center gap-[10px] self-stretch hover:bg-[#EAEAE8] hover:cursor-pointer'>
                        <FontAwesomeIcon icon={faBook} />
                    </button>
                    <button className='flex h-16 flex-col justify-center items-center gap-[10px] self-stretch hover:bg-[#EAEAE8] hover:cursor-pointer'>
                        <FontAwesomeIcon icon={faGear} />
                    </button>
                </div>
                <div className='flex flex-col items-start gap-4 self-stretch'>
                <button onClick={() => setIsCollapsed(!isCollapsed)} className='flex h-16 flex-col justify-center items-center gap-[10px] self-stretch hover:bg-[#EAEAE8] hover:cursor-pointer'>
                    <FontAwesomeIcon icon={isCollapsed ? faAnglesRight : faAnglesLeft} />
                </button>
                </div>
            </div>
            {!isCollapsed && (
                <div className='flex flex-col shrink-0 self-stretch pt-6 pb-6 gap-1 w-48 border-r-[3px] border-[#EDEDEF] bg-[#FBFBFA] text-sm'>
                    {notes.map(note => (
                        <div key={note.id} className='flex items-center self-stretch justify-between p-[6px_16px] hover:bg-[#EAEAE8] hover:cursor-pointer'>
                            <button onClick={() => setSelectedNote(note)} className='flex p-[6px_16px] items-start gap-[10px] self-stretch'>
                                <div><FontAwesomeIcon icon={faFile} /></div>
                                {note.title}
                            </button>
                            <button onClick={() => handleDeleteClick(note.id)} className='ml-auto'>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                    ))}
                    <button onClick={() => setShowModal(true)} className='flex items-center self-stretch justify-between p-[6px_16px] hover:bg-[#EAEAE8] hover:cursor-pointer'>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            )}

            {selectedNote && (
                <div className='flex flex-col items-center gap-32 self-stretch w-screen h-screen'>
                    <div className='flex px-3 py-9 justify-between items-start w-full self-stretch border-b-[1px] border-[#f5f5f4] text-normal h-[17px]'>
                        <div className='flex items-start gap-[10px]'>
                            {editing ? (
                                <input
                                    type='text'
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            ) : (
                                selectedNote.title
                            )}
                        </div>
                        <div className='flex justify-end items-start gap-4'>
                            {editing ? (
                                <button onClick={updateNote} className='hover:bg-[#EAEAE8] hover:cursor-pointer'>
                                    <FontAwesomeIcon icon={faSave} />
                                </button>
                            ) : (
                                <button onClick={() => setEditing(true)} className='hover:bg-[#EAEAE8] hover:cursor-pointer'>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            )}
                            <button className='hover:bg-[#EAEAE8] hover:cursor-pointer'>
                                <FontAwesomeIcon icon={faPrint} />
                            </button>
                            <button className='hover:bg-[#EAEAE8] hover:cursor-pointer'>
                                <FontAwesomeIcon icon={faShare} />
                            </button>
                        </div>
                    </div>
                    <div className='flex w-[700px] flex-col items-start'>
                        <div className='flex items-start gap-[10px] self-stretch py-3 border-b-[1px] border-[#EDEDF0]'>
                            <p className='text-[40px] font-bold'>{title}</p>
                        </div>
                        <div className='flex items-start gap-[10px] self-stretch pt-9 pb-2'>
                            {editing ? (
                                <textarea
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                />
                            ) : (
                                <p className='text-[30px] font-semibold'>{content}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {showModal && (
            <div className='w-screen h-screen fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[#DEDEDE] bg-opacity-[52%] z-100'>
                <div className='flex p-12 flex-col justify-center items-center gap-8 rounded-[15px] max-w-screen-md bg-white max-h-[250px] shadow'>
                    <p className='color-[#000] text-[24px]'>Create new note</p>
                    <input
                        type='text'
                        className='border p-2 w-full'
                        value={newNoteTitle}
                        onChange={e => setNewNoteTitle(e.target.value)}
                    />
                    <textarea
                        className='border p-2 w-full'
                        value={newNoteContent}
                        onChange={e => setNewNoteContent(e.target.value)}
                    />
                    <div className='flex justify-center items-center gap-16'>
                        <button
                            onClick={createNote}
                            className='flex p-2 justify-center items-center gap-[10px] rounded-[5px] bg-[#41f203] text-white'
                        >
                            Create
                        </button>
                        <button
                            onClick={() => setShowModal(false)}
                            className='flex p-2 justify-center items-center gap-[10px] rounded-[5px] bg-[#f21103] text-white'
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            )}
            {showDeleteModal && (
                <div className='w-screen h-screen fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[#DEDEDE] bg-opacity-[52%] z-100'>
                    <div className='flex p-12 flex-col justify-center items-center gap-8 rounded-[15px] max-w-screen-sm bg-white max-h-[200px] shadow'>
                        <p className='color-[#000] text-[24px]'>Opravdu chcete smazat poznámku?</p>
                        <div className='flex justify-center items-center gap-16'>
                            <button onClick={deleteNote} className='flex p-2 justify-center items-center gap-[10px] rounded-[5px] bg-[#41f203] text-white'>Ano</button>
                            <button onClick={() => setShowDeleteModal(false)} className='flex p-2 justify-center items-center gap-[10px] rounded-[5px] bg-[#f21103] text-white'>Ne</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Note;