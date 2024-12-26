import {TableBody, TableCell, TableRow} from "@/components/ui/table";
import Link from "next/link";
import React from "react";

type Column = {
    key: string;
    label: string;
};
interface TableRowsProps {
    columns: Column[];
    shipments: any[];
    formatValue: (value: any) => string;
}

export const TableRows: React.FC<TableRowsProps> = ({ columns, shipments, formatValue }) => (
    <TableBody>
        {shipments.map((shipment, index) => (
            <TableRow key={shipment.id || index}>
                {columns.map((col) => (
                    <TableCell key={col.key}>
                        <Link href={`/shipments/${shipment.id}`}>
                            {formatValue(shipment[col.key])}
                        </Link>
                    </TableCell>
                ))}
            </TableRow>
        ))}
    </TableBody>
);
