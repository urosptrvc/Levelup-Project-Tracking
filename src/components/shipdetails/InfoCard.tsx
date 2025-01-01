import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type LucideIcon } from 'lucide-react'

type InfoItem = {
    icon: LucideIcon;
    label: string;
    value: string | number| Date | null | undefined;
};

type Props = {
    title: string;
    items: InfoItem[];
};

export function InfoCard({ title, items }: Props) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <item.icon className="text-muted-foreground w-4 h-4 flex-shrink-0" />
                            <div className="max-w-[200px]">
                                <p className="text-xs text-muted-foreground truncate">{item.label}</p>
                                <p className="text-sm break-words">{String(item.value)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}