import { LinkType } from '@/@types/link';
import { InformativePageWrapper } from '@/components/layout/InformativePageWrapper';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { Heading } from '@/components/ui/heading';
import {
	DatabaseZapIcon,
	FileTextIcon,
	GraduationCapIcon,
	ScrollTextIcon,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { LatestProductionsCarousel } from './_components/LatestProductionsCarousel';

export default async function ResourcesPage() {
	const t = await getTranslations('');
	const breadcrumbs: LinkType[] = [
		{ title: t('meta.home.title'), url: '/otib' },
		{ title: t('meta.productions.title') },
	];
	const categories = [
		{
			id: 0,
			title: t('app.productions.section#categories.categories.0.title'),
			description: t(
				'app.productions.section#categories.categories.0.description',
			),
			icon: <FileTextIcon />,
		},
		{
			id: 1,
			title: t('app.productions.section#categories.categories.1.title'),
			description: t(
				'app.productions.section#categories.categories.1.description',
			),
			icon: <DatabaseZapIcon />,
		},
		{
			id: 2,
			title: t('app.productions.section#categories.categories.2.title'),
			description: t(
				'app.productions.section#categories.categories.2.description',
			),
			icon: <ScrollTextIcon />,
		},
		{
			id: 3,
			title: t('app.productions.section#categories.categories.3.title'),
			description: t(
				'app.productions.section#categories.categories.3.description',
			),
			icon: <GraduationCapIcon />,
		},
	];

	return (
		<InformativePageWrapper breadcrumbLinks={breadcrumbs}>
			<div className="flex flex-col gap-6 lg:gap-8">
				<section
					id="productions-heading"
					className="flex flex-col mb-10 md:mb-6 text-base md:text-lg space-y-6 lg:space-y-8"
				>
					<Heading.H1>
						{t('app.productions.section#heading.h1')}
					</Heading.H1>
					<p>{t('app.productions.section#heading.p.0')}</p>
					<p>{t('app.productions.section#heading.p.0')}</p>
				</section>

				<section
					id="productions-last-published"
					className="w-full flex flex-col gap-6"
				>
					<Heading.H2>
						{t('app.productions.section#last-published.h2')}
					</Heading.H2>
					<LatestProductionsCarousel />
				</section>

				<section
					id="productions-categories"
					className="w-full flex flex-col gap-6"
				>
					<Heading.H2>
						{t('app.productions.section#categories.h2')}
					</Heading.H2>

					<div className="w-full flex flex-wrap gap-6">
						{categories.map((category) => (
							<Card
								key={category.id}
								className="flex-1 min-w-40 hover:opacity-50 transition-opacity cursor-pointer"
							>
								<CardContent>{category.icon}</CardContent>
								<CardHeader>
									<CardTitle>{category.title}</CardTitle>
									<CardDescription>
										{category.description}
									</CardDescription>
								</CardHeader>
							</Card>
						))}
					</div>
				</section>
			</div>
		</InformativePageWrapper>
	);
}
