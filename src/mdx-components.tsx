import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import defaultMdxComponents from "fumadocs-ui/mdx";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import type { MDXComponents } from "mdx/types";
import { Badge } from "@/components/badge";
import { Added, ChangelogList, Fixed } from "@/components/changelog-list";
import { LinkButton } from "@/components/link-button";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
    return {
        ...defaultMdxComponents,
        img: (props) => <ImageZoom {...(props as any)} />,
        pre: ({ ref: _ref, ...props }) => (
            <CodeBlock {...props}>
                <Pre>{props.children}</Pre>
            </CodeBlock>
        ),
        LinkButton,
        Badge,
        ChangelogList,
        Fixed,
        Added,
        File,
        Files,
        Folder,
        ...TabsComponents,
        ...components,
    };
}
