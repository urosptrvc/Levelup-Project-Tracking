import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "@/lib/prisma";
import { carrierMappings } from "@/app/lib/carrierMappings";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        // Čitanje Excel fajla u buffer
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: "array" });

        // Detektovanje carrier-a iz imena fajla
        const carrierType = file.name.split(".")[0].replace(/[0-9]/g, "").toLowerCase();

        // Provera da li postoji mapping za carrier
        if (!carrierMappings[carrierType]) {
            return NextResponse.json(
                { error: `Carrier type: ${carrierType} is not mapped!` },
                { status: 400 }
            );
        }

        // Odabir sheet-a
        const sheetName =
            carrierType === "hellmann" && workbook.SheetNames.length > 1
                ? workbook.SheetNames[1]
                : workbook.SheetNames[0];

        const worksheet = workbook.Sheets[sheetName];

        // Normalizacija ključeva (fix za \r\n)
        function normalizeKeys(data: any[]): any[] {
            return data.map((row) => {
                const normalizedRow: any = {};
                Object.keys(row).forEach((key) => {
                    const normalizedKey = key.replace(/\r\n/g, " ").trim();
                    normalizedRow[normalizedKey] = row[key];
                });
                return normalizedRow;
            });
        }

        // Parsiranje datuma
        function parseDateString(value: any): string | null {
            if (!value) return null;

            if (typeof value === "string") {
                if (value.toLowerCase().includes("self-delivery")) {
                    return new Date(Date.UTC(1900, 0, 1)).toISOString();
                }
                const parsed = Date.parse(value);
                return isNaN(parsed) ? null : new Date(parsed).toISOString();
            }

            if (typeof value === "number") {
                const excelEpoch = new Date(1899, 11, 30).getTime();
                const date = new Date(excelEpoch + value * 86400000);
                return date.toISOString();
            }

            return null;
        }

        // Konvertovanje vrednosti u string
        function safeToString(value: any): string {
            return value === undefined || value === null
                ? "Not Defined"
                : value.toString();
        }

        // Preuzimanje podataka iz sheet-a i normalizacija
        const rawData = XLSX.utils.sheet_to_json(worksheet);
        const normalizedData = normalizeKeys(rawData);
        const mapping = carrierMappings[carrierType];

        // Formatiranje podataka prema Prisma modelu
        const formattedData = normalizedData.map((row) => ({
            carrier_type: carrierType,
            status: safeToString(row[mapping.status]),
            po_number: safeToString(row[mapping.po_number]),
            eta: parseDateString(row[mapping.eta]),
            ata: parseDateString(row[mapping.ata]),
            etd: parseDateString(row[mapping.etd]),
            atd: parseDateString(row[mapping.atd]),
            packages: Number(row[mapping.packages]) || null,
            weight: safeToString(row[mapping.weight]),
            volume: safeToString(row[mapping.volume]),
            shipper: safeToString(row[mapping.shipper]),
            shipper_country: safeToString(row[mapping.shipper_country]),
            receiver: safeToString(row[mapping.receiver]),
            receiver_country: safeToString(row[mapping.receiver_country]),
            house_awb: safeToString(row[mapping.houseawb]),
            shipper_ref_no: safeToString(row[mapping.shipper_ref_no]),
            carrier: safeToString(row[mapping.carrier]),
            inco_term: safeToString(row[mapping.inco_term]),
            vessel_flight: safeToString(row[mapping.vessel_flight]),
            pickup_date: parseDateString(row[mapping.pickup_date]),
            latest_cp: safeToString(row[mapping.latest_cp]),
        }));

        // Ubacivanje podataka u bazu
        const result = await prisma.shipments.createMany({
            data: formattedData,
            skipDuplicates: true,
        });

        return NextResponse.json({
            message: "Data inserted successfully",
            count: result.count,
        });
    } catch (error: any) {
        console.error("Error processing file:", error);
        return NextResponse.json(
            { error: "Internal server error", details: error.message },
            { status: 500 }
        );
    }
}
