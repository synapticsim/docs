import { notFound } from "next/navigation";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import OgTemplate from "@/components/og-template";
import { getChangelogEntries, getPageImage, source } from "@/lib/source";

export const revalidate = false;

function ogFonts() {
    return googleFonts([
        { name: "Plus Jakarta Sans", weight: [400, 700, 800] },
    ]);
}

export async function GET(
    _req: Request,
    { params }: RouteContext<"/og/[...slug]">,
) {
    const { slug } = await params;
    const pageSlug = slug.slice(0, -1);
    const fonts = await ogFonts();

    // `/changelog` itself has no source page (it's composed from
    // content/docs/changelog/*.mdx at src/app/(docs)/changelog/page.tsx),
    // so its image is generated from the latest entry instead.
    if (pageSlug.length === 1 && pageSlug[0] === "changelog") {
        const latest = getChangelogEntries()[0];
        const image = latest ? (
            <OgTemplate
                date={latest.data.ogDate}
                title={latest.data.ogHeadline ?? latest.data.title}
                bullets={latest.data.ogBullets}
            />
        ) : (
            <OgTemplate
                title="Changelog"
                subtitle="Version history for the A220 project."
            />
        );

        return new ImageResponse(image, {
            width: 1200,
            height: 630,
            format: "webp",
            fonts,
        });
    }

    const page = source.getPage(pageSlug);
    if (!page) notFound();

    // Individual changelog entries (content/docs/changelog/<version>.mdx)
    // use the release-note card; every other page uses the docs card.
    const isChangelogEntry =
        page.slugs.length === 2 && page.slugs[0] === "changelog";

    const image = isChangelogEntry ? (
        <OgTemplate
            date={page.data.ogDate}
            title={page.data.ogHeadline ?? page.data.title}
            bullets={page.data.ogBullets}
        />
    ) : (
        <OgTemplate title={page.data.title} subtitle={page.data.description} />
    );

    return new ImageResponse(image, {
        width: 1200,
        height: 630,
        format: "webp",
        fonts,
    });
}

export function generateStaticParams() {
    const params = source.getPages().map((page) => ({
        lang: page.locale,
        slug: getPageImage(page).segments,
    }));

    // the composed `/changelog` page has no source page of its own
    params.push({ lang: undefined, slug: ["changelog", "image.webp"] });

    return params;
}
