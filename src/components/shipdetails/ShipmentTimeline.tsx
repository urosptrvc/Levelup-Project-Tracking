import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin } from 'lucide-react'

type TimelineItem = {
    label: string;
    title: string;
    value: string | Date | unknown;
    variant: "default" | "secondary" | "outline";
};

type Props = {
    items: TimelineItem[];
    latestCheckpoint: string;
};

export function ShipmentTimeline({ items, latestCheckpoint }: Props) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle>Shipment Timeline</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <Badge variant={item.variant} className="flex-shrink-0">{item.label}</Badge>
                            <div className="flex-grow">
                                <p className="text-xs text-muted-foreground">{item.title}</p>
                                <p className="text-sm">{item.value ? String(item.value) : "Not available"}</p>
                            </div>
                        </div>
                    ))}
                    <Separator className="my-3" />
                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">Latest Checkpoint</h3>
                        <div className="flex items-center space-x-2">
                            <MapPin className="text-muted-foreground w-4 h-4" />
                            <p className="font-medium text-sm">{latestCheckpoint}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

