import { CityTouristicData } from '@/@types/city-touristic-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartPieIcon, Table2Icon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { cityNameMap } from './CityHighlightsCarousel';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { InformationBox } from './InformationBox';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/layout/use-mobile';

const HorizontalBarChart = dynamic(() => import('./HorizontalBarChart'), {
	ssr: false,
	loading: () => (
		<Skeleton className="w-full min-h-128 md:col-span-1 lg:col-span-2 rounded-2xl flex items-center justify-center bg-card">
			<Spinner />
		</Skeleton>
	),
});

const HalfPieChart = dynamic(() => import('./HalfPieChart'), {
	ssr: false,
	loading: () => (
		<Skeleton className="w-full min-h-128 md:col-span-1 rounded-2xl flex items-center justify-center bg-card">
			<Spinner />
		</Skeleton>
	),
});

type CityDataTabsProps = {
	city: string | undefined;
	cityTouristicData: CityTouristicData;
};

export function CityDataTabs({ city, cityTouristicData }: CityDataTabsProps) {
	const isMobile = useIsMobile();
	const chartAuxData = {
		// id 0 (total de empresas no cadastur) não deve contar no calculo
		totalEnterprisesInCity: cityTouristicData.companiesData
			.filter((item) => item.id > 1)
			.reduce((acc, item) => acc + item.value, 0),
		registeredInCadastur: cityTouristicData.companiesData[1].value,
	};

	const tabs = [
		{
			name: (
				<>
					<Table2Icon className="size-4.5" />
					Dados
				</>
			),
			value: 'Dados',
			content: (
				<div id="tab-1-wrapper" className="flex flex-col gap-6">
					<div
						id="tab-2-content"
						className="w-full h-full flex flex-col md:flex-row flex-wrap gap-4"
					>
						{cityTouristicData.companiesData.map((statistic) => {
							const maxValue = Math.max(
								...cityTouristicData.companiesData.map(
									(stat, idx) =>
										idx <= 1 ? 0 : Number(stat.value),
								),
							); // retorna o maior valor excluindo o total de empresas e empresas no cadastur

							return (
								<InformationBox
									key={statistic.id}
									title={statistic.name}
									className={
										statistic.id == 0 ||
										Number(statistic.value) === maxValue
											? 'md:basis-4/9'
											: 'md:basis-1/4'
									}
									isHighlighted={
										Number(statistic.value) === maxValue ||
										statistic.id === 0
									}
								>
									{statistic.value}
								</InformationBox>
							);
						})}
					</div>

					<span className="flex items-center flex-wrap font-bold text-base md:text-lg gap-2">
						<span>Fonte:</span>
						<Link
							href={
								'https://nupreds.ifce.edu.br/otib-boletins/boletim01-2025.pdf'
							}
							className={buttonVariants({
								variant: 'inline-link',
							})}
						>
							{isMobile
								? ' Ver fonte'
								: ' https://nupreds.ifce.edu.br/otib-boletins/boletim01-2025.pdf'}
						</Link>
					</span>
				</div>
			),
		},
		{
			name: (
				<>
					<ChartPieIcon className="size-4.5" />
					Visualizações
				</>
			),
			value: 'visualizacoes',
			content: (
				<div id="tab-2-wrapper" className="flex flex-col gap-6">
					<div
						id="tab-2-content"
						className="md:max-h-128 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
					>
						<HorizontalBarChart
							className="w-full min-h-128 md:col-span-1 lg:col-span-2"
							title={`Quantidade de Empresas do Trade Turístico
									por categoria em ${
										city
											? cityNameMap[
													city as keyof typeof cityNameMap
											  ]
											: `toda a Serra da Ibiapaba (${chartAuxData.totalEnterprisesInCity})`
									}`}
							sourceUrl="https://nupreds.ifce.edu.br/otib-boletins/boletim01-2025.pdf"
							chartData={[
								...cityTouristicData.companiesData.filter(
									(item) => item.id !== 0 && item.id !== 1,
								),
							]}
						/>

						<HalfPieChart
							className="w-full min-h-128 md:col-span-1"
							title={`Quantidade de Empresas do Trade Turístico
									registadas no Cadastur em 
									${
										city
											? cityNameMap[
													city as keyof typeof cityNameMap
											  ]
											: `toda a Serra da Ibiapaba (${chartAuxData.totalEnterprisesInCity})`
									}`}
							chartData={{
								name: 'Registradas no Cadastur',
								part: chartAuxData.registeredInCadastur,
								total:
									chartAuxData.totalEnterprisesInCity -
									chartAuxData.registeredInCadastur,
							}}
							partLabel="Registradas no Cadastur"
							totalLabel="Todas"
							sourceUrl="https://nupreds.ifce.edu.br/otib-boletins/boletim01-2025.pdf"
						/>
					</div>
				</div>
			),
		},
	];

	return (
		<Tabs defaultValue={tabs[1].value} className="w-full h-fit">
			<TabsList className="w-full md:w-fit">
				{tabs.map((tab) => (
					<TabsTrigger
						className="flex-1"
						key={tab.value}
						value={tab.value}
					>
						<span className="inline-flex items-center justify-center gap-2">
							{tab.name}
						</span>
					</TabsTrigger>
				))}
			</TabsList>
			{tabs.map((tab) => (
				<TabsContent
					key={tab.value}
					value={tab.value}
					className="p-6 bg-muted border border-muted rounded-lg"
				>
					{tab.content}
				</TabsContent>
			))}
		</Tabs>
	);
}
