"use client"
import React, { useEffect, useRef, useState } from "react";
import Modal from './components/Modal';
import Module from './components/ModuleBox';
import Content from './components/ContentBox';
import './journey_style.css';
import { read, utils, WorkBook, WorkSheet } from 'xlsx';

interface OutputRow {
    topic: string;
    title: string;
}

interface DataRow {
    topic: string;
    title: string;
    url: string;
}

interface ModuleData {
    moduleName: string;
    multiple: boolean;
    details: string;
    content: { title: string, url: string }[];
    column: number;
    row: number;
}

const Journey: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [visibleStates, setVisibleStates] = useState<Record<string, boolean>>({});
    const [detailState, setDetails] = useState<string>('');
    const [modules, setModules] = useState<ModuleData[]>([]);
    const pathwayRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const outputResponse = await fetch('/output.csv');
                const outputText = await outputResponse.text();
                const dataResponse = await fetch('/data.csv');
                const dataText = await dataResponse.text();

                const outputWorkbook: WorkBook = read(outputText, { type: 'string' });
                const outputSheet: WorkSheet = outputWorkbook.Sheets[outputWorkbook.SheetNames[0]];
                const outputData: OutputRow[] = utils.sheet_to_json(outputSheet, { header: ['topic', 'title'], range: 1 }); // Adjusted to skip header row

                const dataWorkbook: WorkBook = read(dataText, { type: 'string' });
                const dataSheet: WorkSheet = dataWorkbook.Sheets[dataWorkbook.SheetNames[0]];
                const dataArray: DataRow[] = utils.sheet_to_json(dataSheet, { header: ['topic', 'title', 'url'], range: 1 }); // Adjusted to skip header row

                // Group outputData by topic
                const groupedModules: Record<string, ModuleData> = {};

                outputData.forEach((outputRow) => {
                    const { topic, title } = outputRow;
                    if (!groupedModules[topic]) {
                        groupedModules[topic] = {
                            moduleName: topic,
                            multiple: true,
                            details: topic,
                            content: [],
                            column: 1,
                            row: -1,
                        };
                    }
                    const matchedData = dataArray.filter((dataRow) => dataRow.title === title);
                    matchedData.forEach((dataRow) => {
                        groupedModules[topic].content.push({ title, url: dataRow.url });
                    });
                });

                setModules(Object.values(groupedModules));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (pathwayRef.current) {
            const columnWidth = pathwayRef.current.getBoundingClientRect().width;
            const columnHeight = pathwayRef.current.getBoundingClientRect().height;

            const root = document.documentElement;
            root.style.setProperty('--column-width', `${columnWidth}px`);
            root.style.setProperty('--column-height', `${columnHeight}px`);
        } else {
            console.warn('Pathway reference is not set.');
        }
    }, [modules]);

    const start = (moduleName: string) => {
        setVisibleStates((prevStates) => ({
            ...prevStates,
            [moduleName]: true
        }));
    };

    const details = (details: string) => {
        setDetails(details);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const renderModules = (modules: ModuleData[]) => {
        return modules.map((module) => (
            <div key={module.moduleName} className="flex flex-col items-center relative pathway" style={{ gridColumn: module.column, gridRow: module.row }} ref={pathwayRef}>
                <div className={`container-content ${visibleStates[module.moduleName] ? 'visible' : ''}`}>
                    {module.content.map((content, i) => (
                        <Content key={i} title={content.title} learn={() => window.open(content.url, '_blank')} />
                    ))}
                </div>
                <Module name={module.moduleName} start={() => start(module.moduleName)} details={() => details(module.details)} />
            </div>
        ));
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
