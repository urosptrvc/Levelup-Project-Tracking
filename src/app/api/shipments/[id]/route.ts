import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(request: Request, { params }: { params: { id: string } }){
    const { id } = await params;

    try {

        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json(
                { error: "Forbidden - Only admins can delete" },
                { status: 403 }
            );
        }

        const shipmentId = parseInt(id, 10);

        if (isNaN(shipmentId)) {
            return NextResponse.json(
                { message: "Invalid shipment ID" },
                { status: 400 }
            );
        }

        await prisma.shipments.delete({
            where: {
                id: shipmentId,
            },
        });

        return NextResponse.json(
            { message: "Shipment deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting shipment:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
