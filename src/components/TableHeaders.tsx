import {TableHead, TableHeader, TableRow} from "@/components/ui/table";
import React from "react";

type Column = {
    key: string;
    label: string;
};

interface TableHeadersProps {
    columns: Column[];
}

export const TableHeaders: React.FC<TableHeadersProps> = ({ columns }) => (
    <TableHeader>
        <TableRow>
            {columns.map((col) => (
                <TableHead key={col.key}>{col.label}</TableHead>
            ))}
        </TableRow>
    </TableHeader>
);
