"use client"

import React, { useState } from "react"
import * as XLSX from "xlsx"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { carrierMappings} from "@/app/lib/carrierMappings";
import { useNotifier } from "@/components/ui/use-notifications"
import {CloudUpload} from "lucide-react";

export default function UploadShipmentsPage() {
    const [file, setFile] = useState<File | null>(null)
    const { notifyError, notifySuccess } = useNotifier()
    const router = useRouter()
    const [dragActive, setDragActive] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragActive(true)
    }

    const handleDragLeave = () => {
        setDragActive(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragActive(false)
        if (e.dataTransfer.files?.[0]) {
            setFile(e.dataTransfer.files[0])
        }
    }

    const processFile = async () => {
        if (!file) {
            notifyError("Error", "Please select a file!")
            return
        }

        setIsLoading(true)
        try {
            // Čitanje Excel fajla iz File objekta
            const arrayBuffer = await file.arrayBuffer()
            const workbook = XLSX.read(arrayBuffer, { type: "array" })

            // Detektovanje carrier-a iz imena fajla
            // npr: "hellmann123.xlsx" -> "hellmann"
            const carrierType = file.name.split(".")[0].replace(/[0-9]/g, "").toLowerCase()

            if (!carrierMappings[carrierType]) {
                notifyError("Error",`Carrier type: ${carrierType} is not mapped!`)
                return
            }

            // Odabir sheet-a (Hellmann ima 2 sheeta, primer)
            const sheetName =
                carrierType === "hellmann" && workbook.SheetNames.length > 1
                    ? workbook.SheetNames[1]
                    : workbook.SheetNames[0]

            const worksheet = workbook.Sheets[sheetName]
            if (!workbook.SheetNames.length) {
                notifyError("Sheet Error", "Invalid or missing sheet in the Excel file!")
                return
            }
            // Specifična pravila za Hellmann i DHL
            if (carrierType === "hellmann") {
                const range = XLSX.utils.decode_range(worksheet["!ref"] || "");
                range.s.r = 2; // Treći red
                range.s.c = 1; // Druga kolona
                worksheet["!ref"] = XLSX.utils.encode_range(range);
            } else if (carrierType === "dhl") {
                const range = XLSX.utils.decode_range(worksheet["!ref"] || "");
                range.s.r = 11; // 12. red (indeksirano od 0)
                range.s.c = 0;  // Prva kolona
                range.e.c = 20; // 21. kolona (indeksirano od 0)
                worksheet["!ref"] = XLSX.utils.encode_range(range);
            }

            const rawData: any[] = XLSX.utils.sheet_to_json(worksheet);
            const mapping = carrierMappings[carrierType]

            // FIX ZA \r\n //
            function normalizeKeys(data: any[]): any[] {
                return data.map((row) => {
                    const normalizedRow: any = {};
                    Object.keys(row).forEach((key) => {
                        const normalizedKey = key.replace(/\r\n/g, " ").trim(); // Zamena \r\n sa space
                        normalizedRow[normalizedKey] = row[key];
                    });
                    return normalizedRow;
                });
            }
            const normalizedData = normalizeKeys(rawData);

            // FIX ZA DATUME //

            function parseDateString(value: any): string | null {
                // Ako je vrednost prazna ili falsy
                if (!value) {
                    return null;
                }

                // Ako je vrednost string i ima specifične invalidne formate
                if (typeof value === "string") {
                    const invalidFormats = ["self-delivery"];
                    if (invalidFormats.includes(value.trim().toLowerCase())) {
                        // Ako je "Self-Delivery", vrati fiksni datum iz 1900
                        return new Date(Date.UTC(1900, 0, 1, 0, 0, 0)).toISOString(); // 1900-01-01T00:00:00.000Z
                    }
                    const parsedDate = Date.parse(value);
                    if (!isNaN(parsedDate)) {
                        const date = new Date(parsedDate);
                        // Ako u string datumu nema vremena, dodaj 00:00:00
                        date.setUTCHours(0, 0, 0, 0);
                        return date.toISOString();
                    }
                    return null; // Ako string nije validan datum
                }

                // Ako je vrednost broj (Excel datum format)
                if (typeof value === "number") {
                    const excelEpoch = new Date(1899, 11, 30).getTime(); // Excel epoha
                    const dateTimeInMs = excelEpoch + value * 24 * 60 * 60 * 1000;
                    const date = new Date(dateTimeInMs);
                    // Postavi vreme na 00:00:00 ako ne postoji
                    date.setUTCHours(0, 0, 0, 0);
                    return date.toISOString(); // ISO-8601 format
                }

                // Ako nije ni string ni broj, vrati null
                return null;
            }


            // FIX ZA DATUME //


            // Formatiramo podatke prema shipments modelu
            const formattedData = normalizedData.map((row) => ({
                carrier_type: mapping.carriertypes,
                status: String(row[mapping.status]) || "-",
                po_number: String(mapping.po_number),
                eta: parseDateString(row[mapping.eta]),
                ata: parseDateString(row[mapping.ata]),
                etd: parseDateString(row[mapping.etd]),
                atd: parseDateString(row[mapping.atd]),
                packages: row[mapping.packages] || "-",
                weight: String(row[mapping.weight]) || "-",
                volume: String(row[mapping.volume]) || "-",
                shipper: String(row[mapping.shipper]) || "-",
                shipper_country: String(row[mapping.shipper_country]) || "-",
                receiver: String(row[mapping.receiver]) || "-",
                receiver_country: String(row[mapping.receiver_country]) || "-",
                house_awb: String(row[mapping.house_awb]) || "-",
                shipper_ref_no: String(row[mapping.shipper_ref_no]) || "-",
                carrier: String(row[mapping.carrier]) || "-",
                inco_term: String(row[mapping.inco_term]) || "-",
                vessel_flight: String(row[mapping.vessel_flight]) || "-",
                pickup_date: parseDateString(row[mapping.pickup_date]),
                latest_cp: String(row[mapping.latest_cp]) || "-",
            }))

            console.log("Invalid Entries Count:", JSON.stringify({ data: formattedData }));
            // Sada JSON sa `formattedData` šaljemo server route-u
            const res = await fetch("/api/shipments/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: formattedData }),
            })
            if (!res.ok) {
                const { error } = await res.json()
                notifyError("Error", `Failed to upload: ${error}`)
            } else {
                notifySuccess("Success",`Uploaded ${formattedData.length} shipments successfully!`)
                router.push("/shipments")
            }
        } catch (error: any) {
            notifyError("File read failed", error.message)
        } finally {
            setIsLoading(false) // Stop loading
        }
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4 text-center">Upload XLSX Shipments</h1>

            {/* Drag-and-Drop Zone */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg ${
                    dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-100"
                } p-10 text-center cursor-pointer transition-colors duration-300`}
            >
                <CloudUpload className="w-16 h-16 text-gray-500 mb-4" />
                <p className="text-lg font-semibold">
                    <span className="text-blue-500">Choose a file</span> or drag it here.
                </p>
                <input
                    type="file"
                    accept=".xlsx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileInput"
                />
                <label
                    htmlFor="fileInput"
                    className="block mt-4 text-sm text-blue-600 underline cursor-pointer"
                >
                    Browse Files
                </label>
            </div>

            {/* Selected File Info */}
            {file && (
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-700">
                        Selected file: <span className="font-semibold">{file.name}</span>
                    </p>
                </div>
            )}

            {/* Loading State or Upload Button */}
            <div className="flex justify-center mt-6">
                {isLoading ? (
                    <div className="flex items-center space-x-2 text-blue-600">
                        <svg
                            className="w-6 h-6 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                        <span>Uploading...</span>
                    </div>
                ) : (
                    <Button onClick={processFile} disabled={!file}>
                        Upload & Process
                    </Button>
                )}
            </div>
        </div>
    )
}

