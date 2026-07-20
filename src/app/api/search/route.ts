import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

export const dynamic = "force-static";

// static export has no server to answer live queries, so export the
// prebuilt search index instead and search it client-side
export const { staticGET: GET } = createFromSource(source, {
    // https://docs.orama.com/docs/orama-js/supported-languages
    language: "english",
});
