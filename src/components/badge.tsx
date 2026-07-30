import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
    "not-prose inline-flex items-center rounded-lg border px-2 py-0.5 text-xs font-medium",
    {
        variants: {
            variant: {
                default: "border-fd-primary text-fd-primary",
                secondary:
                    "border-fd-secondary-foreground text-fd-secondary-foreground",
                outline: "border-fd-border text-fd-foreground",
                muted: "border-fd-muted-foreground text-fd-muted-foreground",
                success: "border-fd-success text-fd-success",
                amber: "border-amber-500 text-amber-500",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

export interface BadgeProps
    extends HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <span
            className={cn(badgeVariants({ variant }), className)}
            {...props}
        />
    );
}
