"use client"

import { ColumnDef } from "@tanstack/react-table";
import { shipments } from "@prisma/client";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {formatDate, formatColumnId} from "@/app/utils/formatters";

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
            const formatted = formatColumnId(item);
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
            const formatted = formatColumnId(item);
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
            const formatted = formatColumnId(item);
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
            const formatted = formatColumnId(item);
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

const ActionsMenu = ({ shipId }: { shipId: number }) => {
    const router = useRouter();
    const { data: session } = useSession();


    const isAdmin = session?.user?.role === "admin";
    const handleRowClick = (id: number) => {
        router.push(`/shipments/${id}`);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Properties</DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer" onClick={() => handleRowClick(shipId)}>
                    View shipment details
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {isAdmin && (
                    <>
                        <DropdownMenuItem className="cursor-pointer" >Update shipment</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 cursor-pointer hover:bg-red-100">
                            Delete shipment
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
