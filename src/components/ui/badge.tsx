import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Badge({
  className,
  tone = "neutral",
  ...props
}: ComponentProps<"span"> & { tone?: "neutral" | "accent" | "danger" }) {
  const tones = {
    neutral: "bg-muted-bg text-muted",
    accent: "bg-accent/15 text-accent",
    danger: "bg-danger/10 text-danger",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
