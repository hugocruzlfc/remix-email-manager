import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography";
import { prisma } from "@/lib/prisma-client";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ArrowBigLeft, CalendarRange } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Email Details" },
    { name: "description", content: "Email Details" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const currentEmail = await prisma.email.findUnique({
    where: {
      id: params.id,
    },
  });

  await prisma.email.update({
    where: {
      id: params.id,
    },
    data: {
      read: true,
    },
  });

  if (!currentEmail) {
    return { status: 404 };
  }

  return { email: currentEmail };
}

export default function EmailDetailsPage() {
  const { email } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon">
            <Link to="/admin-dashboard">
              <ArrowBigLeft />
            </Link>
          </Button>
          <TypographyH3
            title={`Details of email from ${email?.from}`}
            className="text-xl md:text-2xl"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarRange />
          {email?.createdAt.toLocaleDateString()}
        </div>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-2">
            <CardDescription>To: {email?.to}</CardDescription>
          </div>

          <Badge>{email?.tag}</Badge>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>Subject: {email?.subject}</div>
          <Card>
            <div className="p-6">{email?.body}</div>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
