"use client"

import React, { useState } from "react"
import * as XLSX from "xlsx"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { carrierMappings} from "@/app/lib/carrierMappings";
import { useNotifier } from "@/components/ui/use-notifications"

export default function UploadShipmentsPage() {
    const [file, setFile] = useState<File | null>(null)
    const { notifyError, notifySuccess } = useNotifier()
    const router = useRouter()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setFile(e.target.files[0])
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (e.dataTransfer.files.length) setFile(e.dataTransfer.files[0])
    }

    const processFile = async () => {
        if (!file) {
            notifyError("Error", "Please select a file!")
            return
        }

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

            const rawData: any[] = XLSX.utils.sheet_to_json(worksheet)
            const mapping = carrierMappings[carrierType]

            // Formatiramo podatke prema shipments modelu
            const formattedData = rawData.map((row) => ({
                status: row[mapping.status] || "-",
                po_number: mapping.po_number ? row[mapping.po_number] || "-" : null,
                eta: row[mapping.eta] ? new Date(row[mapping.eta]).toISOString() : null,
                ata: row[mapping.ata] ? new Date(row[mapping.ata]).toISOString() : null,
                etd: row[mapping.etd] ? new Date(row[mapping.etd]).toISOString() : null,
                atd: row[mapping.atd] ? new Date(row[mapping.atd]).toISOString() : null,
                packages: row[mapping.packages] || 0,
                weight: row[mapping.weight] || 0,
                volume: row[mapping.volume] || 0,
                shipper: row[mapping.shipper] || "-",
                shipper_country: row[mapping.shipper_country] || "-",
                receiver: row[mapping.receiver] || "-",
                receiver_country: row[mapping.receiver_country] || "-",
                house_awb: row[mapping.house_awb] || "-",
                shipper_ref_no: row[mapping.shipper_ref_no] || "-",
                carrier: row[mapping.carrier] || carrierType, // default fallback
                inco_term: row[mapping.inco_term] || "-",
                vessel_flight: row[mapping.vessel_flight] || "-",
                pickup_date: row[mapping.pickup_date] ? new Date(row[mapping.pickup_date]).toISOString() : null,
                latest_cp: row[mapping.latest_cp] || "-",
            }))
            console.log("formattedData:", formattedData)
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
        }
    }

    return (
        <div
            className="container mx-auto py-10"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <h1 className="text-2xl font-bold mb-4">Upload XLSX Shipments</h1>

            <div className="mb-4">
                <input type="file" accept=".xlsx" onChange={handleFileChange} />
            </div>

            <Button onClick={processFile} disabled={!file}>
                Upload & Process
            </Button>
        </div>
    )
}
