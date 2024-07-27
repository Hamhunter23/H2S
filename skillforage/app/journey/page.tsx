"use client";

import React, { useEffect, useState } from "react";
import Module from './components/ModuleBox';
import Content from './components/ContentBox';

const Journey = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const start = () => {
        alert('Starting the Module!');
    };

    const details = () => {
        setIsModalVisible(true);
    };

    const learn = () => {
        alert('Learning the Module!');
    }

    const closeModal = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        const span = document.getElementsByClassName("close")[0] as HTMLElement;
        if (span) {
            span.onclick = closeModal;
        }
        return () => {
            if (span) {
                span.onclick = null;
            }
        };
    }, [isModalVisible]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            {isModalVisible && <div className='fixed z-10 w-2/5 h-2/5 overflow-auto bg-blue-500 rounded-xl'>
                <div className="bg-red-500 my-10p mx-auto p-5 border-solid border-white w-4/5 max-w-xl rounded-xl shadow-custom">
                    <span className="text-black float-right text-3xl font-bold hover:text-white hover:no-underline hover:cursor-pointer focus:text-white focus:no-underline focus:cursor-pointer close">&times;</span>
                    <p>No Details Found</p>
                </div>
            </div>}
            {
                Array.from({length: 4}).map((_,i) => (
                    <Content key={i} title="Content Box" learn={learn} />
                ))
            }
            <Module name="Module Name" start={start} details={details} />
        </div>
    );
};

export default Journey;