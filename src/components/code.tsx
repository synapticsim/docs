import { Fragment } from "react";

/**
 * Inline `code` elements can contain long, unbroken paths. Since plain text
 * has no natural break points at `/` or `\`, insert a `<wbr>` after each slash
 * so the browser can wrap there instead of overflowing or breaking mid-word.
 * Fenced code blocks pass highlighted (non-string) children, so they're
 * rendered as-is.
 */
export function InlineCode({
    children,
    ...props
}: React.ComponentProps<"code">) {
    if (typeof children !== "string" || !children.match(/[\\/]/)) {
        return <code {...props}>{children}</code>;
    }

    const parts = children.split(/([\\/])/);
    return (
        <code {...props}>
            {parts.map((part, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: parts are derived once from children and never reordered
                <Fragment key={i}>
                    {part}
                    {/[\\/]/.test(part) && <wbr />}
                </Fragment>
            ))}
        </code>
    );
}
