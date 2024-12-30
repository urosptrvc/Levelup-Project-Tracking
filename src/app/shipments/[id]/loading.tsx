import SkeletonWrapper from "@/components/SkeletonWrapper";

const Loading = () => {

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Shipment Details</h1>
                <SkeletonWrapper rows={10} isLoading={true}/>
        </div>
    );
}

export default Loading;
