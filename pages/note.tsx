import React, { useState, useEffect } from 'react';
import "@/app/globals.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faGear, faAnglesRight, faAnglesLeft, faFile, faShare } from '@fortawesome/free-solid-svg-icons';
import { faPrint } from '@fortawesome/free-solid-svg-icons/faPrint';

const Note: React.FC = () => {
    const [noteData, setNoteData] = useState<null | { title: string; content: any[] }>(null);
    const [isExpanded, setIsExpanded] = useState(true);
    const [selectedFile, setSelectedFile] = useState('I3_HS');
    const [selectedButton, setSelectedButton] = useState('book');

    useEffect(() => {
        fetch('/api/notes/I3_HS')
            .then(response => response.json())
            .then(data => setNoteData(data));
    }, []);

    const handleFileClick = (file: string) => {
        setSelectedFile(file);
    };

    const handleButtonClick = (button: string) => {
        setSelectedButton(button);
    };

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
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
                    <button onClick={() => handleFileClick('I4_HS')} className={`flex p-[6px_16px] items-start gap-[10px] self-stretch hover:bg-[#EAEAE8] hover:cursor-pointer ${selectedFile === 'I4_HS' ? 'bg-[#f1f1f0]' : ''}`}>
                        <div><FontAwesomeIcon icon={faFile} /></div>
                        I4 HS
                    </button>
                    <button onClick={() => handleFileClick('I3_HS')} className={`flex p-[6px_16px] items-start gap-[10px] self-stretch hover:bg-[#EAEAE8] hover:cursor-pointer ${selectedFile === 'I3_HS' ? 'bg-[#f1f1f0]' : ''}`}>
                        <div><FontAwesomeIcon icon={faFile} /></div>
                        I3 HS
                    </button>
                    <button onClick={() => handleFileClick('I2_HS')} className={`flex p-[6px_16px] items-start gap-[10px] self-stretch hover:bg-[#EAEAE8] hover:cursor-pointer ${selectedFile === 'I2_HS' ? 'bg-[#f1f1f0]' : ''}`}>
                        <div><FontAwesomeIcon icon={faFile} /></div>
                        I2 HS
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
                                    <p className='text-[30px] font-semibold'>{noteData.title}</p>
                                </div>
                                {noteData.content.map((item, index) => (
                                    typeof item === 'string' ? (
                                        <div key={index} className='flex items-start gap-[10px] self-stretch flex-col py-1'>
                                            <p className='text-normal font-normal leading-6'>{item}</p>
                                        </div>
                                    ) : (
                                        <div key={index} className='flex items-start gap-[10px] self-stretch flex-col'>
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
                    <div className='flex items-start gap-[10px] self-stretch flex-col pt-9 pb-2'>
                        <p className='text-[30px] font-semibold'>Charakteristika DRP</p>
                    </div>
                    <div className='flex items-start gap-[10px] self-stretch flex-col py-1'>
                        <p className='leading-6'>O každém dynamickém routovacím protokolu můžeme říct, že má minimálně:</p>
                    </div>
                    <div className='flex items-start gap-[10px] self-stretch flex-col'>
                        <ul className='list-disc list-inside leading-6'>
                            <li>Algoritmus</li>
                            <li>Metriku</li>
                            <li>Zprávy daného protokolu</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Note;