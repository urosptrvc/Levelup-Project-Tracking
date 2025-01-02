import { Plane, Package, User, MapPin, FileText, Scale, Box } from 'lucide-react'
import {formatCell, formatDate, formatNull} from "@/app/utils/formatters";
import {shipments} from "@prisma/client";

const Columns = (shipment: shipments) => {
    const shipmentInfo = [
        { icon: FileText, label: "PO Number", value: formatCell(formatNull(shipment.po_number)) },
        { icon: Package, label: "Packages", value: formatCell(formatNull(shipment.packages)) },
        { icon: Scale, label: "Weight", value: formatCell(formatNull(shipment.weight)) },
        { icon: Box, label: "Volume", value: formatCell(formatNull(shipment.volume)) },
    ];

    const shippingDetails = [
        { icon: FileText, label: "House AWB", value: formatCell(formatNull(shipment.house_awb)) },
        { icon: FileText, label: "Shipper Ref. No", value: formatCell(formatNull(shipment.shipper_ref_no)) },
        { icon: Plane, label: "Carrier", value: formatCell(formatNull(shipment.carrier)) },
        { icon: FileText, label: "Inco Term", value: formatCell(formatNull(shipment.inco_term)) },
        { icon: Plane, label: "Vessel Flight", value: formatCell(formatNull(shipment.vessel_flight)) },
    ];

    const shipperInfo = [
        { icon: User, label: "Shipper", value: formatCell(formatNull(shipment.shipper)) },
        { icon: MapPin, label: "Country", value: formatCell(formatNull(shipment.shipper_country)) },
    ];

    const receiverInfo = [
        { icon: User, label: "Receiver", value: formatCell(formatNull(shipment.receiver)) },
        { icon: MapPin, label: "Country", value: formatCell(formatNull(shipment.receiver_country)) },
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

