import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";

export interface ReadStatusProps {
  read: boolean;
}

export function ReadStatus({ read }: ReadStatusProps) {
  const status = read ? "Read" : "Unread";
  const Icon = read ? CheckCheck : Check;

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        read ? "text-green-600" : "text-red-600",
      )}
    >
      {status} <Icon />
    </div>
  );
}
