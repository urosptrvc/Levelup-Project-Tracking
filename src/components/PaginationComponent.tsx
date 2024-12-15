import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "./ui/pagination";

interface PaginationComponentProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({currentPage, totalPages, onPageChange,}) => (
    <Pagination className="mt-4 mr-3 cursor-pointer">
        <PaginationContent>
            <PaginationItem>
                <PaginationPrevious onClick={() => onPageChange(Math.max(currentPage - 1, 1))} />
            </PaginationItem>

            {currentPage > 2 && (
                <>
                    <PaginationItem>
                        <PaginationLink onClick={() => onPageChange(1)}>1</PaginationLink>
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
                        <PaginationLink onClick={() => onPageChange(totalPages)}>
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                </>
            )}

            <PaginationItem>
                <PaginationNext onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} />
            </PaginationItem>
        </PaginationContent>
    </Pagination>
);
