"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { shipments } from "@prisma/client";
import { useNotifier } from "@/components/ui/use-notifications";
import { useRouter } from "next/navigation";

import PaginationComponent from "@/components/PaginationComponent";
import DataTable from "@/components/DataTable";

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
    const { notifyError } = useNotifier();
    const rowsPerPage = 15;
    const router = useRouter();

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const res = await fetch("/api/shipments");
                const data = await res.json();
                if (!res.ok) {
                    notifyError("Error", data.error || "Failed to fetch shipments.");
                } else {
                    setShipmentsData(data.shipments || []);
                }
            } catch (error) {
                notifyError("Error", "An unexpected error occurred.");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchShipments();
    }, []);

    const searchedShipments = shipmentsData.filter((shipment) =>
        columns.some((column) =>
            shipment[column.key]?.toString().toLowerCase().includes(search.toLowerCase())
        )
    );

    const totalPages = Math.ceil(searchedShipments.length / rowsPerPage);
    const paginatedShipments = searchedShipments.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleRowClick = (id: number) => {
        router.push(`/shipments/${id}`);
    };

    return (
        <div className="container mx-auto py-10">
            <div className="mb-4 flex flex-wrap items-center gap-4">
                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-1/3 md:w-1/2"
                />
                <p className="text-slate-400">For Date search, use format YYYY-MM-DD</p>
            </div>

            {isLoading ? (
                <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className="h-8 w-full" />
                    ))}
                </div>
            ) : (
                <DataTable
                    data={paginatedShipments}
                    columns={columns}
                    onRowClick={handleRowClick}
                />
            )}
            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default ShipmentsPage;
