import { useEffect, useRef } from 'react';
import Chart from "chart.js/auto";

export function ChartElement({ monthNames, temperatureAverages, humidityAverages }: { monthNames: string[], temperatureAverages: number[], humidityAverages: number[] }) {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (monthNames.length > 0) {
            const ctx = chartRef.current?.getContext('2d');
            if (ctx) {
                const myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: monthNames,
                        datasets: [
                            {
                                label: 'Temperature',
                                data: temperatureAverages,
                                borderColor: 'red',
                                backgroundColor: 'rgba(255, 0, 0, 0.1)'
                            },
                            {
                                label: 'Humidity',
                                data: humidityAverages,
                                borderColor: 'blue',
                                backgroundColor: 'rgba(0, 0, 255, 0.1)'
                            },
                        ]
                    },
                    options: {
                        scales: {
                            x: {
                                type: 'linear',
                                ticks: {
                                    stepSize: 1
                                }
                            },
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });

                return () => {
                    myChart.destroy();
                };
            }
        }
    }, [monthNames, temperatureAverages, humidityAverages]);
    return (
        <div>
            <canvas ref={chartRef} width="800" height="400"></canvas>
        </div>
    );
}
