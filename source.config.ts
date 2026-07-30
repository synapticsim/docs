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

export default defineConfig({
    mdxOptions: {
        // MDX options
    },
});
