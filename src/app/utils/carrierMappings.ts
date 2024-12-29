const Types: string[] = ["DHL", "Hellmann", "Logwin"];


interface CarrierMappingConfig{
    typesofcarriers: string ;
    status: string ;
    po_number: string;
    eta: string;
    etd: string;
    atd: string;
    ata: string;
    packages: string;
    volume: string;
    weight: string;
    shipper: string;
    shipper_country: string;
    receiver: string;
    receiver_country: string;
    houseawb: string;
    shipper_ref_no: string;
    carrier: string;
    inco_term: string;
    vessel_flight: string;
    pickup_date: string;
    latest_cp: string;
}


export const carrierMappings: Record<string, CarrierMappingConfig> = {
    dhl: {
        typesofcarriers: Types[0],
        status: "Last Checkpoint Code",
        po_number: "Not Defined",
        eta: "Estimated Delivery Date",
        etd: "Not Defined",
        atd: "Not Defined",
        ata: "Latest Checkpoint Date/Time",
        packages: "Pieces",
        volume: "Not Defined",
        weight: "Manifested Weight",
        shipper: Types[0],
        shipper_country: "Origin Country/Territory IATA code",
        receiver: "Receiver",
        receiver_country: "Destination Country/Territory IATA code",
        houseawb: "Waybill Number",
        shipper_ref_no: "Shipper Reference Number",
        carrier: Types[0],
        inco_term: "Not Defined",
        vessel_flight: "Not Defined",
        pickup_date: "Pickup Date",
        latest_cp: "Latest Checkpoint",
    },
    hellmann: {
        typesofcarriers: Types[1],
        status: "Status",
        po_number: "Not Defined",
        eta: "Flight ETA",
        etd: "Flight ETD",
        atd: "Flight ATD",
        ata: "Flight ATA",
        packages: "No of Packages",
        weight: "Gross Weight (Kg)",
        volume: "Not Defined",
        shipper: "Shipper Name",
        shipper_country: "Shipper Country",
        receiver: "Consignee Name",
        receiver_country: "Consignee Country",
        houseawb: "House AWB",
        shipper_ref_no: "Not Defined",
        carrier: Types[1],
        inco_term: "Incoterm",
        vessel_flight: "Flight No",
        pickup_date: "Act. Pick Up",
        latest_cp: "Not Defined",
    },
    logwin: {
        typesofcarriers: Types[2],
        status: "Status",
        po_number: "PO Number",
        eta: "ETA",
        etd: "ETD",
        atd: "ATD",
        ata: "ATA",
        packages: "Packages",
        weight: "Weight",
        volume: "Volume",
        shipper: "Shipper",
        shipper_country: "Port of Origin",
        receiver: "Consignee",
        receiver_country: "Port of Destination",
        houseawb: "House",
        shipper_ref_no: "Shipper Ref.",
        carrier: "Carrier",
        inco_term: "Not Defined",
        vessel_flight: "Voyage / Flight",
        pickup_date: "Not Defined",
        latest_cp: "Not Defined",
    },
}