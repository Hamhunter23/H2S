"use client";

import React from "react";

interface ContentBoxProps {
    title: String;
    learn: () => void;
}

const Content:React.FC<ContentBoxProps> = ({title, learn}) => {
    return(
        <div className="flex flex-col gap-1.5 items-center justify-center bg-yellow-500 rounded-full w-40 h-40 m-3">
            <p>{title}</p>
            <button
                className="bg-black rounded px-4 hover:bg-yellow-700"
                onClick={learn}
            >
                Learn
            </button>
        </div>
    )
};

export default Content;