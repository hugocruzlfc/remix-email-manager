import { cn } from "@/lib/utils";

interface TypographyProps {
  title: string;
  className?: string;
}

export function TypographyH3({ title, className }: TypographyProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
    >
      {title}
    </h3>
  );
}

export function TypographyH4({ title, className }: TypographyProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
    >
      {title}
    </h4>
  );
}

export function TypographyP({ title, className }: TypographyProps) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {title}
    </p>
  );
}
