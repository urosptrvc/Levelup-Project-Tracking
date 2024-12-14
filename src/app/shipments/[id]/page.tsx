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
    function formatDate(date: Date | null): string {
        if (!date) return "Not Defined"; // Ako datum ne postoji, vrati "-"

        // Provera za "Self-Delivery" - fiksni datum iz 1900
        if (date.getFullYear() === 1900 && date.getMonth() === 0 && date.getDate() === 1) {
            return "Self-Delivery";
        }

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        // Provera ako su sati, minuti i sekunde nula
        if (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0) {
            return `${day}.${month}.${year}`; // Prikazuje samo datum
        }

        // U suprotnom, prikazuje datum i vreme
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    function removeQuotes(value: any): string {
        if (typeof value === "string") {
            return value.replace(/"/g, ""); // Uklanja sve znakove `"`
        }
        return value; // Ako nije string, vrati vrednost kako jeste
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
                        <TableCell>{removeQuotes(shipment.carrier_type)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>{removeQuotes(shipment.status)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Shipper</TableCell>
                        <TableCell>{removeQuotes(shipment.shipper)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Shipper Country</TableCell>
                        <TableCell>{removeQuotes(shipment.shipper_country)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Receiver</TableCell>
                        <TableCell>{removeQuotes(shipment.receiver)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Receiver Country</TableCell>
                        <TableCell>{removeQuotes(shipment.receiver_country)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Packages</TableCell>
                        <TableCell>{removeQuotes(shipment.packages)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Weight</TableCell>
                        <TableCell>{removeQuotes(shipment.weight)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Volume</TableCell>
                        <TableCell>{removeQuotes(shipment.volume)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>ETA (Estimated Time of Arrival)</TableCell>
                        <TableCell>{formatDate(shipment.eta)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>ETD (Estimated Time of Departure)</TableCell>
                        <TableCell>{formatDate(shipment.etd)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>ATD (Actual Time of Departure)</TableCell>
                        <TableCell>{formatDate(shipment.atd)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>ATA (Actual Time of Arrival)</TableCell>
                        <TableCell>{formatDate(shipment.ata)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Vessel/Flight</TableCell>
                        <TableCell>{removeQuotes(shipment.vessel_flight)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Pickup Date</TableCell>
                        <TableCell>{formatDate(shipment.pickup_date)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Latest CP</TableCell>
                        <TableCell>{removeQuotes(shipment.latest_cp)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Shipper Ref No</TableCell>
                        <TableCell>{removeQuotes(shipment.shipper_ref_no)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Inco Term</TableCell>
                        <TableCell>{removeQuotes(shipment.inco_term)}</TableCell>
                    </TableRow>
                </TableBody>

            </Table>
        </div>
    )
}
