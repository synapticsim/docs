import { Callout } from "fumadocs-ui/components/callout";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Badge } from "@/components/badge";
import * as ChangelogComponents from "@/components/changelog-list";
import { InlineCode } from "@/components/code";
import { LinkButton } from "@/components/link-button";
import { Step, Steps } from "@/components/steps";
import { cn } from "@/lib/cn";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
    return {
        ...defaultMdxComponents,
        img: (props) => <ImageZoom {...props} />,
        Callout: (props) => (
            <Callout
                {...props}
                className={cn(
                    "[&_.text-fd-muted-foreground]:text-inherit",
                    props.className,
                )}
            />
        ),
        pre: ({ ref: _ref, ...props }) => (
            <CodeBlock {...props}>
                <Pre>{props.children}</Pre>
            </CodeBlock>
        ),
        code: InlineCode,
        LinkButton,
        Badge,
        File,
        Files,
        Folder,
        Step,
        Steps,
        ...ChangelogComponents,
        ...TabsComponents,
        ...components,
    };
}
