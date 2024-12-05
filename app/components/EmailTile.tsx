import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Email } from "@prisma/client";
import { Link } from "@remix-run/react";
import { ReadStatus } from "./ReadStatus";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export interface EmailTileProps {
  email: Email;
}

export function EmailTile({ email }: EmailTileProps) {
  const { id, subject, from, tag, read } = email;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={`/email-details/${id}`}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-2">
                  <CardTitle>{subject}</CardTitle>
                  <CardDescription>From: {from}</CardDescription>
                </div>
                <Badge>{tag}</Badge>
              </CardHeader>
              <CardContent className="flex flex-row items-center justify-between">
                <ReadStatus read={read} />
              </CardContent>
            </Card>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{`View Details from ${from}`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
