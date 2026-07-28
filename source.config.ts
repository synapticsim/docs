import {
    defineConfig,
    defineDocs,
    frontmatterSchema,
    metaSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

// Extra frontmatter used only to feed the Changelog OG image template
// (src/components/takumi/changelog-template.tsx) — kept separate from the
// page's actual markdown content, which is the source of truth for what
// renders on the page itself. The version itself isn't included here — each
// changelog entry file is named after its version (e.g. `26.7.1.mdx`), so
// that's derived from the slug instead of duplicated in frontmatter.
const changelogOgSchema = z.object({
    date: z.string().optional(),
    ogHeadline: z.string().optional(),
    bullets: z
        .array(z.object({ tag: z.string(), text: z.string() }))
        .optional(),
});

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
    dir: "content/docs",
    docs: {
        schema: frontmatterSchema.extend(changelogOgSchema.shape),
        postprocess: {
            includeProcessedMarkdown: true,
        },
    },
    meta: {
        schema: metaSchema,
    },
});

export default defineConfig({
    mdxOptions: {
        // MDX options
    },
});
