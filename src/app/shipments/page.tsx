import {DataTable} from "@/components/table/DataTable";
import {columns} from "@/app/shipments/columns";
import {prisma} from "@/lib/prisma";


const ShipmentsPage = async () => {

    const datas = await prisma.shipments.findMany();

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Overview</h1>
            <DataTable
                data={datas}
                columns={columns}
            />
        </div>
    );
};

export default ShipmentsPage;