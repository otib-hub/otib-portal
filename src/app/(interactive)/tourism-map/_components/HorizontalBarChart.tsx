'use client';

import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	XAxis,
	YAxis,
} from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { buttonVariants } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/layout/use-mobile';

export const description = 'A bar chart with a custom label';

type HorizontalBarChartProps = {
	title: string;
	description?: string;
	sourceUrl: string;
	chartData: { name: string; value: number }[];
	className?: string;
};

const chartConfig = {
	value: {
		label: 'Quantidade',
		color: 'var(--chart-5)',
	},
	label: { color: 'var(--chart-5)' },
} satisfies ChartConfig;

export default function HorizontalBarChart({
	chartData,
	title,
	description,
	sourceUrl,
	className,
}: HorizontalBarChartProps) {
	const isMobile = useIsMobile();
	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle className="leading-normal">{title}</CardTitle>
				{description && (
					<CardDescription>{description}</CardDescription>
				)}
			</CardHeader>
			<CardContent className="h-full overflow-x-auto">
				<ChartContainer
					className="h-full w-fit lg:w-full"
					config={chartConfig}
				>
					<BarChart
						className="min-h-full"
						accessibilityLayer
						data={chartData}
						layout="vertical"
					>
						<CartesianGrid horizontal={false} />
						<YAxis
							dataKey="name"
							type="category"
							tickLine={false}
							axisLine={false}
							width={96}
						/>
						<XAxis dataKey="value" type="number" />
						<ChartTooltip
							content={<ChartTooltipContent hideIndicator />}
						/>
						<Bar
							dataKey="value"
							layout="vertical"
							fill="var(--color-value)"
							radius={4}
						>
							<LabelList
								dataKey="value"
								position="right"
								offset={8}
								className="fill-muted-foreground"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>

			<CardFooter className="w-full flex flex-col items-start gap-2 text-sm">
				<div className="w-full flex gap-2 items-center justify-start line-clamp-1">
					Fonte:{' '}
					<a
						className={buttonVariants({
							variant: 'inline-link',
							className: 'text-base! md:text-base!',
						})}
						href={sourceUrl}
					>
						{isMobile ? 'Ver fonte' : sourceUrl}
						{/* traduzir "Fonte" e "Ver fonte" */}
					</a>
				</div>
			</CardFooter>
		</Card>
	);
}
