import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const PaginationComponent = ({ currentPage, totalPages, onPageChange,}: Props) => {
    if (totalPages === 0) return null;

    return (
        <Pagination className="mt-4 mr-3 cursor-pointer">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    />
                </PaginationItem>

                {currentPage > 2 && (
                    <>
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => onPageChange(1)}
                                isActive={1 === currentPage}
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        {currentPage > 3 && <PaginationEllipsis />}
                    </>
                )}

                {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
                    .filter((page) => page > 0 && page <= totalPages)
                    .map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                onClick={() => onPageChange(page)}
                                isActive={currentPage === page}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                {currentPage < totalPages - 1 && (
                    <>
                        {currentPage < totalPages - 2 && <PaginationEllipsis />}
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => onPageChange(totalPages)}
                                isActive={currentPage === totalPages}
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationComponent;
