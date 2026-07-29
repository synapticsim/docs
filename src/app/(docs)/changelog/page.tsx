import {
    DocsBody,
    DocsDescription,
    DocsPage,
    DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import type { Metadata } from "next";
import { Badge } from "@/components/badge";
import { cn } from "@/lib/cn";
import { getChangelogEntries, getKnownIssues } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default function ChangelogPage() {
    const entries = getChangelogEntries();
    const knownIssues = getKnownIssues();
    const components = getMDXComponents();

    const toc = [
        ...entries.map((entry) => {
            const version = entry.slugs.at(-1);

            return { title: `v${version}`, url: `#v${version}`, depth: 2 };
        }),
        ...(knownIssues
            ? [{ title: "Known Issues", url: "#known-issues", depth: 2 }]
            : []),
    ];

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
                        <section
                            key={entry.url}
                            className={cn("mt-20", index === 0 && "mt-0")}
                        >
                            <h2 id={version}>
                                <a href={`#v${version}`}>v{version}</a>
                                {entry.data.date && ` — ${entry.data.date}`}
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
                {knownIssues &&
                    (() => {
                        const KnownIssuesMDX = knownIssues.data.body;

                        return (
                            <section className="mt-20">
                                <h2 id="known-issues">
                                    <a href="#known-issues">Known Issues</a>
                                </h2>
                                <KnownIssuesMDX components={components} />
                            </section>
                        );
                    })()}
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
