"use server";

import { prisma } from "@/lib/prisma";

export const getData = async (query: string) => {
    const isDate = !isNaN(Date.parse(query));

    return prisma.shipments.findMany({
        where: {
            OR: [
                { carrier_type: { contains: query } },
                { status: { contains: query } },
                { shipper: { contains: query } },
                { receiver: { contains: query } },
                { receiver_country: { contains: query } },
                ...(isDate ? [{
                    ata: {
                        gte: new Date(`${query} 00:00:00`),
                        lte: new Date(`${query} 23:59:59.999`)
                    }
                }] : [])
            ]
        }
    });
};