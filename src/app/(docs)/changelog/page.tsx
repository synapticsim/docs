import {
    DocsBody,
    DocsDescription,
    DocsPage,
    DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import type { Metadata } from "next";
import { Badge } from "@/components/badge";
import { getChangelogEntries } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default function ChangelogPage() {
    const entries = getChangelogEntries();
    const components = getMDXComponents();

    const toc = entries.flatMap((entry) => {
        const version = entry.slugs.at(-1);

        return [
            { title: version, url: `#${version}`, depth: 2 },
            ...entry.data.toc,
        ];
    });

    return (
        <DocsPage toc={toc}>
            <DocsTitle>Version History</DocsTitle>
            <DocsDescription>
                Historical changelogs for the Synaptic A220.
            </DocsDescription>
            <DocsBody>
                {entries.map((entry, index) => {
                    const version = entry.slugs.at(-1);
                    const MDX = entry.data.body;

                    return (
                        <section key={entry.url}>
                            <h2 id={version}>
                                <a href={`#${version}`}>{version}</a>
                                {entry.data.ogDate && ` — ${entry.data.ogDate}`}
                                {index === 0 && (
                                    <Badge
                                        variant="outline"
                                        className="ms-2 rounded-md align-bottom text-base"
                                    >
                                        Latest
                                    </Badge>
                                )}
                            </h2>
                            <MDX components={components} />
                        </section>
                    );
                })}
            </DocsBody>
        </DocsPage>
    );
}

export function generateMetadata(): Metadata {
    return {
        title: "Changelog",
        description: "Version history for the A220 project.",
        openGraph: {
            images: "/og/changelog/image.webp",
        },
    };
}
