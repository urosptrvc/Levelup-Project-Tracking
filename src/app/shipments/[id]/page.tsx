import { prisma } from "@/lib/prisma";
import { ShipmentHeader } from "@/components/shipdetails/ShipmentHeader";
import { InfoCard } from "@/components/shipdetails/InfoCard";
import { ShipmentTimeline } from "@/components/shipdetails/ShipmentTimeline";
import {formatCell,formatDate} from "@/app/utils/formatters";
import Columns from "./columns";

type Props = {
    params: {
        id: string;
    };
};

const ShipmentDetailPage = async ({ params }: Props) => {
    const { id } = params;
    const shipment = await prisma.shipments.findUnique({
        where: { id: Number(id) },
    });

    if (!shipment) {
        return (
            <div className="container mx-auto py-10">
                <h1 className="text-2xl font-bold ">Shipment Not Found</h1>
            </div>
        );
    }
    const {
        shipmentInfo,
        shippingDetails,
        shipperInfo,
        receiverInfo,
        timelineItems,
    } = Columns(shipment);

    return (
        <div className="h-screen flex flex-col">
            <ShipmentHeader status={formatCell(String(shipment.status))} filename={shipment.filename} carrier_type={shipment.carrier_type}/>
            <div className="container mx-auto p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard title="Shipment Information" items={shipmentInfo} />
                    <InfoCard title="Shipping Details" items={shippingDetails} />
                    <InfoCard title="Shipper" items={shipperInfo} />
                    <InfoCard title="Receiver" items={receiverInfo} />
                </div>
                <ShipmentTimeline items={timelineItems} latestCheckpoint={formatDate(shipment.latest_cp)} />
            </div>
        </div>
    )
};

export default ShipmentDetailPage;

