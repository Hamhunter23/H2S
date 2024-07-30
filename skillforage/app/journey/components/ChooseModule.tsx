import React, {useEffect} from "react";

interface ChooseModuleProps {
    choose: () => void;
}

const ChooseModule:React.FC<ChooseModuleProps> = ({choose}) => {
    return (
        <div className="flex flex-col gap-1.5 items-center justify-center bg-red-500 rounded-2xl w-64 h-40 relative m-5">
            <button
                className="bg-black rounded px-4 hover:bg-blue-700"
                onClick={choose}
            >Choose</button>
        </div>
    )
}

export default ChooseModule;