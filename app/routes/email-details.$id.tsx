import { TypographyH3 } from "@/components/ui/typography";
import { prisma } from "@/lib/prisma-client";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Email Details" },
    { name: "description", content: "Email Details" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const currentEmail = await prisma.email.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return { email: currentEmail };
}

export default function EmailDetailsPage() {
  const { email } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-5">
      <div>
        <TypographyH3 title={`Details of email from ${email?.from}`} />
      </div>
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-2">
            <CardTitle>{email.subject}</CardTitle>
            <CardDescription>From: {email.from}</CardDescription>
          </div>
          <Badge>{email.tag}</Badge>
        </CardHeader>
        <CardContent className="flex flex-row items-center justify-between">
          <ReadStatus read={email.read} />
        </CardContent>
      </Card> */}
    </div>
  );
}
