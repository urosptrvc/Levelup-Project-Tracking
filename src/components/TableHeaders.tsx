import {TableHead, TableHeader, TableRow} from "@/components/ui/table";
import React from "react";

type Column = {
    key: string;
    label: string;
};

type Props = {
    columns: Column[];
};
const TableHeaders = ({ columns }: Props) => {
    return (
        <TableHeader>
            <TableRow>
                {columns.map((col) => (
                    <TableHead key={col.key}>{col.label}</TableHead>
                ))}
            </TableRow>
        </TableHeader>
    );
};
export default TableHeaders;

