import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {LucideIcon} from 'lucide-react';

type InfoItem = {
    icon: LucideIcon;
    label: string;
    value: string | number | Date | null | undefined;
};

type Props = {
    title: string;
    items: InfoItem[];
};

export function InfoCard({title, items}: Props) {
    return (
        <Card className="w-full max-w-3xl">
            <CardHeader className="pb-2">
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 p-4">
                    {items.map((item, index) => (
                        <ScrollArea key={index} className="max-h-[100px] w-full rounded-md">
                            <div key={index} className="flex items-start space-x-2">
                                <item.icon className="text-muted-foreground w-4 h-4 flex-shrink-0 mt-1"/>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">{item.label}</p>
                                    <p className="text-sm break-words">{String(item.value)}</p>
                                </div>
                            </div>
                            <ScrollBar orientation="vertical"/>
                        </ScrollArea>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
