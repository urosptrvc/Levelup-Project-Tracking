import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

export default async function ShipmentsPage() {
    const shipments = await prisma.shipments.findMany()

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Shipments</h1>
                <Link
                    href="/shipments/upload"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Upload XLSX
                </Link>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Carrier</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Shipper</TableHead>
                        <TableHead>Receiver</TableHead>
                        <TableHead>Packages</TableHead>
                        <TableHead>Weight</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {shipments.map((shipment) => (
                        <TableRow key={shipment.id} className="cursor-pointer hover:bg-gray-100">
                            <Link href={`/shipments/${shipment.id}`} className="contents">
                                <TableCell>{shipment.Carrier}</TableCell>
                                <TableCell>{shipment.status || "-"}</TableCell>
                                <TableCell>{shipment.shipper || "-"}</TableCell>
                                <TableCell>{shipment.receiver || "-"}</TableCell>
                                <TableCell>{shipment.packages ?? 0}</TableCell>
                                <TableCell>{shipment.weight ?? 0}</TableCell>
                            </Link>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
