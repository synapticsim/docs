import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
    // GitHub Pages only serves static files, so build a static export
    // instead of requiring a Node server.
    output: "export",
};

export default withMDX(config);
