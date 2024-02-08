'use client';
import React, { useState } from "react";

const buttons = [
    { id: 1, text: "On", color: "white", btnColor: "bg-green-500" },
    { id: 2, text: "Off", color: "#B0B0B0", btnColor: "bg-red-500" },
];

const Buttons: React.FC = () => {
    const [bgColor, setBgColor] = useState("white");

    return (
        <div style={{ backgroundColor: bgColor }} className="flex items-center justify-center min-h-screen">
            <div className="space-x-4">
                {buttons.map((button) => (
                    <button key={button.id} onClick={() => setBgColor(button.color)} className={`${button.btnColor} px-4 py-2 text-white rounded`}>
                        {button.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Buttons;