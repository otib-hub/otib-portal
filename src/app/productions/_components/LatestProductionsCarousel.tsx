'use client';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';
import {
	BadgeQuestionMarkIcon,
	DatabaseZapIcon,
	FileTextIcon,
	PaperclipIcon,
	UniversityIcon,
} from 'lucide-react';
import Link from 'next/link';
import { latestProductions } from '#/json/latest-productions.json';
import { useLocale } from 'next-intl';

type Production = {
	id: number;
	type: string;
	publishedOn: string;
	url: string;
	data: {
		title: string;
		description: string;
	};
};

const getIconByResourceType = (type: string) => {
	switch (type) {
		case 'bulletin':
			return <FileTextIcon className="text-primary" />;
		case 'dataset':
			return <DatabaseZapIcon className="text-primary" />;
		case 'report':
			return <PaperclipIcon className="text-primary" />;
		case 'study':
			return <UniversityIcon className="text-primary" />;
		default:
			return <BadgeQuestionMarkIcon className="text-primary" />;
	}
};

export function LatestProductionsCarousel() {
	const locale: 'pt-BR' | 'en' | 'es' = useLocale();
	const productions: Production[] = latestProductions.map((production) => {
		return {
			...production,
			data: {
				title: production.data[locale].title,
				description: production.data[locale].description,
			},
		};
	});

	return (
		<Carousel opts={{ align: 'start' }} className="w-full">
			<CarouselContent>
				{productions.map((item) => (
					<CarouselItem
						key={item.id}
						className="w-full basis-1/2 md:basis-1/3 lg:basis-1/4"
					>
						<Link href={item.url} target="_blank" rel="noopener">
							<Card
								title="Clique/toque para abrir"
								className="h-full gap-2 cursor-pointer hover:opacity-50 transition-opacity"
							>
								<CardHeader className="flex items-center gap-2">
									<CardTitle className="flex flex-col gap-4 text-start leading-normal">
										{getIconByResourceType(item.type)}
										{item.data.title}
									</CardTitle>
								</CardHeader>

								<CardContent className="h-full flex flex-col items-start justify-start gap-4">
									<span className="text-base text-muted-foreground line-clamp-2">
										{item.data.description}
									</span>
								</CardContent>

								<CardFooter className="mt-2">
									<span className="text-sm text-muted-foreground">
										{new Date(
											item.publishedOn,
										).toLocaleString('pt-BR', {
											dateStyle: 'short',
										})}
									</span>
								</CardFooter>
							</Card>
						</Link>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}
