import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "@/lib/prisma";
import { carrierMappings } from "@/app/types/carrierMappings";


//UPLOAD PAGE ROUTING
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


        // Resavanje ZA \r\n//
        const normalizeKeys = (data: any[]): any[] => data.map((row) => {
            const normalizedRow: any = {};
            Object.keys(row).forEach((key) => {
                const normalizedKey = key.replace(/\r\n/g, " ").trim(); // Zamena \r\n sa space
                normalizedRow[normalizedKey] = row[key];
            });
            return normalizedRow;
        });
        const normalizedData = normalizeKeys(rawData);

        // Fix za sve datume //

        const parseDateString = (value: any): string | null => {
            // Ako je vrednost prazna ili fush
            if (!value) {
                return null;
            }

            // Ako je vrednost string i ima self-delivery
            if (typeof value === "string") {
                const invalidFormats = ["self-delivery"];
                if (invalidFormats.includes(value.trim().toLowerCase())) {
                    return new Date(Date.UTC(1900, 0, 1, 0, 0, 0)).toISOString(); // 1900-01-01T00:00:00.000Z
                }
                const parsedDate = Date.parse(value);
                if (!isNaN(parsedDate)) {
                    const date = new Date(parsedDate);
                    // Ako u string datumu nema vremena, dodajemo 00:00:00
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
                return date.toISOString(); // ISO-8601 format je format koji MySQL zahteva za datume
            }

            return null;
        };
        // Fix za sve datume //

        // Za Stingovanje numbera

        const safeToString = (value: any): string => {
            if (value === undefined || value === null) {
                return "Not Defined"; // Ako je vrednost undefined ili null, vratice "-"
            }

            if (typeof value === "object" && value.toString) {
                return value.toString(); // Ako je objekat sa toString metodom
            }

            return JSON.stringify(value); // Sigurno konvertovanje bilo koje vrednosti u string
        };
        console.log("Data"+ JSON.stringify(normalizedData));
        // Formatiranje podataka prema Prisma modelu
        const formattedData = normalizedData.map((row) => {
            // Određivanje vrednosti za carrier
            const carrierValue = carrierType === "logwin"
                ? safeToString(row[mapping.carrier])
                : safeToString(mapping.carrier);

            return {
                filename: file.name,
                carrier_type: mapping.typesofcarriers,
                status: safeToString(row[mapping.status]),
                po_number: row[mapping.po_number],
                eta: parseDateString(row[mapping.eta]),
                ata: parseDateString(row[mapping.ata]),
                etd: parseDateString(row[mapping.etd]),
                atd: parseDateString(row[mapping.atd]),
                packages: row[mapping.packages],
                weight: safeToString(row[mapping.weight]),
                volume: safeToString(row[mapping.volume]),
                shipper: safeToString(row[mapping.shipper]),
                shipper_country: safeToString(row[mapping.shipper_country]),
                receiver: safeToString(row[mapping.receiver]),
                receiver_country: safeToString(row[mapping.receiver_country]),
                house_awb: safeToString(row[mapping.houseawb]),
                shipper_ref_no: safeToString(row[mapping.shipper_ref_no]),
                carrier: carrierValue, // Postavljena vrednost uslovno
                inco_term: safeToString(row[mapping.inco_term]),
                vessel_flight: safeToString(row[mapping.vessel_flight]),
                pickup_date: parseDateString(row[mapping.pickup_date]),
                latest_cp: safeToString(row[mapping.latest_cp]),
            };
        });

        console.log("Formatted Data:", JSON.stringify(formattedData, null, 2));
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
