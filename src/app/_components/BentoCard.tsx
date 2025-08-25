import { ReactNode } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type BentoCardProps = {
    title: string;
    description: string;
    cta: {
        label: string;
        href: string;
    };
    children?: ReactNode;
};

export function BentoCard({ title, description, cta, children }: BentoCardProps) {
    return (
        <div
            className="bg-card outline-2 outline-muted rounded-xl shadow-lg p-8 flex flex-row justify-center"
        >
            <div className="bento-cards-content grid grid-cols-1 gap-6 items-start">
                {/* Background / children (imagem ou qualquer conteúdo extra) */}
                <div className="rounded-xl w-full h-full overflow-hidden">{children}</div>

                {/* Conteúdo textual */}
                <div className="bento-cards-heading flex flex-col gap-3">
                    <h2 className="text-2xl font-semibold mb-2">{title}</h2>

                    <p className="text-base md:text-lg text-muted-foreground">
                        {description}
                    </p>

                    <Link
                        href={cta.href}
                        className={`${buttonVariants({
                            variant: "default",
                        })} w-full md:w-fit mt-3`}
                    >
                        {cta.label}
                    </Link>
                </div>
            </div>
        </div>
    );
}
