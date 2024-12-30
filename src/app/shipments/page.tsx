"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import PaginationComponent from "@/components/PaginationComponent";
import DataTable from "@/components/DataTable";
import { shipments } from "@prisma/client";

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
    const [search, setSearch] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const rowsPerPage = 15;
    const router = useRouter();
  
    const { data, isLoading } = useQuery<any>({
      queryKey: ["shipments"],
      queryFn: () => fetch("/api/shipments").then((res) => res.json()),
    });
  
    const shipmentsData = data?.shipments || [];
  
    const searchedShipments = shipmentsData.filter((shipment: shipments) =>
        columns.some((column) =>
          shipment.hasOwnProperty(column.key) &&
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