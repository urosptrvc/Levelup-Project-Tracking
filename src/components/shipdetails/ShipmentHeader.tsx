import { Badge } from "@/components/ui/badge"

type Props = {
    status: string | null;
    carrier_type: string | null;
    filename: string | null;
};

export function ShipmentHeader({ status, filename, carrier_type }: Props) {
    return (
        <header className="text-center py-4 bg-background">
            <h1 className="text-2xl font-bold">Shipment Details</h1>
            <Badge
                variant="default"
                className="mt-2 mb-2"
            >
                {status}
            </Badge>
            <h1 className="text-sm font-bold">{carrier_type} - Source: {filename}</h1>
        </header>
    );
}

