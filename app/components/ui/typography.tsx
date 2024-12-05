interface TypographyProps {
  title: string;
}

export function TypographyH3({ title }: TypographyProps) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {title}
    </h3>
  );
}

export function TypographyP({ title }: TypographyProps) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{title}</p>;
}
