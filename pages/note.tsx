'use client';
import React, { useState, useEffect } from 'react';
import "@/app/globals.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faGear, faAnglesRight, faAnglesLeft, faFile, faShare, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faPrint } from '@fortawesome/free-solid-svg-icons/faPrint';
import Modal from '@/components/Modal';

const Note: React.FC = () => {
    const [noteData, setNoteData] = useState<null | { title: string; content1: any[]; title2: string; content2: any[] }>(null);
    const [isExpanded, setIsExpanded] = useState(true);
    const [selectedFile, setSelectedFile] = useState('I3_HS');
    const [selectedButton, setSelectedButton] = useState('book');
    const [showModal, setShowModal] = useState(false);
    const [deleteClicked, setDeleteClicked] = useState(false);
    const [showNewNoteModal, setShowNewNoteModal] = useState(false);

    useEffect(() => {
        fetch('/api/notes/I3_HS')
            .then(response => response.json())
            .then(data => setNoteData(data));
    }, []);

    useEffect(() => {
        if (deleteClicked) {
            setShowModal(true);
        }
    }, [deleteClicked]);

    const handleFileClick = (file: string) => {
        setSelectedFile(file);
    };

    const handleButtonClick = (button: string) => {
        setSelectedButton(button);
    };

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handleDeleteClick = () => {
        setDeleteClicked(true);
    };


    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className='flex items-start bg-[#fff] w-screen h-screen'>
            <div className='flex pt-[10px] pb-[10px] flex-col justify-between items-start self-stretch shrink-0 border-r-2 border-[#fbfbfa] text-2xl w-[82px]'>
                <div className='flex flex-col items-start gap-4 self-stretch'>
                    <button 
                        onClick={() => handleButtonClick('home')} 
                        className={`flex h-16 flex-col justify-center items-center gap-[10px] self-stretch hover:bg-[#EAEAE8] hover:cursor-pointer ${selectedButton === 'home' ? 'bg-[#f1f1f0]' : ''}`}
                    >
                        <FontAwesomeIcon icon={faHome} />
                    </button>
                    <button 
                        onClick={() => handleButtonClick('book')} 
                        className={`flex h-16 flex-col justify-center items-center gap-[10px] self-stretch hover:bg-[#EAEAE8] hover:cursor-pointer ${selectedButton === 'book' ? 'bg-[#f1f1f0]' : ''}`}
                    >
                        <FontAwesomeIcon icon={faBook} />
                    </button>
                    <button 
                        onClick={() => handleButtonClick('gear')} 
                        className={`flex h-16 flex-col justify-center items-center gap-[10px] self-stretch hover:bg-[#EAEAE8] hover:cursor-pointer ${selectedButton === 'gear' ? 'bg-[#f1f1f0]' : ''}`}
                    >
                        <FontAwesomeIcon icon={faGear} />
                    </button>
                </div>
                <div className='flex flex-col items-start gap-4 self-stretch'>
                    <button onClick={handleExpandClick} className='flex h-16 flex-col justify-center items-center gap-[10px] self-stretch hover:bg-[#EAEAE8] hover:cursor-pointer'>
                        <FontAwesomeIcon icon={isExpanded ? faAnglesLeft : faAnglesRight} />
                    </button>
                </div>
            </div>
            {isExpanded && (
            <div className='flex flex-col shrink-0 self-stretch pt-6 pb-6 gap-1 w-48 border-r-[3px] border-[#EDEDEF] bg-[#FBFBFA] text-sm'>
                <div onClick={() => handleFileClick('I4_HS')} className={`flex items-center self-stretch justify-between p-[6px_16px] hover:bg-[#EAEAE8] hover:cursor-pointer ${selectedFile === 'I4_HS' ? 'bg-[#f1f1f0]' : ''}`}>
                    <button className='flex p-[6px_16px] items-start gap-[10px] self-stretch'>
                        <div><FontAwesomeIcon icon={faFile} /></div>
                        I4 HS
                    </button>
                    <button onClick={handleDeleteClick} className='ml-auto'>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <div onClick={() => handleFileClick('I3_HS')} className={`flex items-center self-stretch justify-between p-[6px_16px] hover:bg-[#EAEAE8] hover:cursor-pointer ${selectedFile === 'I3_HS' ? 'bg-[#f1f1f0]' : ''}`}>
                    <button className='flex p-[6px_16px] items-start gap-[10px] self-stretch'>
                        <div><FontAwesomeIcon icon={faFile} /></div>
                        I3 HS
                    </button>
                    <button onClick={handleDeleteClick} className='ml-auto'>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <div onClick={() => handleFileClick('I2_HS')} className={`flex items-center self-stretch justify-between p-[6px_16px] hover:bg-[#EAEAE8] hover:cursor-pointer ${selectedFile === 'I2_HS' ? 'bg-[#f1f1f0]' : ''}`}>
                    <button className='flex p-[6px_16px] items-start gap-[10px] self-stretch'>
                        <div><FontAwesomeIcon icon={faFile} /></div>
                        I2 HS
                    </button>
                    <button onClick={handleDeleteClick} className='ml-auto'>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <button onClick={() => setShowNewNoteModal(true)} className={`flex items-center self-stretch justify-between p-[6px_16px] hover:bg-[#EAEAE8] hover:cursor-pointer`}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            )}
            <div className='flex flex-col items-center gap-32 self-stretch w-screen h-screen'>
                <div className={`flex px-3 py-9 justify-between items-start w-full self-stretch border-b-[1px] border-[#f5f5f4] text-normal h-[17px]`}>
                    <div className='flex items-start gap-[10px]'>
                        {selectedFile}
                    </div>
                    <div className='flex justify-end items-start gap-4'>
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
                        <p className='text-[40px] font-bold'>{selectedFile}</p>
                    </div>
                    {noteData && (
                        <>
                            <div className='flex items-start gap-[10px] self-stretch pt-9 pb-2'>
                                <p className='text-[30px] font-semibold'>{noteData?.title[0]}</p>
                            </div>
                            {noteData?.content1.map((item, index) => (
                                typeof item === 'string' ? (
                                    <div className='flex items-start gap-[10px] self-stretch flex-col py-1' key={index}>
                                        <p className='text-normal font-normal leading-6'>{item}</p>
                                    </div>
                                ) : (
                                    <div className='flex items-start gap-[10px] self-stretch flex-col' key={index}>
                                        <ul className='list-disc list-inside leading-6'>
                                            {item.items.map((listItem: string, listItemIndex: number) => (
                                                <li key={listItemIndex}>{listItem}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            ))}
                            <div className='flex items-start gap-[10px] self-stretch pt-9 pb-2'>
                                <p className='text-[30px] font-semibold'>{noteData?.title[1]}</p>
                            </div>
                            {noteData?.content2.map((item, index) => (
                                typeof item === 'string' ? (
                                    <div className='flex items-start gap-[10px] self-stretch flex-col py-1' key={index}>
                                        <p className='text-normal font-normal leading-6'>{item}</p>
                                    </div>
                                ) : (
                                    <div className='flex items-start gap-[10px] self-stretch flex-col' key={index}>
                                        <ul className='list-disc list-inside leading-6'>
                                            {item.items.map((listItem: string, listItemIndex: number) => (
                                                <li key={listItemIndex}>{listItem}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            ))}
                        </>
                    )}
                </div>
            </div>
            {showModal && <Modal handleCloseModal={handleCloseModal} />}
            {showNewNoteModal && (
                <div className='w-screen h-screen fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[#DEDEDE] bg-opacity-[52%] z-100'>
                    <div className='flex p-12 flex-col justify-center items-center gap-8 rounded-[15px] max-w-screen-md bg-white max-h-[250px] shadow'>
                        <p className='color-[#000] text-[24px]'>Vytvořit novou poznámku</p>
                        <input type='text' className='border p-2 w-full' />
                        <div className='flex justify-center items-center gap-16'>
                            <button className='flex p-2 justify-center items-center gap-[10px] rounded-[5px] bg-[#41f203] text-white'>Vytvořit</button>
                            <button onClick={() => setShowNewNoteModal(false)} className='flex p-2 justify-center items-center gap-[10px] rounded-[5px] bg-[#f21103] text-white'>Zrušit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Note;