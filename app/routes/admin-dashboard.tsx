import { EmailTile } from "@/components/EmailTile";
import FiltersForm from "@/components/FilterForm";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyH4 } from "@/components/ui/typography";
import { prisma } from "@/lib/prisma-client";
import { getAdminFiltersFromQuery } from "@/lib/utils";
import { Prisma } from "@prisma/client";

import Pagination from "@/components/Pagination";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import {
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { useRef, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin Dashboard" },
    { name: "description", content: "Admin Dashboard" },
  ];
};

const PER_PAGE = 9;

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams;

  const filters = getAdminFiltersFromQuery(query);

  const formattedFilter: Prisma.EmailWhereInput = filters.search
    ? {
        OR: [
          { from: { contains: filters.search } },
          { to: { contains: filters.search } },
        ],
      }
    : {};

  const where: Prisma.EmailWhereInput = {
    AND: [
      formattedFilter,
      filters.tag ? { tag: filters.tag } : undefined,
      filters.status !== undefined ? { read: filters.status } : undefined,
    ].filter(Boolean) as Prisma.EmailWhereInput[],
  };

  const options: Prisma.EmailFindManyArgs = {
    take: PER_PAGE,
    skip: (filters?.page - 1) * PER_PAGE,
    orderBy: filters.orderBy
      ? { [filters.orderBy]: filters.orderDir }
      : !filters.status
        ? { read: "asc" }
        : { updatedAt: "desc" },
    where,
  };

  const countOptions: Prisma.EmailCountArgs = {};

  countOptions.where = options.where;

  const [emails, count] = await Promise.all([
    prisma.email.findMany(options),
    prisma.email.count(countOptions),
  ]);

  return {
    emails,
    count,
  };
}

export default function AdminDashboardPage() {
  const { state } = useNavigation();
  const { emails, count } = useLoaderData<typeof loader>();
  const [, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(count / PER_PAGE);
  const [showFilters, setShowFilters] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearFilters = () => {
    setSearchParams({});
    formRef.current?.reset();
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-5">
      <TypographyH3 title="Emails" />
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal />
          <TypographyH4 title="Filters" />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
        {showFilters && (
          <>
            <Button
              onClick={clearFilters}
              variant="destructive"
              type="submit"
              form="clear-filters-form"
            >
              <Trash2 />
              <p className="hidden md:block"> Clear Filters</p>
            </Button>
          </>
        )}
      </div>
      {showFilters && (
        <FiltersForm
          navigationState={state}
          inputRef={inputRef}
          fromRef={formRef}
          buttonSubmitStatus={emails.length === 0}
        />
      )}
      <div className="my-4" aria-live="polite">
        <p>{`Displaying ${emails.length} of ${count}.`}</p>
      </div>

      {emails.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {emails.map((email) => (
            <EmailTile key={email.id} email={email} />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Not emails found!</CardTitle>
          </CardHeader>
        </Card>
      )}

      {totalPages > 1 && (
        <Pagination totalPages={totalPages} pageParam="page" />
      )}
    </div>
  );
}
