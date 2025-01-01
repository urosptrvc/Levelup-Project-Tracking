"use client"

import { ColumnDef } from "@tanstack/react-table";
import { shipments } from "@prisma/client";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import {formatDate, formatCell} from "@/app/utils/formatters";
import ActionsMenu from "@/components/DropDownMenu"


export const columns: ColumnDef<shipments>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "carrier_type",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Carrier Type" />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const item = String(row.getValue("status"));
            const formatted = formatCell(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "shipper",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Shipper" />
        ),
        cell: ({ row }) => {
            const item = String(row.getValue("shipper"));
            const formatted = formatCell(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "receiver",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Receiver" />
        ),
        cell: ({ row }) => {
            const item = String(row.getValue("receiver"));
            const formatted = formatCell(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "receiver_country",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Receiver Country" />
        ),
        cell: ({ row }) => {
            const item = String(row.getValue("receiver_country"));
            const formatted = formatCell(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "ata",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actual Time of Arrival" />
        ),
        cell: ({ row }) => {
            const item = String(row.getValue("ata"));
            const formatted = formatDate(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const ship = row.original;
            return <ActionsMenu shipId={ship.id} />;
        },
    },
];

