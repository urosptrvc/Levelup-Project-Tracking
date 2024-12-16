import { prisma } from "@/lib/prisma";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import Link from "next/link";

export default async function ShipmentDetailPage({ params }: any) {
    const shipment = await prisma.shipments.findUnique({
        where: { id: Number(params.id) },
    });

    if (!shipment) {
        return (
            <div className="container mx-auto py-10">
                <h1 className="text-2xl font-bold text-red-600">Shipment Not Found</h1>
            </div>
        );
    }

    function formatDate(date: Date | null): string {
        if (!date) return "Not Defined";
        if (date.getFullYear() === 1900 && date.getMonth() === 0 && date.getDate() === 1) {
            return "Self-Delivery";
        }

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        if (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0) {
            return `${day}.${month}.${year}`;
        }

        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    function removeQuotes(value: any): string {
        if (typeof value === "string") {
            return value.replace(/"/g, ""); // Capture the result and return it
        } else if (value === null) {
            return "Not Defined";
        } else {
            return value.toString(); // Convert non-null, non-string types to string
        }
    }


    // Podaci za tabelu spakovani u const
    const shipmentDetails = [
        { field: "Filename", value: shipment.filename },
        { field: "Carrier Type", value: removeQuotes(shipment.carrier_type) },
        { field: "Carrier", value: removeQuotes(shipment.carrier) },
        { field: "Status", value: removeQuotes(shipment.status) },
        { field: "House AWB", value: removeQuotes(shipment.house_awb) },
        { field: "Shipper", value: removeQuotes(shipment.shipper) },
        { field: "Shipper Country", value: removeQuotes(shipment.shipper_country) },
        { field: "Receiver", value: removeQuotes(shipment.receiver) },
        { field: "Receiver Country", value: removeQuotes(shipment.receiver_country) },
        { field: "PO number", value: removeQuotes(shipment.po_number) },
        { field: "Packages", value: removeQuotes(shipment.packages) },
        { field: "Weight", value: removeQuotes(shipment.weight) },
        { field: "Volume", value: removeQuotes(shipment.volume) },
        { field: "ETA (Estimated Time of Arrival)", value: formatDate(shipment.eta) },
        { field: "ETD (Estimated Time of Departure)", value: formatDate(shipment.etd) },
        { field: "ATD (Actual Time of Departure)", value: formatDate(shipment.atd) },
        { field: "ATA (Actual Time of Arrival)", value: formatDate(shipment.ata) },
        { field: "Vessel/Flight", value: removeQuotes(shipment.vessel_flight) },
        { field: "Pickup Date", value: formatDate(shipment.pickup_date) },
        { field: "Latest Checkpoint", value: removeQuotes(shipment.latest_cp) },
        { field: "Shipper Ref No", value: removeQuotes(shipment.shipper_ref_no) },
        { field: "Inco Term", value: removeQuotes(shipment.inco_term) },
    ];

    return (
        <div className="container mx-auto py-10">
            <Link href="/shipments" className="text-blue-600 underline">
                ← Back to Shipments Overview
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
                    {shipmentDetails.map((detail, index) => (
                        <TableRow key={index}>
                            <TableCell>{detail.field}</TableCell>
                            <TableCell>{detail.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
