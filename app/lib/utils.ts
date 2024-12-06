import { AdminFilters } from "@/types/admin-filte.interface";
import { Tags } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAdminFiltersFromQuery(query: URLSearchParams): AdminFilters {
  return {
    search: query.get("search") || undefined,
    tag: (query.get("tag") as Tags) || undefined,
    status:
      query.get("status") === "true"
        ? true
        : query.get("status") === "false"
          ? false
          : undefined,
    page: Math.max(Number(query.get("page") || 1), 1),
    orderBy: query.get("orderBy") || undefined,
    orderDir: (query.get("orderDir") as "asc" | "desc") || "asc",
  };
}
