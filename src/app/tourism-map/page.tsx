'use client';

import { Heading } from '@/components/ui/heading';
import { Footer } from '@/components/layout/Footer';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { InteractiveMapCard } from '@/components/fragments/InteractiveMapCard';
import { useState } from 'react';

export default function TourismMap() {
	const [selectedCity, setSelectedCity] = useState<string | undefined>(
		undefined,
	);

	return (
		<>
			{/* TODO: falta traduzir bredcrumb */}
			<Breadcrumb className="px-custom py-3 border-y-2 border-muted dark:border-muted/70">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/otib">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Mapa do Turismo</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<main className="mt-6 bg-background relative px-custom shadow-2xl rounded-2xl w-full flex flex-col items-start justify-start gap-10">
				<Heading.H1>Mapa do Turismo</Heading.H1>
				<InteractiveMapCard
					selectedCity={selectedCity}
					setSelectedCity={setSelectedCity}
				/>
			</main>

			<Footer />
		</>
	);
}
