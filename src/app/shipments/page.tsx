"use client"

import Link from "next/link";
import Input from "@/components/Input";
import {Table} from "@/components/ui/table";
import {PaginationComponent} from "@/components/PaginationComponent";
import {TableHeaders} from '@/components/TableHeaders';
import {TableRows} from '@/components/TableRows';
import {useEffect, useState} from "react";
import {useNotifier} from "@/components/ui/use-notifications";
import {Button} from "@/components/ui/button";
import {signOut} from "next-auth/react";

const columns = [
    { key: "carrier_type", label: "Carrier Type" },
    { key: "carrier", label: "Carrier" },
    { key: "status", label: "Status" },
    { key: "shipper", label: "Shipper" },
    { key: "receiver", label: "Receiver" },
    { key: "receiver_country", label: "Receiver Country" },
    { key: "ata", label: "Actual Time of Arrival" },
];

export default function ShipmentsPage() {
    const [shipments, setShipments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { notifyError } = useNotifier();
    const rowsPerPage = 15;

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

    const searchedShipments = shipments.filter((shipment) =>
        Object.values(shipment).some((value) =>
            value?.toString().toLowerCase().includes(search.toLowerCase())
        )
    );

    const totalPages = Math.ceil(searchedShipments.length / rowsPerPage);
    const paginatedShipments = searchedShipments.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );
    //Funcija za pokazivanje itema bez ""
    const removeQuotes = (value: any): string =>
        typeof value === "string" ? value.replace(/"/g, "") : value;

    //Funcija za regulisanje ispravnog displaya datuma
    const formatDate = (date: any): string => {
        if (!date) return "Not Defined";
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) return date;
        const day = String(parsedDate.getDate()).padStart(2, "0");
        const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
        const year = parsedDate.getFullYear();
        const hours = String(parsedDate.getHours()).padStart(2, "0");
        const minutes = String(parsedDate.getMinutes()).padStart(2, "0");
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

    const formatValue = (value: any) => removeQuotes(formatDate(value));

    const handleLogout = () => {
        signOut({
            callbackUrl: "/auth/login",
        });
    };
    return (
        <div className="container mx-auto py-10">
            {/* Header sekcija */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Shipments Overview</h1>
                <div className="flex items-center gap-2">
                    <Link
                        href="/shipments/upload"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Upload XLSX
                    </Link>
                    <Button variant="secondary" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>

            {/* Search input */}
            <div className="flex justify-between items-center mb-4 gap-4">
                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            {/* Tabela sa podacima */}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Table>
                    <TableHeaders columns={columns} />
                    <TableRows
                        columns={columns}
                        shipments={paginatedShipments}
                        formatValue={formatValue}
                    />
                </Table>
            )}

            {/* Paginacija */}
            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );

}
