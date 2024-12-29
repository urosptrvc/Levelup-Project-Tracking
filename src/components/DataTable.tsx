"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatValue } from "@/app/utils/formatters";

type Props = {
    data?: Record<string, any>[]; 
    columns: { key: string; label: string }[];
    onRowClick?: (id: number) => void;
};

const DataTable = ({ data = [], columns, onRowClick }: Props) => {
    const handleRowClick = (id: number) => {
        if (onRowClick) {
            onRowClick(id);
        }
    };

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
                        key={row.id || rowIndex}
                        data-id={row.id}
                        onClick={() => row.id && handleRowClick(row.id)}
                        className={onRowClick ? "cursor-pointer" : ""}
                    >
                        {columns.map((column) => (
                            <TableCell key={column.key}>
                                {formatValue(row[column.key]) || "N/A"}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default DataTable;
