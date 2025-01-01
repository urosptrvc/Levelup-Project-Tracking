import React from "react";
import SkeletonWrapper from "@/components/SkeletonWrapper";

const Loading = () => {
    return (
        <div className="container mx-auto py-10">
            <SkeletonWrapper rows={10}/>
        </div>
    );
};

export default Loading;
