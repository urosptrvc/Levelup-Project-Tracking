"use client"

import { ColumnDef } from "@tanstack/react-table"
import {shipments} from "@prisma/client";
import {formatColumnId, formatDate} from "@/app/utils/formatters";

export const columns: ColumnDef<shipments>[] = [
    {
        accessorKey: "carrier_type",
        header: "Carrier Type",
    },
    {
        accessorKey: "carrier",
        header: "Carrier",
        cell: ({ row }) => {
            const item = String(row.getValue("carrier"));
            const formatted = formatColumnId(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "filename",
        header: "Name of file",
        cell: ({ row }) => {
            const item = String(row.getValue("filename"));
            const formatted = formatColumnId(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "shipper",
        header: "Shipper",
        cell: ({ row }) => {
            const item = String(row.getValue("shipper"));
            const formatted = formatColumnId(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "shipper_country",
        header: "Shipper Country",
        cell: ({ row }) => {
            const item = String(row.getValue("shipper_country"));
            const formatted = formatColumnId(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "receiver",
        header: "Receiver",
        cell: ({ row }) => {
            const item = String(row.getValue("receiver"));
            const formatted = formatColumnId(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "receiver_country",
        header: "Receiver Country",
        cell: ({ row }) => {
            const item = String(row.getValue("receiver_country"));
            const formatted = formatColumnId(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "packages",
        header: "Packages",
        cell: ({ row }) => {
            const item = String(row.getValue("packages"));
            const formatted = formatColumnId(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "weight",
        header: "Weight",
        cell: ({ row }) => {
            const item = String(row.getValue("weight"));
            const formatted = formatColumnId(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "volume",
        header: "Volume",
        cell: ({ row }) => {
            const item = String(row.getValue("volume"));
            const formatted = formatColumnId(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "house_awb",
        header: "House AWB",
        cell: ({ row }) => {
            const item = String(row.getValue("house_awb"));
            const formatted = formatColumnId(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "shipper_ref_no",
        header: "Shipper Ref No",
        cell: ({ row }) => {
            const item = String(row.getValue("shipper_ref_no"));
            const formatted = formatColumnId(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "inco_term",
        header: "Inco Term",
        cell: ({ row }) => {
            const item = String(row.getValue("inco_term"));
            const formatted = formatColumnId(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "vessel_flight",
        header: "Vessel Flight",
        cell: ({ row }) => {
            const item = String(row.getValue("vessel_flight"));
            const formatted = formatColumnId(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "pickup_date",
        header: "Pickup Date",
        cell: ({ row }) => {
            const item = row.getValue("pickup_date");
            const formatted = formatDate(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "latest_cp",
        header: "Latest Checkpoint",
        cell: ({ row }) => {
            const item = row.getValue("latest_cp");
            const formatted = formatDate(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "etd",
        header: "Estimated Time of Delivery",
        cell: ({ row }) => {
            const item = row.getValue("etd");
            const formatted = formatDate(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "eta",
        header: "Estimated Time of Arrival",
        cell: ({ row }) => {
            const item = row.getValue("eta");
            const formatted = formatDate(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "atd",
        header: "Actual Time of Delivery",
        cell: ({ row }) => {
            const item = row.getValue("atd");
            const formatted = formatDate(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "ata",
        header: "Actual Time of Arrival",
        cell: ({ row }) => {
            const item = row.getValue("ata");
            const formatted = formatDate(item);
            return <div className="font-medium">{formatted}</div>;
        },
    },
]
