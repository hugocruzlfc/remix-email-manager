import { useSearchParams } from "@remix-run/react";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationUI,
} from "./ui/pagination";

interface PaginationProps {
  totalPages: number;
  pageParam?: string;
  className?: string;
}

export default function Pagination({
  totalPages,
  pageParam = "page",
}: PaginationProps) {
  const [queryParams] = useSearchParams();
  const currentPage = Number(queryParams.get(pageParam) || 1);
  totalPages = Math.max(1, totalPages);

  const previousQuery = new URLSearchParams(queryParams);

  const previousQueryPage = currentPage !== 1 ? currentPage - 1 : 1;
  previousQuery.set(pageParam, previousQueryPage.toString());
  const nextQuery = new URLSearchParams(queryParams);

  const nextQueryPage =
    currentPage !== totalPages ? currentPage + 1 : totalPages;
  nextQuery.set(pageParam, nextQueryPage.toString());

  function generatePageLink(page: number) {
    if (page < 1 || page > totalPages) {
      return "#";
    }

    const query = new URLSearchParams(queryParams);
    query.set(pageParam, page.toString());

    return `?${query.toString()}`;
  }

  const numPagesToShow = 6;
  const pages = [];
  let startPage = Math.max(1, currentPage - Math.floor(numPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + numPagesToShow - 1);

  if (endPage - startPage < numPagesToShow - 1) {
    const diff = numPagesToShow - (endPage - startPage + 1);
    startPage = Math.max(1, startPage - diff);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <PaginationUI>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={
              currentPage > 1 ? generatePageLink(currentPage - 1) : undefined
            }
            aria-disabled={currentPage === 1}
            aria-label="Go to previous page"
          />
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={generatePageLink(page)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {endPage < totalPages && (
          <PaginationItem>
            {endPage + 1 < totalPages && <PaginationEllipsis />}
            <PaginationLink href={generatePageLink(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages
                ? generatePageLink(currentPage + 1)
                : undefined
            }
            aria-disabled={currentPage === totalPages}
            aria-label="Go to next page"
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationUI>
  );
}
