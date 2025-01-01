import { Badge } from "@/components/ui/badge";

type Props = {
    status: string | null;
    carrier_type: string | null;
    filename: string | null;
};

export function ShipmentHeader({ status, filename, carrier_type }: Props) {
    return (
        <div className="container">
            <header className="text-left py-4 bg-background">
                <h1 className="text-2xl font-bold">Shipment Details</h1>
                <div className="flex items-center space-x-2 mt-2 mb-2">
                    <h3 className="text-sm font-bold">Status:</h3>
                    <Badge variant="default">{status}</Badge>
                </div>
                <h1 className="text-sm font-bold">
                    {carrier_type} - Source: {filename}
                </h1>
            </header>
        </div>
    );
}
