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

    // "Latest" marks the newest *released* version, i.e. the first entry
    // that isn't upcoming (unreleased entries sort above it).
    const latestIndex = entries.findIndex((entry) => !entry.data.upcoming);

    const toc = [
        ...entries.map((entry, index) => {
            const version = entry.slugs.at(-1);

            return {
                title: (
                    <span className="inline-flex items-center gap-2">
                        v{version}
                        {index === latestIndex && (
                            <Badge
                                variant="success"
                                className="rounded-md -my-2"
                            >
                                Latest
                            </Badge>
                        )}
                        {entry.data.upcoming && (
                            <Badge variant="amber" className="rounded-md -my-2">
                                Upcoming
                            </Badge>
                        )}
                    </span>
                ),
                url: `#v${version}`,
                depth: 2,
            };
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
                            className={cn(index !== 0 && "mt-16")}
                        >
                            {index > 0 && <hr className="my-5" />}
                            <h2 id={`v${version}`}>
                                <a href={`#v${version}`}>v{version}</a>
                                {entry.data.date && ` — ${entry.data.date}`}
                                {index === latestIndex && (
                                    <Badge
                                        variant="success"
                                        className="ms-2 rounded-md align-bottom text-base"
                                    >
                                        Latest
                                    </Badge>
                                )}
                                {entry.data.upcoming && (
                                    <Badge
                                        variant="amber"
                                        className="ms-2 rounded-md align-bottom text-base"
                                    >
                                        Upcoming
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
                            <section className="mt-16">
                                <hr className="my-5" />
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
