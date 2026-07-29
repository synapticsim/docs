import type { ReactNode } from "react";
import { Logo } from "./logo";

// this site's own theme (src/app/global.css `.dark` block): near-black
// background, muted-violet glow, ecl-editor-matched accent.
const GLOW_COLOR = "rgba(167, 139, 250, 0.16)";
const INK_COLOR = "#ebe9f5";
const MUTED_COLOR = "#b7b7c4";

interface OgTemplateProps {
    title: ReactNode;
    subtitle?: ReactNode;
}

export default function OgTemplate({ title, subtitle }: OgTemplateProps) {
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
