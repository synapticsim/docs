import {
    DocsBody,
    DocsDescription,
    DocsPage,
    DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageImage, source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

// individual changelog entries (content/docs/changelog/<version>.mdx) are
// only meant to be read as part of the combined /changelog feed, not as
// standalone pages.
function isChangelogEntry(slugs: string[]) {
    return slugs.length === 2 && slugs[0] === "changelog";
}

export default async function Page(props: PageProps<"/[[...slug]]">) {
    const params = await props.params;
    const page = source.getPage(params.slug);
    if (!page || isChangelogEntry(page.slugs)) notFound();

    const MDX = page.data.body;

    return (
        <DocsPage toc={page.data.toc} full={page.data.full}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription>{page.data.description}</DocsDescription>
            <DocsBody>
                <MDX
                    components={getMDXComponents({
                        // this allows you to link to other pages with relative file paths
                        a: createRelativeLink(source, page),
                    })}
                />
            </DocsBody>
        </DocsPage>
    );
}

export async function generateStaticParams() {
    return source
        .generateParams()
        .filter((param) => !isChangelogEntry(param.slug));
}

export async function generateMetadata(
    props: PageProps<"/[[...slug]]">,
): Promise<Metadata> {
    const params = await props.params;
    const page = source.getPage(params.slug);
    if (!page || isChangelogEntry(page.slugs)) notFound();

    return {
        title: page.data.title,
        description: page.data.description,
        openGraph: {
            images: getPageImage(page).url,
        },
    };
}
