import {Loader2} from "lucide-react";
import React from "react";

type Props = {
    isLoading?: boolean;
    children?: React.ReactNode;
};
const LoadSpinner = ({isLoading,children}: Props) => {
    if(!isLoading) {
        return children
    }
    return (
        <div className="flex justify-center items-center h-full">
            <Loader2 className="w-6 h-6 animate-spin"/>
        </div>
    );
};
export default LoadSpinner;
