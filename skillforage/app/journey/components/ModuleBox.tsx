import React, { useRef, useState, useEffect } from "react";

interface ModuleProps {
    name: String;
    select: boolean;
    start: () => void;
    details: () => void;
    selectHandle: () => void;
}

const Module: React.FC<ModuleProps> = ({ name, select, start, selectHandle, details }) => {
    return (
        <div className="flex flex-col gap-1.5 items-center justify-center bg-blue-500 rounded-2xl w-72 h-40 relative m-5">
            <p>{name}</p>
            <button
                className="bg-black rounded px-4 hover:bg-blue-700"
                onClick={select ? selectHandle : start}
            >
                {select ? "Select": "Start"}
            </button>
            <button
                className="bg-black rounded px-4 hover:bg-blue-700"
                onClick={details}
            >
                Details
            </button>
        </div>

    )
};

export default Module;