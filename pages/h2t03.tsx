import { FC } from "react";
import { ColorWidget } from "@/components/ColorWidget";
import "@/app/globals.css";

const ColorShower: FC = () => {
    return (
        <div className="flex flex-col items-center gap-16 p-64">
            <h1 className="text-4xl">Color shower</h1>
            <div className="flex flex-row justify-between w-full">
                <input className="border border-black w-96 h-[4.875rem]" />
                <button className="p-6 bg-[#8EFF7B] rounded-xl text-2xl">Show</button>
            </div>
            <ColorWidget colorInput="#ffb200" />
        </div>
    );
}

export default ColorShower;