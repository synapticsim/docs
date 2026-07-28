import type { ReactNode } from "react";
import { Logo } from "./logo";

// this site's own theme (src/app/global.css `.dark` block): near-black
// background, muted-violet glow, ecl-editor-matched accent.
const GLOW_COLOR = "rgba(167, 139, 250, 0.16)";
const ACCENT_COLOR = "#a78bfa";
const INK_COLOR = "#ebe9f5";
const MUTED_COLOR = "#b7b7c4";
// matches the `success` Badge variant's `fd-success` token (src/components/badge.tsx)
const SUCCESS_COLOR = "#00c950";

interface OgTemplateProps {
    title: ReactNode;
    subtitle?: ReactNode;
    date?: ReactNode;
    bullets?: { tag: ReactNode; text: ReactNode }[];
}

export default function OgTemplate({
    title,
    subtitle,
    date,
    bullets,
}: OgTemplateProps) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#0a0a0f",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                color: INK_COLOR,
                fontFamily: "Plus Jakarta Sans",
                backgroundImage: `radial-gradient(900px circle at 35% -20%, ${GLOW_COLOR}, transparent 65%)`,
                padding: "90px 60px 90px 60px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 32,
                    marginBottom: 40,
                    textWrap: "pretty",
                }}
            >
                {date && (
                    <span
                        style={{
                            display: "flex",
                            fontSize: 28,
                            fontWeight: 400,
                            color: MUTED_COLOR,
                            position: "absolute",
                            top: 50,
                        }}
                    >
                        {date}
                    </span>
                )}

                <span
                    style={{
                        fontSize: 72,
                        fontWeight: 800,
                        lineHeight: 1.1,
                        letterSpacing: "-0.04em",
                        color: INK_COLOR,
                    }}
                >
                    {title}
                </span>

                <div
                    style={{
                        maxHeight: 300,
                        overflow: "hidden",
                    }}
                >
                    {subtitle && (
                        <span
                            style={{
                                fontSize: 36,
                                color: MUTED_COLOR,
                                fontWeight: 400,
                                lineHeight: 1.4,
                                maxWidth: "95%",
                                letterSpacing: "-0.01em",
                                lineClamp: 2,
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                            }}
                        >
                            {subtitle}
                        </span>
                    )}

                    {bullets && bullets.length > 0 && (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 10,
                            }}
                        >
                            {bullets.slice(0, 5).map((b) => (
                                <div
                                    key={`${b.tag}:${b.text}`}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 28,
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            width: 92,
                                            fontSize: 20,
                                            fontWeight: 700,
                                            letterSpacing: "0.12em",
                                            textTransform: "uppercase",
                                            color:
                                                b.tag === "Added"
                                                    ? SUCCESS_COLOR
                                                    : ACCENT_COLOR,
                                        }}
                                    >
                                        {b.tag}
                                    </div>
                                    <span
                                        style={{
                                            display: "flex",
                                            fontSize: 32,
                                            fontWeight: 500,
                                            color: INK_COLOR,
                                        }}
                                    >
                                        {b.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 28,
                    position: "absolute",
                    bottom: 60,
                }}
            >
                <Logo
                    style={{
                        height: 72,
                        width: "auto",
                        color: "#fff",
                    }}
                />
                <span
                    style={{
                        fontSize: 32,
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        color: INK_COLOR,
                    }}
                >
                    Synaptic Simulations
                </span>
            </div>
        </div>
    );
}
