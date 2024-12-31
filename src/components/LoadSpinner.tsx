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
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 "></div>
        </div>
    );
};
export default LoadSpinner;
