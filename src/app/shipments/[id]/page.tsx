import { prisma } from "@/lib/prisma";
import DataTable from "@/components/DataTable";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
    params: {
        id: string;
    };
};

const columns = [
    { key: "field", label: "Field" },
    { key: "value", label: "Value" },
];

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

    const data = Object.entries(shipment).map(([key, value]) => ({
        field: formatKey(key),
        value: String(value),
    }));

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Shipment Details</h1>
            <ScrollArea className="h-[550px] rounded-md border p-4">
                <DataTable
                    data={data}
                    columns={columns}
                />
            </ScrollArea>
        </div>
    );
};

function formatKey(key: string): string {
    return key
        .replace(/_/g, " ")
        .replace(/\b\w/g, char => char.toUpperCase())
        .replace(/Id\b/, "ID");
}

export default ShipmentDetailPage;