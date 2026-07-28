"use client";

import { cn } from "@fumadocs/ui/cn";
import {
    SidebarItem,
    useFolderDepth,
} from "fumadocs-ui/components/sidebar/base";
import type { Item as PageTreeItem } from "fumadocs-core/page-tree";

/** A page-tree link item, split on the first newline in its name into a
 *  label and a smaller, muted subtext line underneath (e.g. an author
 *  credit). Items without a newline render exactly like the default
 *  fumadocs sidebar item. */
export function DocsSidebarItem({ item }: { item: PageTreeItem }) {
    const depth = useFolderDepth();
    const [label, subtext] =
        typeof item.name === "string" ? item.name.split("\n", 2) : [item.name];

    return (
        <SidebarItem
            href={item.url}
            external={item.external}
            icon={item.icon}
            className={cn(
                "relative flex flex-row items-center gap-2 rounded-lg p-2 text-start text-fd-muted-foreground wrap-anywhere transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 hover:transition-none data-[active=true]:bg-fd-primary/10 data-[active=true]:text-fd-primary data-[active=true]:hover:transition-colors [&_svg]:size-4 [&_svg]:shrink-0",
                depth >= 1 &&
                    "data-[active=true]:before:absolute data-[active=true]:before:inset-y-2.5 data-[active=true]:before:start-2.5 data-[active=true]:before:w-px data-[active=true]:before:bg-fd-primary data-[active=true]:before:content-['']",
            )}
            style={{
                paddingInlineStart: `calc(${2 + 3 * depth} * var(--spacing))`,
            }}
        >
            {subtext ? (
                <span className="flex flex-col">
                    <span>{label}</span>
                    <span className="text-fd-muted-foreground/70 text-xs">
                        {subtext}
                    </span>
                </span>
            ) : (
                label
            )}
        </SidebarItem>
    );
}
