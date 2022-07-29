import { useState, useEffect } from 'react';

export type StatItem = {
	stat: string;
	value: number;
};

export type StatsChartProps = {
	id: string;
	stats: StatItem[];
};

const am5 = window.am5;
const am5xy = window.am5xy;

function StatsChart({ id, stats }: StatsChartProps) {
	const [chartYAxis, setChartYAxis] = useState<{
		data: { setAll: (data: StatItem[]) => void };
	} | null>(null);

	const [chartSerie, setChartSerie] = useState<{
		data: { setAll: (data: StatItem[]) => void };
	} | null>(null);

	useEffect(() => {
		const chartRoot = am5.Root.new(id);

		const chart = chartRoot.container.children.push(am5xy.XYChart.new(chartRoot, {}));

		const yAxis = chart.yAxes.push(
			am5xy.CategoryAxis.new(chartRoot, {
				renderer: am5xy.AxisRendererY.new(chartRoot, {}),
				categoryField: 'stat',
			})
		);

		const xAxis = chart.xAxes.push(
			am5xy.ValueAxis.new(chartRoot, {
				renderer: am5xy.AxisRendererX.new(chartRoot, {}),
			})
		);

		const serie = chart.series.push(
			am5xy.ColumnSeries.new(chartRoot, {
				xAxis,
				yAxis,
				categoryYField: 'stat',
				valueXField: 'value',
			})
		);

		setChartYAxis(yAxis);
		setChartSerie(serie);

		return () => {
			chartRoot.dispose();
		};
	}, [id]);

	useEffect(() => {
		if (chartSerie && chartYAxis) {
			chartSerie.data.setAll(stats);
			chartYAxis.data.setAll(stats);
		}
	}, [stats, chartSerie, chartYAxis]);

	return <div id={id} style={{ width: '100%', height: `${stats.length * 65}px` }} />;
}

export default StatsChart;
