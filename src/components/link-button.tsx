import { ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes } from "react";

export function LinkButton({
    children,
    className,
    ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <a
            target="_blank"
            rel="noreferrer"
            className={`not-prose my-4 inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-3 font-semibold text-fd-primary-foreground transition-opacity hover:opacity-90 ${className ?? ""}`}
            {...props}
        >
            {children}
            <ArrowUpRight className="size-4" />
        </a>
    );
}
