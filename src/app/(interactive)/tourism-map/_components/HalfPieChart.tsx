'use client';

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
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

export const description = 'A radial chart with part/total relationship';

type HalfPieChartProps = {
	title: string;
	description?: string;
	sourceUrl: string;
	chartData: {
		name: string;
		part: number;
		total: number;
	};
	partLabel?: string;
	totalLabel?: string;
	className?: string;
};

export default function HalfPieChart({
	title,
	description,
	chartData,
	partLabel = 'Parte',
	totalLabel = 'Total',
	sourceUrl,
	className,
}: HalfPieChartProps) {
	const isMobile = useIsMobile();

	const percentage = Math.round((chartData.part / chartData.total) * 100);
	const chartConfig = {
		total: {
			label: totalLabel,
			color: 'var(--color-muted)',
		},
		part: {
			label: partLabel,
			color: 'var(--chart-5)',
		},
	} satisfies ChartConfig;

	const formattedData = [
		{
			name: chartData.name,
			total: chartData.total,
			part: chartData.part,
		},
	];

	return (
		<Card className={`flex flex-col ${className || ''}`}>
			<CardHeader className="items-start">
				<CardTitle className="leading-normal">{title}</CardTitle>
				{description && (
					<CardDescription className="text-center">
						{description}
					</CardDescription>
				)}
			</CardHeader>
			<CardContent className="flex flex-1 items-center pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto h-full max-w-full"
				>
					<RadialBarChart
						data={formattedData}
						endAngle={180}
						innerRadius={90}
						outerRadius={160}
					>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<PolarRadiusAxis
							tick={false}
							tickLine={false}
							axisLine={false}
						>
							<Label
								content={({ viewBox }) => {
									if (
										viewBox &&
										'cx' in viewBox &&
										'cy' in viewBox
									) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
											>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) - 16}
													className="fill-foreground text-2xl font-bold"
												>
													{chartData.part.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 4}
													className="fill-muted-foreground"
												>
													{'/ '}
													{chartData.total.toLocaleString()}{' '}
													({percentage}%)
												</tspan>
											</text>
										);
									}
								}}
							/>
						</PolarRadiusAxis>

						<RadialBar
							dataKey="total"
							stackId="a"
							cornerRadius={5}
							fill="var(--color-muted)"
							className="stroke-transparent stroke-2"
						/>
						<RadialBar
							dataKey="part"
							fill="var(--color-chart-5)"
							stackId="a"
							cornerRadius={5}
							className="stroke-transparent stroke-2"
						/>
					</RadialBarChart>
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
