"use client"

import { Input } from "@/components/ui/input"
import {Table} from "@/components/ui/table"
import {PaginationComponent} from "@/components/PaginationComponent"
import {TableHeaders} from '@/components/TableHeaders'
import {TableRows} from '@/components/TableRows'
import React, {useEffect, useState} from "react"
import {useNotifier} from "@/components/ui/use-notifications"
import { Skeleton } from "@/components/ui/skeleton"


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
    const { notifyError} = useNotifier();
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
        fetchShipments().catch(err => console.error(err));
    }, []);

    const searchedShipments = shipments.filter((shipment) =>
        columns.some((column) => {
            const value = shipment[column.key];
            return value?.toString().toLowerCase().includes(search.toLowerCase());
        })
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

        const day = String(parsedDate.getUTCDate()).padStart(2, "0");
        const month = String(parsedDate.getUTCMonth() + 1).padStart(2, "0");
        const year = parsedDate.getUTCFullYear();

        if (parsedDate.getUTCHours() === 0 && parsedDate.getUTCMinutes() === 0 && parsedDate.getUTCSeconds() === 0) {
            return `${day}.${month}.${year}`;
        }

        const hours = String(parsedDate.getUTCHours()).padStart(2, "0");
        const minutes = String(parsedDate.getUTCMinutes()).padStart(2, "0");
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };


    const formatValue = (value: any) => removeQuotes(formatDate(value));

    return (
        <div className="container mx-auto py-10">
            {/* Search input */}
            <div className="mb-4 gap-4 flex flex-wrap items-center">
                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-1/3 md:w-1/2"
                />
                <p className="text-slate-400">
                    For Date search must type in format YYYY-MM-DD
                </p>
            </div>

            {/* Tabela sa podacima */}
            {isLoading ? (
                <div className="space-y-4">
                    <Skeleton className="h-8 w-full"/>
                    <Skeleton className="h-8 w-full"/>
                    <Skeleton className="h-8 w-full"/>
                    <Skeleton className="h-8 w-full"/>
                    <Skeleton className="h-8 w-full"/>
                    <Skeleton className="h-8 w-full"/>
                </div>
            ) : (
                <Table>
                    <TableHeaders columns={columns}/>
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
