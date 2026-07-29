import { notFound } from "next/navigation";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import OgTemplate from "@/components/og-template";
import { getPageImage, source } from "@/lib/source";

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
    // so its image is generated directly rather than from a page.
    if (pageSlug.length === 1 && pageSlug[0] === "changelog") {
        const image = (
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
    if (!page || (page.slugs.length === 2 && page.slugs[0] === "changelog")) {
        notFound();
    }

    const image = (
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
    const params = source
        .getPages()
        .filter(
            (page) =>
                !(page.slugs.length === 2 && page.slugs[0] === "changelog"),
        )
        .map((page) => ({
            lang: page.locale,
            slug: getPageImage(page).segments,
        }));

    // the composed `/changelog` page has no source page of its own
    params.push({ lang: undefined, slug: ["changelog", "image.webp"] });

    return params;
}
