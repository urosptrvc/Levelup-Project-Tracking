import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
    try {
        // Parsiranje podataka iz zahteva
        const body = await request.json()
        const { data } = body

        console.log("Received data:", data)

        // Provera da li su podaci validni
        if (!data || !Array.isArray(data)) {
            console.error("Invalid data format:", data)
            return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
        }

        // Validacija svakog reda pre unosa u bazu
        const validData = data.filter((item) => {
            return (
                typeof item.status === "string" &&
                (!item.po_number || typeof item.po_number === "string") &&
                (!item.packages || typeof item.packages === "number") &&
                (!item.weight || typeof item.weight === "number")
            )
        })

        console.log("Valid data to insert:", validData)

        if (validData.length === 0) {
            return NextResponse.json(
                { error: "No valid data to insert" },
                { status: 400 }
            )
        }

        // Kreiranje unosa u bazu
        const result = await prisma.shipments.createMany({
            data: validData,
            skipDuplicates: true, // Preskače duplikate
        })

        console.log("Inserted count:", result.count)

        return NextResponse.json({
            message: "Data inserted successfully",
            count: result.count,
        })
    } catch (error: any) {
        console.error("Error in POST /shipments/upload:", error.message)
        return NextResponse.json(
            { error: "Internal server error", details: error.message },
            { status: 500 }
        )
    }
}
