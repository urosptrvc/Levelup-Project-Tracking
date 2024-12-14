import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { data } = body;

        // Provera osnovnog formata podataka
        if (!Array.isArray(data)) {
            return NextResponse.json(
                { error: "Invalid data format: expected an array" },
                { status: 400 }
            );
        }

        // Kreiranje unosa u bazu
        const result = await prisma.shipments.createMany({
            data: data,
            skipDuplicates: true,
        });

        return NextResponse.json({
            message: "Data inserted successfully",
            count: result.count,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Internal server error", details: error.message },
            { status: 500 }
        );
    }
}
