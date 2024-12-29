import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { shipments } from "@prisma/client";

// Tip za kolone
type Column = {
    key: keyof shipments;
    label: string;
};

type Props = {
    columns: Column[];
    shipments: shipments[];
    formatDate: (value: Date | string | null) => string;
};

const TableRows = ({ columns, shipments, formatDate }: Props) => {
    return (
        <TableBody>
            {shipments.map((shipment) => (
                <TableRow key={shipment.id}>
                    {columns.map((col) => {
                        const value = shipment[col.key];
                        return (
                            <TableCell key={col.key}>
                                <Link href={`/shipments/${shipment.id}`}>
                                    {formatDate(value as Date | string | null)}
                                </Link>
                            </TableCell>
                        );
                    })}
                </TableRow>
            ))}
        </TableBody>
    );
};

export default TableRows;
