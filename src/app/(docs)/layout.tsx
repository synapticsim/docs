import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsSidebarItem } from "@/components/docs-sidebar-item";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/">) {
    return (
        <DocsLayout
            tree={source.pageTree}
            sidebar={{ components: { Item: DocsSidebarItem } }}
            {...baseOptions()}
        >
            {children}
        </DocsLayout>
    );
}
