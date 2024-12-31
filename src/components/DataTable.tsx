"use client"

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatValue } from "@/app/utils/formatters";
import { shipments } from "@prisma/client";


//Konfigurisemo types za oba nacina prikazivanja tabela (overview i shipment detail)
type Props = {
    onRowClick?: (id: string) => void;
} & ( overview | shipdetails);

type overview = {
    data: shipments[];
    columns: { key: keyof shipments; label: string }[];
}

type shipdetails = {
    data: Record<string,string>[]
    columns: { key: string; label: string }[];
}


const DataTable = ({ data = [], columns, onRowClick }: Props) => {
    const handleRowClick = (id: string) => {
        if (onRowClick) {
            onRowClick(id);
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead key={column.key}>{column.label}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row, rowIndex) => (
                    <TableRow
                        key={row.id || `row-${rowIndex}`}
                        data-id={row.id || `row-${rowIndex}`}
                        onClick={() =>
                            row.id &&
                            handleRowClick(typeof row.id === 'number' ? row.id.toString() : row.id)
                        }
                        className={onRowClick ? "cursor-pointer" : ""}
                    >
                        {columns.map((column, colIndex) => (
                            <TableCell key={`${row.id || rowIndex}-${column.key || colIndex}`}>
                                {"id" in row
                                    ? formatValue((row as shipments)[column.key as keyof shipments])
                                    : formatValue(row[column.key])}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default DataTable;