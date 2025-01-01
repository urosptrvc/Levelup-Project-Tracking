import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/app/shipments/columns";
import { prisma } from "@/lib/prisma";

const ShipmentsPage = async ({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) => {
    const query = await searchParams?.query || "";

    // Dynamically get all fields from the `Shipment` model
    const sampleShipment = await prisma.shipments.findFirst();
    const fields = sampleShipment 
        ? Object.keys(sampleShipment) 
        : [];

    // Filter only string fields that can use 'contains'
    const stringFields = fields.filter(field => 
        typeof (sampleShipment as any)[field] === 'string'
    );

    // Construct the filters array
    const filters = stringFields.map((field) => ({
        [field]: { contains: query},
    }));

    const datas = await prisma.shipments.findMany({ // Corrected model name
        where: {
            OR: filters,
        },
    });

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Overview</h1>
            <DataTable data={datas} columns={columns} />
        </div>
    );
};

export default ShipmentsPage;