"use client";

import React, { useEffect, useState, useRef } from "react";
import { Info } from 'lucide-react';
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
        nextModule: "Option2",
        options: [],
    },
    {
        moduleName: "Option2",
        details: "This is Option2",
        content: ["Content1", "Content2", "Content3"],
        nextModule: "Option3",
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

class Node<T> {
    value: T;
    next: Node<T> | null = null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList<T> {
    head: Node<T> | null = null;

    constructor(initialValue: T | null = null) {
        this.head = initialValue !== null ? new Node(initialValue) : null;
    }

    add(value: T) {
        const newNode = new Node(value);
        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    toArray(): T[] {
        const result: T[] = [];
        let current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
}

const Journey = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [detailState, setDetails] = useState('');
    const [visibleStates, setVisibleStates] = useState<{ [key: string]: boolean }>({});
    const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
    const [optionsState, setOptionsState] = useState<any[]>([]);
    const [nextModuleState, setNextModuleState] = useState('');
    const [currentModuleState, setCurrentModuleState] = useState('');
    const [learnState, setLearnState] = useState(false);

    const [renderedModules, setRenderedModules] = useState(() => {
        const initialLinkedList = new LinkedList<any>();
        initialLinkedList.add(modules[0]);
        return initialLinkedList;
    });

    const moduleContainerRef = useRef(null);
    const lastModuleRef = useRef(null);


    const start = (moduleName: string) => {
        setVisibleStates((prevStates) => ({
            ...prevStates,
            [moduleName]: true
        }));
        setTimeout(() => {
            document.getElementById(moduleName)?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 700);
    };

    const details = (details: string) => {
        setDetails(details || "No Details Found!");
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const closeOptions = () => {
        setIsModalVisible(false);
        setIsOptionsModalVisible(false);
    };

    const closeLearnBoard = () => {
        setLearnState(false);
    };

    const choose = (options: any[], nextModule: string, currentModule: string) => {
        setOptionsState(options);
        setCurrentModuleState(currentModule);
        setNextModuleState(nextModule);
        setIsOptionsModalVisible(true);
    };

    const moduleSelectHandle = (selectedModule: any) => {
        closeOptions();
        setRenderedModules(prevModules => {
            const newModules = new LinkedList<any>();
            let current = prevModules.head;

            while (current && current.value.moduleName !== currentModuleState) {
                newModules.add(current.value);
                current = current.next;
            }

            if (current) {
                newModules.add(current.value);
            }

            newModules.add(selectedModule);
            return newModules;
        });

        setVisibleStates(prevStates => ({
            ...prevStates,
            [selectedModule.moduleName]: false
        }));

        lastModuleRef.current = selectedModule.moduleName;
    };


    const learn = () => {
        setLearnState(true);
    }

    const renderModules = (module: any) => (
        <div key={module.moduleName} id={module.moduleName} className="flex flex-col items-center relative pathway">
            {visibleStates[module.moduleName] && (
                <div className={`container-content flex flex-col-reverse items-center ${visibleStates[module.moduleName] ? 'visible' : ''}`}>
                    {module.content.map((content: string, i: number) => (
                        <Content key={i} title={content} learn={learn} />
                    ))}
                    {(module.options.length !== 0) && <ChooseModule choose={() => choose(module.options, module.nextModule, module.moduleName)} />}
                    {module.options.length === 0 && module.nextModule !== "" && renderModules(module.nextModule)}
                </div>
            )}
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
        const span = document.querySelector(".close") as HTMLElement;
        const spanOption = document.querySelector(".closeOption") as HTMLElement;
        const spanLearnBoard = document.querySelector(".closeLearnBoard") as HTMLElement;
        if (span) {
            span.onclick = closeModal;
        }
        if (spanOption) {
            spanOption.onclick = closeOptions;
        }
        if (spanLearnBoard) {
            spanLearnBoard.onclick = closeLearnBoard;
        }
        return () => {
            if (span) {
                span.onclick = null;
            }
            if (spanOption) {
                spanOption.onclick = null;
            }
            if (spanLearnBoard) {
                spanLearnBoard.onclick = null;
            }
        };
    }, [isModalVisible, isOptionsModalVisible, learnState]);

    useEffect(() => {
        if (lastModuleRef.current) {
            const lastModule = document.getElementById(lastModuleRef.current);
            if (lastModule) {
                lastModule.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            lastModuleRef.current = null;
        }
    }, [renderedModules]);

    return (
        <div className="journey-container" style={{ height: '100vh', overflow: 'hidden' }}>
            {isOptionsModalVisible && (
                <OptionsModal
                    options={optionsState}
                    nextModule={nextModuleState}
                    modules={modules}
                    start={start}
                    details={details}
                    selectHandle={moduleSelectHandle}
                />
            )}
            {isModalVisible && <Modal details={detailState} />}
            <div className="flex relative h-full">
                <div id="module-container" ref={moduleContainerRef} className={`flex-grow overflow-y-auto h-full py-8 ${learnState ? "move" : ""}`} >
                    <div className="flex flex-col-reverse items-center justify-center overflow-x-hidden relative w-full min-h-full" style={{ overflowY: 'auto' }}>
                        {renderedModules.toArray().map(renderModules)}
                    </div>
                </div>
                <div className={`flex flex-col h-screen bg-gray-300 learn-board ${learnState ? "move" : ""}`}>
                    {learnState && <header className="bg-white p-4">
                        <span className="text-black float-right text-3xl font-bold hover:text-red-700 hover:no-underline hover:cursor-pointer focus:text-red-700 focus:no-underline focus:cursor-pointer closeLearnBoard">
                            &times;
                        </span>
                        <h1 className="text-2xl font-bold text-gray-800">Content Heading</h1>
                        <p className="text-sm text-gray-600">Module 1 &gt; Content 1</p>
                    </header>}
                    {learnState && <div className="bg-white shadow-xl rounded-2xl w-fill my-6 mx-4 relative h-full">
                        <div className="flex flex-col justify-center items-center h-full">
                            <h1 className="text-black font-bold">Content Goes Here</h1>
                        </div>
                    </div>}
                    {learnState && <footer className="bg-white p-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full w-1/3"></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Progress: 33%</p>
                    </footer>}
                </div>
            </div>
        </div>
    );
};

export default Journey;