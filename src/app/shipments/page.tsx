import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/app/shipments/columns";
import {getData} from "@/lib/action";

const ShipmentsPage = async ({
    searchParams,
}: {
    searchParams?: {
        query?: string;
    };
}) => {
    const query = searchParams?.query || "";
    const datas = await getData(query);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Overview</h1>
            <DataTable data={datas} columns={columns} />
        </div>
    );
};

export default ShipmentsPage;