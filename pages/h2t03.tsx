import React from 'react';
import '@/app/globals.css';

const ColorShowerPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center min-h-screen p-[256px] gap-[64px]">
            <h1 className="text-4xl">Color Shower</h1>
            <div className="flex justify-between items-center self-stretch">
                <input type="text" className="flex flex-col justify-center items-start gap-[10px] self-stretch border-[1px] border-[#000] w-[384px]" />
                <button className="flex justify-center items-center gap-[10px] bg-[#8eff7b] text-[#000] p-6 rounded-[10px]">Show</button>
            </div>
            <div className="w-24 h-24 bg-[#ffb200]"></div>
            <div className="flex gap-12">
                <div className="w-16 h-16 bg-[#F00]"></div>
                <div className="w-16 h-16 bg-[#d9d9d9]"></div>
                <div className="w-16 h-16 bg-[#00A3FF]"></div>
            </div>
        </div>
    );
};

export default ColorShowerPage;