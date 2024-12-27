// app/shipments/loading.tsx

import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

export default function Loading() {
    const skeletonRows = Array.from({ length: 10 });

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Shipment Details</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Carrier Type</TableHead>
                        <TableHead>Carrier</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Shipper</TableHead>
                        <TableHead>Receiver</TableHead>
                        <TableHead>Receiver Country</TableHead>
                        <TableHead>Actual Time of Arrival</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {skeletonRows.map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Skeleton className="w-24 h-4" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-32 h-4" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-20 h-4" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-28 h-4" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-28 h-4" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-24 h-4" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-40 h-4" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
