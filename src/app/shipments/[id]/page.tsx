import { prisma } from "@/lib/prisma"
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table"
import { formatValue } from "@/app/utils/formatters";

type Props = {
    params: {
        id: string
    }
}

const ShipmentDetailPage = async ({ params }: Props) => {
    const shipment = await prisma.shipments.findUnique({
        where: { id: Number(params.id) },
    })

    if (!shipment) {
        return (
            <div className="container mx-auto py-10">
                <h1 className="text-2xl font-bold text-red-600">Shipment Not Found</h1>
            </div>
        )
    }

    const entries = Object.entries(shipment)

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Shipment Details</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Field</TableHead>
                        <TableHead>Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {entries.map(([key, value]) => (
                        <TableRow key={key}>
                            <TableCell>{formatKey(key)}</TableCell>
                            <TableCell>{formatValue(value)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}


function formatKey(key: string): string {
    return key
        .replace(/_/g, " ")
        .replace(/\b\w/g, char => char.toUpperCase())
        .replace(/Id\b/, "ID")
}

export default ShipmentDetailPage
