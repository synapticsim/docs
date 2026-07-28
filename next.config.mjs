import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
    output: "export",
    images: { unoptimized: true },
    reactStrictMode: true,
    // GitHub Pages only serves static files, so build a static export
    // instead of requiring a Node server. Scoped to actual builds only —
    // `next dev` enforces the export contract (every path must be declared
    // in generateStaticParams) even locally, which turns any undeclared
    // request (browser probes, extensions, etc.) into a hard error instead
    // of a normal 404. In the real static export, an undeclared path is
    // just a plain 404 from the host, so this doesn't change production
    // behavior — it only relaxes local dev.
    ...(process.env.NODE_ENV === "production" ? { output: "export" } : {}),
    serverExternalPackages: ["@takumi-rs/core"],
};

export default withMDX(config);
