import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const shipments = await prisma.shipments.findMany()
        return NextResponse.json({ shipments }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch shipments" }, { status: 500 })
    }
}
