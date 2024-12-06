import { EmailTile } from "@/components/EmailTile";
import { TypographyH3 } from "@/components/ui/typography";
import { prisma } from "@/lib/prisma-client";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin Dashboard" },
    { name: "description", content: "Admin Dashboard" },
  ];
};

export async function loader() {
  const allEmails = await prisma.email.findMany();

  return { allEmails };
}

export default function AdminDashboardPage() {
  const { allEmails } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-5">
      <TypographyH3 title="Emails" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {allEmails.map((email) => (
          <EmailTile key={email.id} email={email} />
        ))}
      </div>
    </div>
  );
}
