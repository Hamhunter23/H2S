import React, { useMemo } from "react";
import Module from "./ModuleBox";

interface Module {
    moduleName: string;
    details: string;
}

interface OptionsModalProps {
    options: string[];
    nextModule: string;
    modules: Module[];
    start: (moduleName: string) => void;
    details: (details: string) => void;
    selectHandle: (module: object) => void;
}

const OptionsModal: React.FC<OptionsModalProps> = ({ options, nextModule, modules, start, details, selectHandle }) => {

    const renderedModules = useMemo(() => {
        return options
            .map(option => modules.find(module => module.moduleName === option))
            .filter((module) => module !== undefined);
    }, [options, modules]);

    const renderNextModule = useMemo(() => {
        return modules.find(module => module.moduleName === nextModule);
    }, [nextModule]);

    const renderModule = (module) => (
        <Module 
            key={module.moduleName} 
            select={true} 
            name={module.moduleName} 
            selectHandle={() => selectHandle(module)} 
            start={() => start(module.moduleName)} 
            details={() => details(module.details)} 
        />
    );

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="fixed top-1/4 z-10 w-3/5 h-3/5 overflow-auto bg-green-500 rounded-xl">
                <span className="text-black float-right text-3xl font-bold hover:text-white hover:no-underline hover:cursor-pointer focus:text-white focus:no-underline focus:cursor-pointer closeOption">
                    &times;
                </span>
                <div className="flex flex-col items-center">
                    <h1 className="text-black text-lg font-bold">Continue your Journey</h1>
                    {renderModule(renderNextModule)}
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="text-black text-lg font-bold">Suggested</h1>
                    <div id="options" className="flex flex-wrap w-full justify-center">
                        {renderedModules.map(renderModule)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OptionsModal;