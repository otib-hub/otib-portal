/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, {
	ComponentProps,
	useEffect,
	useRef,
	useCallback,
	useMemo,
} from 'react';
import * as echarts from 'echarts/core';
import { MapChart } from 'echarts/charts';
import { TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { ECharts } from 'echarts/core';

// Registra componentes uma única vez
echarts.use([MapChart, TooltipComponent, CanvasRenderer]);

export interface IbiapabaMapProps extends ComponentProps<'div'> {
	selected?: string;
	onChangeSelected?: (city: string | undefined) => void;
}

export const IBIAPABA_CITIES = [
	'Ibiapina',
	'Carnaubal',
	'Croatá',
	'Tianguá',
	'Ubajara',
	'Ipu',
	'Guaraciaba do Norte',
	'São Benedito',
	'Viçosa do Ceará',
] as const;

// Cache para armazenar dados carregados
const mapDataCache = new Map();
let isMapRegistered = false;

// Função para obter cor primária (com cache)
let primaryColorCache: string | null = null;
const getPrimaryColor = (): string => {
	if (primaryColorCache) return primaryColorCache;

	primaryColorCache =
		getComputedStyle(document.documentElement).getPropertyValue(
			'--color-primary'
		) || '#006edd';
	return primaryColorCache;
};

// Memoiza as opções base do mapa
const createBaseOptions = () => ({
	tooltip: {
		trigger: 'item',
		formatter: '{b}',
		confine: true,
		transitionDuration: 0.2,
	},
	animation: false,
	series: [
		{
			name: 'Municípios da Serra da Ibiapaba',
			type: 'map',
			map: 'ibiapaba',
			roam: false,
			selectedMode: 'single',
			// Otimizações de renderização
			silent: false,
			itemStyle: {
				areaColor: '#e0ffff',
				borderColor: '#999',
				borderWidth: 0.5,
			},
			emphasis: {
				itemStyle: {
					label: false,
					areaColor: getPrimaryColor(),
					borderColor: '#333',
					borderWidth: 1,
				},
				label: { show: false },
			},
			select: {
				itemStyle: {
					areaColor: getPrimaryColor(),
					borderColor: '#333',
					borderWidth: 1,
				},
				label: { show: false },
			},
		},
	],
});

export default function IbiapabaMap({
	selected,
	onChangeSelected,
}: IbiapabaMapProps) {
	const chartRef = useRef<HTMLDivElement>(null);
	const chartInstance = useRef<ECharts | null>(null);
	const resizeObserverRef = useRef<ResizeObserver | null>(null);
	const isInitializedRef = useRef(false);

	// Memoiza os dados do mapa baseado na seleção
	const mapData = useMemo(
		() =>
			IBIAPABA_CITIES.map((name) => ({
				name,
				value: 1,
				selected: selected === name,
			})),
		[selected]
	);

	// Handler de clique memoizado
	const handleClick = useCallback(
		(params: any) => {
			if (params.componentType === 'series' && params.name) {
				const clickedCity = params.name;
				const newSelected =
					selected === clickedCity ? undefined : clickedCity;
				onChangeSelected?.(newSelected);
			}
		},
		[selected, onChangeSelected]
	);

	// Função de redimensionamento memoizada
	const handleResize = useCallback(() => {
		if (chartInstance.current) {
			chartInstance.current.resize();
		}
	}, []);

	// Carregamento assíncrono otimizado do mapa
	useEffect(() => {
		let isMounted = true;

		const loadMapData = async () => {
			if (!chartRef.current || isInitializedRef.current) return;

			try {
				// Verifica se já temos os dados em cache
				if (!mapDataCache.has('ibiapaba-geojson')) {
					const [{ feature }, ibiapaba_map_raw] = await Promise.all([
						import('topojson-client'),
						import('#/json/ibiapaba-map.json'),
					]);

					const topojson = ibiapaba_map_raw as any;
					const objectKey = Object.keys(ibiapaba_map_raw.objects)[0];
					const geojson = feature(topojson, topojson.objects[objectKey]);

					mapDataCache.set('ibiapaba-geojson', geojson);
				}

				if (!isMounted) return;

				// Registra o mapa apenas uma vez
				if (!isMapRegistered) {
					const geojson = mapDataCache.get('ibiapaba-geojson');
					echarts.registerMap('ibiapaba', geojson as any);
					isMapRegistered = true;
				}

				// Inicializa o chart
				const chart = echarts.init(chartRef.current, undefined, {
					renderer: 'canvas',
				});

				chartInstance.current = chart;

				// Configurações iniciais
				const baseOptions = createBaseOptions();
				chart.setOption({
					...baseOptions,
					series: [{ ...baseOptions.series[0], data: mapData }],
				});

				// Setup do ResizeObserver
				resizeObserverRef.current = new ResizeObserver(handleResize);
				resizeObserverRef.current.observe(chartRef.current);

				// Event listener de clique
				chart.on('click', handleClick);

				isInitializedRef.current = true;
			} catch (error) {
				console.error('Erro ao carregar o mapa:', error);
			}
		};

		loadMapData();

		return () => {
			isMounted = false;

			// Cleanup
			if (chartInstance.current) {
				chartInstance.current.off('click', handleClick);
				chartInstance.current.dispose();
				chartInstance.current = null;
			}

			if (resizeObserverRef.current) {
				resizeObserverRef.current.disconnect();
				resizeObserverRef.current = null;
			}

			isInitializedRef.current = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Inicialização única

	// Atualiza apenas os dados quando a seleção muda
	useEffect(() => {
		if (!chartInstance.current || !isInitializedRef.current) return;

		// Atualização otimizada - apenas os dados da série
		chartInstance.current.setOption(
			{ series: [{ data: mapData }] },
			{ silent: true }
		);
	}, [mapData]);

	// Atualiza event listeners quando as props mudam
	useEffect(() => {
		if (!chartInstance.current || !isInitializedRef.current) return;

		chartInstance.current.off('click');
		chartInstance.current.on('click', handleClick);

		return () => {
			chartInstance.current?.off('click');
		};
	}, [handleClick]);

	return (
		<div
			ref={chartRef}
			style={{ width: '100%', height: '100%' }}
			className='min-h-[480px] lg:min-h-[564px]'
		/>
	);
}
