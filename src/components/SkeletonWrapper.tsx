import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

type Props = {
    children?: React.ReactNode;
    isLoading?: boolean;
    rows?: number;
};

const SkeletonWrapper = ({ children, isLoading, rows }: Props) => {
    if (!isLoading) {
        return <>{children}</>;
    }

    return (
        <div>
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Skeleton className="h-6 w-full" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(rows)].map((_, rowIdx) => (
                        <TableRow key={rowIdx}>
                            <TableCell key={rowIdx}>
                                <Skeleton className="h-8 w-full" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default SkeletonWrapper;
