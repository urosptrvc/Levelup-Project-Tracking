import { prisma } from "@/lib/prisma";
import { ScrollArea } from "@/components/ui/scroll-area";
import {DataTable} from "@/components/table/DataTable";
import {columns} from "@/app/shipments/[id]/columns";

type Props = {
    params: {
        id: string;
    };
};

const ShipmentDetailPage = async ({ params }: Props) => {
    const { id } = await params;
    const shipment = await prisma.shipments.findUnique({
        where: { id: Number(id) },
    });

    if (!shipment) {
        return (
            <div className="container mx-auto py-10">
                <h1 className="text-2xl font-bold text-red-600">Shipment Not Found</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Shipment Details</h1>
            <ScrollArea className="h-[550px] rounded-md border p-4">
                <DataTable data={[shipment]} columns={columns}/>
            </ScrollArea>
        </div>
    );
};


export default ShipmentDetailPage;