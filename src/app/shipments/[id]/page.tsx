import { prisma } from "@/lib/prisma"
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table"
import Link from "next/link";

interface ShipmentPageProps {
    params: { id: number }
}

export default async function ShipmentDetailPage({ params }: ShipmentPageProps) {
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

    return (
        <div className="container mx-auto py-10">
            <Link href="/shipments" className="text-blue-600 underline">
                ← Back to Shipments List
            </Link>
            <h1 className="text-2xl font-bold mb-6">Shipment Details</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Field</TableHead>
                        <TableHead>Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Carrier</TableCell>
                        <TableCell>{shipment.carrier_type}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>{shipment.status || "-"}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Shipper</TableCell>
                        <TableCell>{shipment.shipper || "-"}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Shipper Country</TableCell>
                        <TableCell>{shipment.shipper_country || "-"}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Receiver</TableCell>
                        <TableCell>{shipment.receiver || "-"}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Receiver Country</TableCell>
                        <TableCell>{shipment.receiver_country || "-"}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Packages</TableCell>
                        <TableCell>{shipment.packages ?? 0}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Weight</TableCell>
                        <TableCell>{shipment.weight ?? 0}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Volume</TableCell>
                        <TableCell>{shipment.volume ?? 0}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>ETA</TableCell>
                        <TableCell>{shipment.eta?.toISOString() || "-"}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>ETD</TableCell>
                        <TableCell>{shipment.etd?.toISOString() || "-"}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}
