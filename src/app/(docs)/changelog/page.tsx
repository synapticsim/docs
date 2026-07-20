import {
    DocsBody,
    DocsDescription,
    DocsPage,
    DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import type { Metadata } from "next";
import { getChangelogEntries } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default function ChangelogPage() {
    const entries = getChangelogEntries();
    const components = getMDXComponents();

    return (
        <DocsPage toc={entries.flatMap((entry) => entry.data.toc)}>
            <DocsTitle>Changelog</DocsTitle>
            <DocsDescription>
                Version history for the A220 project as a whole (not just the
                checklist editor or these docs).
            </DocsDescription>
            <DocsBody>
                <p>
                    Versions use CalVer — <code>YY.MM.MICRO</code> — where{" "}
                    <code>MICRO</code> resets to <code>1</code> at the start of
                    each month and increments for every additional release that
                    month. The newest release is listed first. Each version also
                    has its own shareable link (for example, when posting about
                    a specific release) that redirects back here with a preview
                    image for that release.
                </p>
                {entries.map((entry) => {
                    const version = entry.slugs.at(-1);
                    const MDX = entry.data.body;

                    return (
                        <section key={entry.url}>
                            <h2 id={version}>
                                <a href={`#${version}`}>{version}</a>
                                {entry.data.ogDate && ` — ${entry.data.ogDate}`}
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
