import type { HTMLAttributes } from "react";
import { Badge, type BadgeProps } from "@/components/badge";
import { cn } from "@/lib/cn";

export function ChangelogList({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "grid grid-cols-[auto_1fr] justify-items-start items-center gap-x-4 gap-y-2",
                className,
            )}
            {...props}
        />
    );
}

interface ChangelogItemProps extends HTMLAttributes<HTMLDivElement> {
    label: string;
    variant: BadgeProps["variant"];
}

function ChangelogItem({ label, variant, children }: ChangelogItemProps) {
    return (
        <>
            <Badge variant={variant}>{label}</Badge>
            <li className="text-sm list-none">{children}</li>
        </>
    );
}

export function Fixed({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <ChangelogItem
            label="Fixed"
            variant="default"
            className={className}
            {...props}
        />
    );
}

export function Added({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <ChangelogItem
            label="Added"
            variant="success"
            className={className}
            {...props}
        />
    );
}

export function Removed({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <ChangelogItem
            label="Removed"
            variant="muted"
            className={className}
            {...props}
        />
    );
}
