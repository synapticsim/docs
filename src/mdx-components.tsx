import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { LinkButton } from "@/components/link-button";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
    return {
        ...defaultMdxComponents,
        img: (props) => <ImageZoom {...(props as any)} />,
        LinkButton,
        ...components,
    };
}
