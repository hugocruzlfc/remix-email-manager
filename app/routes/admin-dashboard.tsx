import CurrentPagination from "@/components/CurrentPagination";
import { EmailTile } from "@/components/EmailTile";
import FiltersForm from "@/components/FilterForm";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyH4 } from "@/components/ui/typography";
import { prisma } from "@/lib/prisma-client";
import { Prisma, Tags } from "@prisma/client";

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { SlidersHorizontal, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";

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

  const searchQuery = query.get("search");
  const currentTag = query.get("tag");
  const currentStatus = query.get("status");

  const currentPage = Math.max(Number(query.get("page") || 1), 1);

  const formattedFilter: Prisma.EmailWhereInput = searchQuery
    ? {
        OR: [
          {
            from: {
              contains: searchQuery,
            },
          },
          {
            to: {
              contains: searchQuery,
            },
          },
        ],
      }
    : {};

  const where: Prisma.EmailWhereInput = {
    AND: [
      formattedFilter,
      currentTag ? { tag: currentTag as Tags } : undefined,
      currentStatus
        ? {
            read: currentStatus === "true",
          }
        : undefined,
    ].filter(Boolean) as Prisma.EmailWhereInput[],
  };

  const options: Prisma.EmailFindManyArgs = {
    take: PER_PAGE,
    skip: (currentPage - 1) * PER_PAGE,
    orderBy: {
      updatedAt: "desc",
    },
    where,
  };

  const countOptions: Prisma.EmailCountArgs = {};

  countOptions.where = options.where;

  if (query.get("orderBy")) {
    const orderBy = query.get("orderBy");
    options.orderBy = {
      [orderBy || "updatedAt"]: query.get("orderDir") || "asc",
    };
  }

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
  const [searchParams] = useSearchParams();
  const totalPages = Math.ceil(count / PER_PAGE);

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state === "submitting") {
      const isClearForm = formRef.current?.id === "clear-filters-form";
      if (isClearForm) {
        formRef.current?.reset();
        inputRef.current?.focus();
      }
    }
  }, [state]);

  return (
    <div className="space-y-5">
      <TypographyH3 title="Emails" />
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal />
          <TypographyH4 title="Filters" />
        </div>
        <Form id="clear-filters-form" method="get">
          <input type="hidden" name="search" value="" />
          <input type="hidden" name="tag" value="" />
          <input type="hidden" name="status" value="" />
          <input type="hidden" name="orderBy" value="" />
          <input type="hidden" name="orderDir" value="" />
        </Form>
        <Button variant="destructive" type="submit" form="clear-filters-form">
          <Trash2 />
          Clear Filters
        </Button>
      </div>

      <FiltersForm
        searchParams={searchParams}
        navigationState={state}
        inputRef={inputRef}
        fromRef={formRef}
      />
      <div className="my-4" aria-live="polite">
        <p>{`Displaying ${emails.length} of ${count}.`}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {emails.map((email) => (
          <EmailTile key={email.id} email={email} />
        ))}
      </div>
      {totalPages > 1 && (
        <CurrentPagination totalPages={totalPages} pageParam="page" />
      )}
    </div>
  );
}
