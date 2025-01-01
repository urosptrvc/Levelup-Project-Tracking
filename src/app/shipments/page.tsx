// import { useRouter } from "next/navigation";
import {DataTable} from "@/components/table/DataTable";
import {columns} from "@/app/shipments/columns";
import {prisma} from "@/lib/prisma";


const ShipmentsPage = async () => {
    //const rowsPerPage = 15;
    // const router = useRouter();
    const dataaa = await prisma.shipments.findMany();

    // const handleRowClick = (id: string) => {
    //   router.push(`/shipments/${id}`);
    // };


    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Overview</h1>
            <DataTable
                data={dataaa}
                columns={columns}
            />
        </div>
    );
};

export default ShipmentsPage;