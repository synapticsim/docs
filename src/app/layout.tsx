import { Banner } from "fumadocs-ui/components/banner";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";

const sans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
});

const mono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export const metadata: Metadata = {
    title: {
        template: "%s | Synaptic Docs",
        default: "Synaptic Docs",
    },
    description: "Documentation for the A220 project.",
};

export default function Layout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`${sans.variable} ${mono.variable}`}
            suppressHydrationWarning
        >
            <body className="flex flex-col min-h-screen font-sans">
                <Banner
                    id="wip-notice"
                    className="border-b border-fd-warning/40 bg-fd-warning/15 font-medium text-fd-warning backdrop-blur-md"
                >
                    These docs are a work in progress! The content on this page
                    is incomplete and will change.
                </Banner>
                <RootProvider
                    theme={{ defaultTheme: "dark" }}
                    search={{ options: { type: "static" } }}
                >
                    {children}
                </RootProvider>
            </body>
        </html>
    );
}
