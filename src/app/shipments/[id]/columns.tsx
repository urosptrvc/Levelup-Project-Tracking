import { Plane, Package, User, MapPin, FileText, Scale, Box } from 'lucide-react'
import {formatCell,formatDate} from "@/app/utils/formatters";
import {shipments} from "@prisma/client";

const Columns = (shipment: shipments) => {
    const shipmentInfo = [
        { icon: FileText, label: "PO Number", value: formatCell(String(shipment.po_number)) },
        { icon: Package, label: "Packages", value: formatCell(String(shipment.packages)) },
        { icon: Scale, label: "Weight", value: formatCell(String(shipment.weight)) },
        { icon: Box, label: "Volume", value: formatCell(String(shipment.volume)) },
    ];

    const shippingDetails = [
        { icon: FileText, label: "House AWB", value: formatCell(String(shipment.house_awb)) },
        { icon: FileText, label: "Shipper Ref. No", value: formatCell(String(shipment.shipper_ref_no)) },
        { icon: Plane, label: "Carrier", value: formatCell(String(shipment.carrier)) },
        { icon: FileText, label: "Inco Term", value: formatCell(String(shipment.inco_term)) },
        { icon: Plane, label: "Vessel Flight", value: formatCell(String(shipment.vessel_flight)) },
    ];

    const shipperInfo = [
        { icon: User, label: "Shipper", value: formatCell(String(shipment.shipper)) },
        { icon: MapPin, label: "Country", value: formatCell(String(shipment.shipper_country)) },
    ];

    const receiverInfo = [
        { icon: User, label: "Receiver", value: formatCell(String(shipment.receiver)) },
        { icon: MapPin, label: "Country", value: formatCell(String(shipment.receiver_country)) },
    ];

    const timelineItems = [
        { label: "PKD", title: "Pickup Date", value: formatDate(shipment.pickup_date), variant: "outline" as const },
        { label: "ATD", title: "Actual Time of Departure", value: formatDate(shipment.atd), variant: "default" as const},
        { label: "ATA", title: "Actual Time of Arrival", value: formatDate(shipment.ata), variant: "default" as const},
        { label: "ETD", title: "Estimated Time of Departure", value: formatDate(shipment.etd), variant: "secondary" as const },
        { label: "ETA", title: "Estimated Time of Arrival", value: formatDate(shipment.eta), variant: "secondary" as const },
    ];

    return { shipmentInfo, shippingDetails, shipperInfo, receiverInfo, timelineItems };
};

export default Columns;

