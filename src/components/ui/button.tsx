import Link from "next/link";
import type { ComponentProps } from "react";

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "light";
}) {
  return (
    <Link className={`button button-${variant} ${className}`} {...props} />
  );
}
