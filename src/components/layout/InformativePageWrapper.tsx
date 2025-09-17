import { Fragment, PropsWithChildren } from 'react';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { LinkType } from '@/@types/link';
import { Footer } from './Footer';

type InformativePageWrapperProps = PropsWithChildren & {
	breadcrumbLinks: LinkType[];
};

export function InformativePageWrapper({
	children,
	breadcrumbLinks,
}: InformativePageWrapperProps) {
	return (
		<main className="px-custom">
			<Breadcrumb className="pt-4 pb-6">
				<BreadcrumbList>
					{breadcrumbLinks.map((item, idx) => {
						const isLast = idx === breadcrumbLinks.length - 1;
						return (
							<Fragment key={item.title}>
								<BreadcrumbItem>
									<BreadcrumbLink
										href={item.url}
										className={`${
											isLast
												? 'text-foreground'
												: 'text-muted-foreground'
										}`}
									>
										{item.title}
									</BreadcrumbLink>
								</BreadcrumbItem>

								{idx < breadcrumbLinks.length - 1 && (
									<BreadcrumbSeparator />
								)}
							</Fragment>
						);
					})}
				</BreadcrumbList>
			</Breadcrumb>

			{children}
		</main>
	);
}
