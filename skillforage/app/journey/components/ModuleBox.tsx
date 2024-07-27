"use client";

import React, { useRef, useState, useEffect } from "react";

interface ModuleProps {
    name: String;
    start: () => void;
    details: () => void;
}

const Module: React.FC<ModuleProps> = ({ name, start, details }) => {


    return (
        <div>
            <div className="flex flex-col gap-1.5 items-center justify-center bg-blue-500 rounded-2xl w-72 h-40">
                <p>{name}</p>
                <button
                    className="bg-black rounded px-4 hover:bg-blue-700"
                    onClick={start}
                >
                    Start
                </button>
                <button
                    className="bg-black rounded px-4 hover:bg-blue-700"
                    onClick={details}
                >
                    Details
                </button>
            </div>
            
        </div>
    )
};

export default Module;