"use client";

import React, { useEffect, useState } from "react";
import { Table } from "@/components/ui/table";
import TableRows from "@/components/TableRows";
import TableHeaders from "@/components/TableHeaders";
import PaginationComponent from "@/components/PaginationComponent";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useNotifier } from "@/components/ui/use-notifications";
import { shipments } from "@prisma/client";

// Tip za kolone
type Column = {
    key: keyof shipments;
    label: string;
};

const columns: Column[] = [
    { key: "carrier_type", label: "Carrier Type" },
    { key: "status", label: "Status" },
    { key: "shipper", label: "Shipper" },
    { key: "receiver", label: "Receiver" },
    { key: "receiver_country", label: "Receiver Country" },
    { key: "ata", label: "Actual Time of Arrival" },
];

const ShipmentsPage = () => {
    const [shipmentsData, setShipmentsData] = useState<shipments[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const rowsPerPage = 15;

    const { notifyError } = useNotifier();

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const res = await fetch("/api/shipments");
                if (!res.ok) {
                    notifyError("Failed to fetch shipments");
                    return;
                }
                const data = await res.json();
                setShipmentsData(data.shipments);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchShipments();
    }, []);

    function formatDate(date: Date | string | null): string {
        if (!date) return "Not Defined";

        let dateStr: string;
        const parsedDate = new Date(date);

        if (isNaN(parsedDate.getTime())) {
            // Nije prepoznato kao datum => vratimo original, ali bez navodnika:
            dateStr = date.toString().replace(/"/g, "");
        } else {
            // Jeste validan datum => formatiramo
            const day = String(parsedDate.getUTCDate()).padStart(2, "0");
            const month = String(parsedDate.getUTCMonth() + 1).padStart(2, "0");
            const year = parsedDate.getUTCFullYear();

            // Ako je vreme 00:00:00 => samo datum
            if (
                parsedDate.getUTCHours() === 0 &&
                parsedDate.getUTCMinutes() === 0 &&
                parsedDate.getUTCSeconds() === 0
            ) {
                dateStr = `${day}.${month}.${year}`;
            } else {
                const hours = String(parsedDate.getUTCHours()).padStart(2, "0");
                const minutes = String(parsedDate.getUTCMinutes()).padStart(2, "0");
                dateStr = `${day}.${month}.${year} ${hours}:${minutes}`;
            }
        }

        // Za svaki slučaj, uklonite navodnike i iz formatiranog rezultata:
        return dateStr.replace(/"/g, "");
    }

    // Filtriranje po search input-u
    const searchedShipments = shipmentsData.filter((shipment) =>
        columns.some((column) =>
            shipment[column.key]
                ?.toString()
                .toLowerCase()
                .includes(search.toLowerCase())
        )
    );

    // Paginacija
    const totalPages = Math.ceil(searchedShipments.length / rowsPerPage);
    const paginatedShipments = searchedShipments.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div className="container mx-auto py-10">
            {/* Search input */}
            <div className="mb-4 gap-4 flex flex-wrap items-center">
                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-1/3 md:w-1/2"
                />
                <p className="text-slate-400">
                    For Date search must type in format YYYY-MM-DD
                </p>
            </div>

            {isLoading ? (
                <div className="space-y-4">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            ) : (
                <Table>
                    <TableHeaders columns={columns} />
                    <TableRows
                        columns={columns}
                        shipments={paginatedShipments}
                        formatDate={formatDate}
                    />
                </Table>
            )}

            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default ShipmentsPage;
