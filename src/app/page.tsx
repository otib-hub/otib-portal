import { LocaleInitializer } from "@/components/layout/LocaleInitializer";

import { ChevronDown } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { ibmPlexSerif } from "@/styles/fonts";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { HomeBentoGrid } from "./_components/HomeBentoGrid";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("app.Home");
	return {
		title: t("page-title"),
	};
}

export default async function Home() {
	const t = await getTranslations("app.Home");

	return (
		<>
			<main className="px-custom w-full flex flex-col items-start py-6 gap-8 md:py-8 md:gap-12 mb-10 md:mb-6">
				<LocaleInitializer />

				<section id="home-hero" className="w-full py-22 md:py-32">
					<div
						id="home-hero-heading"
						className="flex flex-col items-center justify-center gap-6 text-center"
					>
						<Heading.H1 className="font-medium! text-4xl md:text-5xl">
							{`${t("heading.title").split("\n")[0]} `}
							<span
								className={`${ibmPlexSerif.className} font-semibold italic bg-gradient-to-r from-chart-2 to-chart-5 bg-clip-text text-transparent`}
							>
								{t("heading.title").split("\n")[1]}
							</span>
						</Heading.H1>

						<p className="text-base md:text-lg lg:max-w-[72%] text-secondary-foreground">
							{t("heading.description")}
						</p>

						<Link
							title={t("buttons.about")}
							className={`${buttonVariants({
								variant: "link",
							})} text-base md:text-lg`}
							href="/about"
						>
							{t("buttons.about")}
						</Link>
					</div>
				</section>

				<ChevronDown className="text-muted-foreground size-8 lg:size-10 place-self-center animate-bounce" />

				<section
					id="home-bento-cards"
					className="w-full grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-8 md:gap-8"
				>
					<HomeBentoGrid t={t} />
				</section>
			</main>

			<Footer />
		</>
	);
}
