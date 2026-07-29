import { docs } from "fumadocs-mdx:collections/server";
import { type InferPageType, loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
    baseUrl: "/",
    source: docs.toFumadocsSource(),
    plugins: [lucideIconsPlugin()],
});

function parseVersion(version: string): number[] {
    return version.split(".").map((n) => Number.parseInt(n, 10) || 0);
}

function compareVersionsDesc(a: string, b: string): number {
    const pa = parseVersion(a);
    const pb = parseVersion(b);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const diff = (pb[i] ?? 0) - (pa[i] ?? 0);
        if (diff !== 0) return diff;
    }
    return 0;
}

/** content/docs/changelog/known-issues.mdx isn't a version entry — it's a
 *  standing list rendered once at the top of the combined `/changelog` feed,
 *  so it's excluded from getChangelogEntries and fetched on its own. */
const KNOWN_ISSUES_SLUG = "known-issues";

/** Every changelog entry (content/docs/changelog/<version>.mdx), newest
 *  first — each is its own page/URL/OG image, but also gets composed into
 *  one combined feed at `/changelog`. Sorted by the version itself (the
 *  slug), not by frontmatter, since the version is the only thing
 *  guaranteed to sort correctly and consistently. */
export function getChangelogEntries() {
    return source
        .getPages()
        .filter(
            (page) =>
                page.slugs.length === 2 &&
                page.slugs[0] === "changelog" &&
                page.slugs[1] !== KNOWN_ISSUES_SLUG,
        )
        .sort((a, b) =>
            compareVersionsDesc(a.slugs.at(-1) ?? "", b.slugs.at(-1) ?? ""),
        );
}

export function getKnownIssues() {
    return source.getPage(["changelog", KNOWN_ISSUES_SLUG]);
}

export function getPageImage(page: InferPageType<typeof source>) {
    const segments = [...page.slugs, "image.webp"];

    return {
        segments,
        url: `/og/${segments.join("/")}`,
    };
}

export async function getLLMText(page: InferPageType<typeof source>) {
    const processed = await page.data.getText("processed");

    return `# ${page.data.title}

${processed}`;
}
