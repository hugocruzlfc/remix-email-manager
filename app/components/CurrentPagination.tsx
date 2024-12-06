import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "@remix-run/react";

interface PaginationProps {
  totalPages: number;
  pageParam: string;
  className?: string;
}

export default function CurrentPagination({
  totalPages = Number.MAX_SAFE_INTEGER,
  pageParam = "page",
}: PaginationProps) {
  const [queryParams] = useSearchParams();
  const currentPage = Number(queryParams.get(pageParam) || 1);
  totalPages = Number(totalPages);

  const previousQuery = new URLSearchParams(queryParams);

  const previousQueryPage = currentPage !== 1 ? currentPage - 1 : 1;
  previousQuery.set(pageParam, previousQueryPage.toString());
  const nextQuery = new URLSearchParams(queryParams);

  const nextQueryPage =
    currentPage !== totalPages ? currentPage + 1 : totalPages;
  nextQuery.set(pageParam, nextQueryPage.toString());

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?${previousQuery.toString()}`}
            className={currentPage === 1 ? "pointer-events-none" : ""}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={`?${nextQuery.toString()}`}
            className={currentPage === totalPages ? "pointer-events-none" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
