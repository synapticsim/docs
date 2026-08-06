import path from "node:path";
import {
    defineConfig,
    defineDocs,
    frontmatterSchema,
    metaSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

// Changelog entries carry a `date`, shown next to the version heading on the
// page (src/app/(docs)/changelog/page.tsx). The version itself isn't
// included here — each changelog entry file is named after its version
// (e.g. `26.7.1.mdx`), so that's derived from the slug instead of duplicated
// in frontmatter.
const changelogSchema = z.object({
    date: z.string().optional(),
    // Marks an entry as not-yet-released. Renders an amber "Upcoming" badge
    // next to the version heading (src/app/(docs)/changelog/page.tsx).
    upcoming: z.boolean().optional(),
});

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
    dir: "content/docs",
    docs: {
        schema: frontmatterSchema.extend(changelogSchema.shape),
        postprocess: {
            includeProcessedMarkdown: true,
        },
    },
    meta: {
        schema: metaSchema,
    },
});

// All changelog entries are rendered together on one page
// (src/app/(docs)/changelog/page.tsx), but every entry is authored with its
// own plain `[^1]`, `[^2]`, ... footnotes. Left alone, those identifiers
// collide across versions once concatenated into a single HTML document. To
// keep authoring simple, this plugin rewrites footnote identifiers to be
// prefixed with the entry's version (taken from its filename, e.g.
// `1.0.4.mdx` -> `1.0.4`) so they stay unique page-wide without changelog
// authors having to think about it.
interface FootnoteTreeNode {
    type: string;
    identifier?: string;
    label?: string | null;
    children?: FootnoteTreeNode[];
}

function remarkPrefixChangelogFootnotes() {
    return (tree: FootnoteTreeNode, file: { path: string }) => {
        if (path.basename(path.dirname(file.path)) !== "changelog") return;

        const prefix = path.basename(file.path, path.extname(file.path));

        const visit = (node: FootnoteTreeNode) => {
            if (
                node.type === "footnoteReference" ||
                node.type === "footnoteDefinition"
            ) {
                node.identifier = `${prefix}-${node.identifier}`;
                if (node.label) node.label = `${prefix}-${node.label}`;
            }
            node.children?.forEach(visit);
        };

        visit(tree);
    };
}

export default defineConfig({
    mdxOptions: {
        remarkPlugins: (defaults) => [
            ...defaults,
            remarkPrefixChangelogFootnotes,
        ],
        remarkRehypeOptions: {
            // remark-gfm appends a footnote footer labelled with an `sr-only`
            // <h2>. Emitting a <span> instead keeps the label for screen readers
            // while avoiding fumadocs' heading-anchor treatment and keeping
            // "Footnotes" out of the sidebar TOC (rehypeToc only visits h1-h6).
            footnoteLabelTagName: "span",
            // Drop remark-rehype's default "user-content-" id prefix on
            // footnotes; remarkPrefixChangelogFootnotes above already keeps
            // ids unique across the concatenated changelog page.
            clobberPrefix: "",
        },
    },
});
