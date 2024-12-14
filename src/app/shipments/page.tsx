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
import { useNotifier } from "@/components/ui/use-notifications"


// Ovaj columns nam sluzi kako bismo kasnije odredili koje ce se to glavne kolone prikazivati, a i mapiranje je bolje
// Takodje nam omogucava da lako mapiramo druge podatke kao MAIN podatke ako nam se trenutni zapis ne svidja
const columns = [
    { key: "carrier_type", label: "Carrier" },
    { key: "status", label: "Status" },
    { key: "shipper", label: "Shipper" },
    { key: "receiver", label: "Receiver" },
    { key: "receiver_country", label: "Receiver Country" },
    { key: "packages", label: "Packages" },
];

export default function ShipmentsPage() {
    const [shipments, setShipments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>(""); // Pretraga
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { notifyError } = useNotifier() // Hook za prikazivanje notifikacija o greškama
    const rowsPerPage = 15; // Broj redova po stranici za pagination

    // Preuzimanje shipments sa servera na inicijalni rendering
    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const res = await fetch("/api/shipments");
                if (!res.ok) notifyError("Failed to fetch shipments");
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

    // Search po svim poljima
    const searchedShipments = shipments.filter((shipment) =>
        Object.values(shipment).some((value) =>
            value?.toString().toLowerCase().includes(search.toLowerCase())
        )
    );

    // Podela za paginaciju
    const totalPages = Math.ceil(searchedShipments.length / rowsPerPage);
    const paginatedShipments = searchedShipments.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Brisanje svih navodnika iz Stringa jer smo parsirali podatke u bazu koji nisu stringovi
    function removeQuotes(value: any): string {
        if (typeof value === "string") {
            return value.replace(/"/g, "");
        }
        return value;
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
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1); // Resetuje paginaciju kad se pretražuje
                    }}
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
                                        {/* Link za detaljnije informacije o shipmentu*/}
                                        <Link href={`/shipments/${shipment.id}`}>
                                            {/* Brisanje navodnika i mapiranje date*/}
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
