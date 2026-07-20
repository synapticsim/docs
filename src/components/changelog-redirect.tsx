/** Sends real visitors from `/changelog/<version>` to `/changelog#<version>`
 *  via a pure-HTML meta refresh — no JavaScript needed. Link-preview bots
 *  (Discord, Slack, Twitter/X, etc.) don't follow this; they read whatever
 *  `<head>` meta tags are already on the page (set by this route's
 *  `generateMetadata`) and stop, so per-version OG images still work. */
export function ChangelogRedirect({ href }: { href: string }) {
    return (
        <>
            <meta httpEquiv="refresh" content={`0; url=${href}`} />
            <p>
                Redirecting to <a href={href}>the changelog</a>…
            </p>
        </>
    );
}
