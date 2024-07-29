"use client";

import React, { useEffect, useState, useRef } from "react";
import Modal from './components/Modal'
import Module from './components/ModuleBox';
import Content from './components/ContentBox';
import ChooseModule from './components/ChooseModule';
import OptionsModal from "./components/OptionsModal";
import './journey_style.css';


const modules = [
    {
        moduleName: "Module1",
        details: "This is Module1",
        content: ["Content1", "Content2", "Content3", "Content4"],
        nextModule: "Module2",
        options: ["Option1", "Option2", "Option3", "Option4"],
    },
    {
        moduleName: "Module2",
        details: "This is Module2.1",
        content: ["Content1", "Content2", "Content3", "Content4"],
        nextModule: "Module3",
        options: ["Option1", "Option2"],
    },
    {
        moduleName: "Module3",
        details: "This is Module2.2",
        content: ["Content1", "Content2", "Content3"],
        nextModule: "Module3",
        options: ["Option1", "Option2", "Option3"],
    },
    {
        moduleName: "Option1",
        details: "This is Option1",
        content: ["Content1", "Content2", "Content3"],
        nextModule: "",
        options: [],
    },
    {
        moduleName: "Option2",
        details: "This is Option2",
        content: ["Content1", "Content2", "Content3"],
        nextModule: "",
        options: [],
    },
    {
        moduleName: "Option3",
        details: "This is Option3",
        content: ["Content1", "Content2", "Content3"],
        nextModule: "",
        options: [],
    },
    {
        moduleName: "Option4",
        details: "This is Option4",
        content: ["Content1", "Content2", "Content3"],
        nextModule: "",
        options: [],
    }
]


const Journey = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [detailState, setDetails] = useState('');
    const [visibleStates, setVisibleStates] = useState({});
    const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
    const [optionsState, setOptionsState] = useState([]);
    const [renderedModules, setRenderedModules] = useState([modules[0]]);

    const moduleContainerRef = useRef(null);

    const start = (moduleName) => {
        setVisibleStates((prevStates) => ({
            ...prevStates,
            [moduleName]: true
        }));
        setTimeout(() => {
            document.getElementById(moduleName)?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 1050);
    };

    const details = (details) => {
        setDetails(details || "No Details Found!");
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setIsOptionsModalVisible(false);
    };

    const choose = (options) => {
        setOptionsState(options);
        setIsOptionsModalVisible(true);
    };

    const moduleSelectHandle = (module) => {
        closeModal();
        setRenderedModules(prevModules => [...prevModules, module]);
    };

    const learn = () => {
        alert('Learning the Module!');
    }

    const renderModules = (module) => (
        <div key={module.moduleName} id={module.moduleName} className="flex flex-col items-center relative pathway">
            {visibleStates[module.moduleName] && <div className={`container-content flex flex-col-reverse items-center ${visibleStates[module.moduleName] ? 'visible' : ''}`}>
                {module.content.map((content, i) => (
                    <Content key={i} title={content} learn={learn} />
                ))}
                <ChooseModule choose={() => choose(module.options)} />
            </div>}
            <Module
                name={module.moduleName}
                select={false}
                start={() => start(module.moduleName)}
                details={() => details(module.details)}
                selectHandle={() => { }}
            />
        </div>
    );

    useEffect(() => {
        const span = document.querySelector(".close");
        if (span) {
            span.onclick = closeModal;
        }
        return () => {
            if (span) {
                span.onclick = null;
            }
        };
    }, [isModalVisible, isOptionsModalVisible]);

    // useEffect(() => {
    //     const columnElement = document.getElementsByClassName("pathway")[0] as HTMLElement;
    //     const columnHeight = columnElement.getBoundingClientRect().height;
    //     const root = document.documentElement;
    //     root.style.setProperty('--column-height', `${columnHeight}px`);
    // }, []);

    return (
        <div className="journey-container" style={{ height: '100vh', overflowY: 'auto' }}>
            {isOptionsModalVisible && (
                <OptionsModal
                    options={optionsState}
                    modules={modules}
                    start={start}
                    details={details}
                    selectHandle={moduleSelectHandle}
                />
            )}
            {isModalVisible && <Modal details={detailState} />}
            <div id="module-container" ref={moduleContainerRef} className="flex flex-col-reverse items-center justify-center relative min-h-full py-8">
                {renderedModules.map(renderModules)}
            </div>
        </div>
    );
};

export default Journey;