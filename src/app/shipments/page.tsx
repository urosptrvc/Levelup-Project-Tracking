"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const columns = [
    { key: "carrier_type", label: "Carrier" },
    { key: "status", label: "Status" },
    { key: "shipper", label: "Shipper" },
    { key: "receiver", label: "Receiver" },
    { key: "packages", label: "Packages" },
    { key: "weight", label: "Weight" },
];

export default function ShipmentsPage() {
    const [shipments, setShipments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const rowsPerPage = 15;

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const res = await fetch("/api/shipments");
                if (!res.ok) throw new Error("Failed to fetch shipments");
                const data = await res.json();
                setShipments(data.shipments);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchShipments();
    }, []);

    const filteredShipments = shipments.filter((shipment) =>
        Object.values(shipment).some((value) =>
            value?.toString().toLowerCase().includes(search.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredShipments.length / rowsPerPage);
    const paginatedShipments = filteredShipments.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    function removeQuotes(value: any): string {
        if (typeof value === "string") {
            return value.replace(/"/g, ""); // Uklanja sve znakove `"`
        }
        return value; // Ako nije string, vrati vrednost kako jeste
    }

return (
    <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Shipments</h1>
            <Link
                href="/shipments/upload"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Upload XLSX
            </Link>
        </div>

        <div className="flex justify-between items-center mb-4 gap-4">
            <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        {isLoading ? (
            <p>Loading...</p>
        ) : (
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((col) => (
                            <TableHead key={col.key}>{col.label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedShipments.map((shipment, index) => (
                        <TableRow key={shipment.id || index}>
                            {columns.map((col) => (
                                <TableCell key={col.key}>
                                    <Link href={`/shipments/${shipment.id}`}>
                                        {removeQuotes(shipment[col.key])}
                                    </Link>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )}

        {/* Pagination */}
        <Pagination className="mt-4 mr-3 cursor-pointer">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    />
                </PaginationItem>

                {/* Prva stranica */}
                {currentPage > 2 && (
                    <>
                        <PaginationItem>
                            <PaginationLink onClick={() => setCurrentPage(1)} isActive={1 === currentPage}>
                                1
                            </PaginationLink>
                        </PaginationItem>
                        {currentPage > 3 && <PaginationEllipsis />}
                    </>
                )}

                {/* Trenutna stranica i susedne */}
                {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
                    .filter((page) => page > 0 && page <= totalPages)
                    .map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                onClick={() => setCurrentPage(page)}
                                isActive={currentPage === page}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                {/* Poslednja stranica */}
                {currentPage < totalPages - 1 && (
                    <>
                        {currentPage < totalPages - 2 && <PaginationEllipsis />}
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => setCurrentPage(totalPages)}
                                isActive={currentPage === totalPages}
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={() =>
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    </div>
);
}
