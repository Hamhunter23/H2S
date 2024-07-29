import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import Module from "./ModuleBox";

interface OptionsModalProps {
    options: string[];
    modules: object[];
    start: (moduleName: string) => void;
    details: (details: string) => void;
    selectHandle: (module: object) => void;
}


const OptionsModal: React.FC<OptionsModalProps> = ({ options, modules, start, details, selectHandle }) => {
    const renderModule = (module: object, index) => {
        return (
            <Module key={index} select={true} name={module.moduleName} selectHandle={() => selectHandle(module)} start={() => start(module.moduleName)} details={() => details(module.details)} />
        );
    };

    useEffect(() => {
        const optionElement = document.getElementById("options");
        if (optionElement) {
            const root = createRoot(optionElement);
            const renderedModules = options.map((option,_) => {
                const selectedModule = modules.find((module) => module.moduleName === option);
                return renderModule(selectedModule,_);
            });
            root.render(<>{renderedModules}</>);
        }
    }, [options]);

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="fixed top-1/4 z-10 w-3/5 h-3/5 overflow-auto bg-green-500 rounded-xl">
                <span className="text-black float-right text-3xl font-bold hover:text-white hover:no-underline hover:cursor-pointer focus:text-white focus:no-underline focus:cursor-pointer close">&times;</span>
                <div id="options" className="flex flex-wrap w-full justify-center"></div>
            </div>
        </div>
    );
};

export default OptionsModal;