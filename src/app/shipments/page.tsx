"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface Shipment {
    id: string
    carrier_type: string
    status: string
    shipper: string
    receiver: string
    packages: number
    weight: number
}

const columns = [
    { key: "carrier_type", label: "Carrier" },
    { key: "status", label: "Status" },
    { key: "shipper", label: "Shipper" },
    { key: "receiver", label: "Receiver" },
    { key: "packages", label: "Packages" },
    { key: "weight", label: "Weight" },
]

export default function ShipmentsPage() {
    const [shipments, setShipments] = useState<Shipment[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [search, setSearch] = useState<string>("")
    const [sortKey, setSortKey] = useState<string>("carrier_type")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
    const [visibleColumns, setVisibleColumns] = useState(
        columns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
    )
    const [currentPage, setCurrentPage] = useState<number>(1)
    const rowsPerPage = 20

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const res = await fetch("/api/shipments")
                if (!res.ok) throw new Error("Failed to fetch shipments")
                const data = await res.json()
                setShipments(data.shipments)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchShipments()
    }, [])

    // Search logic
    const filteredShipments = shipments.filter((shipment) =>
        Object.values(shipment).some(
            (value) =>
                value?.toString().toLowerCase().includes(search.toLowerCase())
        )
    )

    // Sort logic
    const sortedShipments = [...filteredShipments].sort((a, b) => {
        const valA = a[sortKey as keyof Shipment]
        const valB = b[sortKey as keyof Shipment]
        return sortOrder === "asc"
            ? valA > valB
                ? 1
                : -1
            : valA < valB
                ? 1
                : -1
    })

    // Pagination logic
    const paginatedShipments = sortedShipments.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    )

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
                {/* Search Input */}
                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Sort Button */}
                <Button
                    variant="outline"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                    Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
                </Button>

                {/* Column Visibility Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Filter</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        {columns.map((col) => (
                            <DropdownMenuCheckboxItem
                                key={col.key}
                                checked={visibleColumns[col.key]}
                                onCheckedChange={(checked) =>
                                    setVisibleColumns((prev) => ({
                                        ...prev,
                                        [col.key]: checked,
                                    }))
                                }
                            >
                                {col.label}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Table */}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map(
                                (col) =>
                                    visibleColumns[col.key] && (
                                        <TableHead
                                            key={col.key}
                                            onClick={() => setSortKey(col.key)}
                                            className="cursor-pointer"
                                        >
                                            {col.label}
                                        </TableHead>
                                    )
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedShipments.map((shipment) => (
                            <TableRow
                                key={shipment.id}
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => window.location.href = `/shipments/${shipment.id}`}
                            >
                                {columns.map(
                                    (col) =>
                                        visibleColumns[col.key] && (
                                            <TableCell key={col.key}>
                                                {shipment[col.key as keyof Shipment] || "-"}
                                            </TableCell>
                                        )
                                )}
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            )}

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-4">
                <Button
                    variant="outline"
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <span>
                    Page {currentPage} /{" "}
                    {Math.ceil(sortedShipments.length / rowsPerPage)}
                </span>
                <Button
                    variant="outline"
                    onClick={() =>
                        setCurrentPage((prev) =>
                            Math.min(
                                prev + 1,
                                Math.ceil(sortedShipments.length / rowsPerPage)
                            )
                        )
                    }
                    disabled={
                        currentPage ===
                        Math.ceil(sortedShipments.length / rowsPerPage)
                    }
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
