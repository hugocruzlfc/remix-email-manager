import { Tags } from "@prisma/client";

export interface AdminFilters {
  search?: string;
  tag?: Tags;
  status?: boolean;
  page: number;
  orderBy?: string;
  orderDir?: "asc" | "desc";
}
