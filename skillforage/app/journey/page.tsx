"use client";

import React, { useEffect, useState } from "react";
import Modal from './components/Modal'
import Module from './components/ModuleBox';
import Content from './components/ContentBox';
import './journey_style.css';


const modules = [
    {
        moduleName: "Module1",
        multiple: true,
        details: "This is Module1",
        content: ["Content1", "Content2", "Content3", "Content4"],
        column: 1,
        row: -1,
    },
    {
        moduleName: "Module2.1",
        multiple: true,
        details: "This is Module2.1",
        content: ["Content1", "Content2", "Content3"],
        column: 1,
        row: -2,
    },
    {
        moduleName: "Module2.2",
        multiple: false,
        details: "This is Module2.2",
        content: ["Content1", "Content2", "Content3"],
        column: 2,
        row: -2,
    },
    {
        moduleName: "Module2.3",
        multiple: false,
        details: "This is Module2.3",
        content: ["Content1", "Content2"],
        column: 3,
        row: -2,
    },
    {
        moduleName: "Module3.1",
        multiple: false,
        details: "This is Module3.1",
        content: ["Content1", "Content2"],
        column: 1,
        row: -3,
    },
    {
        moduleName: "Module3.2",
        multiple: false,
        details: "This is Module3.2",
        content: ["Content1", "Content2"],
        column: 2,
        row: -3,
    },
]

const Journey = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [visibleStates, setVisibleStates] = useState({});
    const [detailState, setDetails] = useState('');

    const start = (moduleName) => {
        setVisibleStates((prevStates) => ({
            ...prevStates,
            [moduleName]: true
        }));
    };

    const details = (details) => {
        setDetails(details);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const learn = () => {
        alert('Learning the Module!');
    }

    const renderModules = (modules) => {
        return modules.map((module) => (
            <div key={module.moduleName} className="flex flex-col items-center relative pathway" style={{ gridColumn: module.column, gridRow: module.row }}>
                {/* {module.multiple && <div className="horizontal"></div>} */}
                <div className={`container-content ${visibleStates[module.moduleName] ? 'visible' : ''}`}>
                    {/* <div className="vertical"></div> */}
                    {module.content.map((content, i) => (
                        <Content key={i} title={content} learn={learn} />
                    ))}
                </div>
                <Module name={module.moduleName} start={() => start(module.moduleName)} details={() => details(module.details)} />
            </div>
        ));
    };

    useEffect(() => {
        const columnElement = document.getElementsByClassName("pathway")[0] as HTMLElement;
        const columnWidth = columnElement.getBoundingClientRect().width;
        const columnHeight = columnElement.getBoundingClientRect().height;

        const root = document.documentElement;
        root.style.setProperty('--column-width', `${columnWidth}px`);
        root.style.setProperty('--column-height', `${columnHeight}px`);
    }, []);

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
        <div>
            {isModalVisible && <Modal details={detailState} />}
            <div className="grid-container">
                {renderModules(modules)}
                <div className="relative bg-black"></div>
            </div>
        </div>
    );
};

export default Journey;