import { FC } from "react";

interface PColorWidget {
    colorInput: string;
}

export const ColorWidget: FC<PColorWidget> = (props) => {
    return (
        <div className="flex flex-col items-center gap-16">
            <div className={`h-24 w-24 bg-[#ffb200]`} />
            <div className="flex flex-row gap-12">
                <div className="h-16 w-16 bg-[red]" />
                <div className="h-16 w-16 bg-[#d9d9d9]" />
                <div className="h-16 w-16 bg-[#00A3FF]" />
            </div>
        </div>
    );
}