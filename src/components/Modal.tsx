// Modal.tsx
import React from 'react';

const Modal = ({ handleCloseModal }) => (
    <div className='w-screen h-screen fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[#DEDEDE] bg-opacity-[52%] z-100'>
        <div className='flex p-12 flex-col justify-center items-center gap-8 rounded-[15px] max-w-screen-sm bg-white max-h-[200px] shadow'>
            <p className='color-[#000] text-[24px]'>Opravdu chcete smazat poznámku?</p>
            <div className='flex justify-center items-center gap-16'>
                <button onClick={handleCloseModal} className='flex p-2 justify-center items-center gap-[10px] rounded-[5px] bg-[#41f203] text-white'>Ano</button>
                <button onClick={handleCloseModal} className='flex p-2 justify-center items-center gap-[10px] rounded-[5px] bg-[#f21103] text-white'>Ne</button>
            </div>
        </div>
    </div>
);

export default Modal;