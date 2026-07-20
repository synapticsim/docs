import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Logo } from "@/components/logo";

export function baseOptions(): BaseLayoutProps {
    return {
        nav: {
            title: (
                <span className="flex items-center gap-2.5">
                    <Logo className="h-9 w-auto" />
                    <span className="font-semibold tracking-tight text-fd-foreground">
                        Synaptic Simulations
                    </span>
                </span>
            ),
        },
    };
}
