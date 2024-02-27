import { useEffect, useRef } from 'react';
import Chart from "chart.js/auto";
import zoomPlugin from 'chartjs-plugin-zoom';
Chart.register(zoomPlugin);
export function ChartElement({ monthNames, temperatureAverages, humidityAverages }: { monthNames: string[], temperatureAverages: number[], humidityAverages: number[] }) {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart>();

    useEffect(() => {
        if (chartRef && chartRef.current) {
            const ctx = chartRef.current.getContext("2d");
            if (ctx) {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                chartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: monthNames,
                        datasets: [
                            {
                                label: 'Temperature',
                                data: temperatureAverages,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1
                            },
                            {
                                label: 'Humidity',
                                data: humidityAverages,
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1
                            }
                        ]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                        plugins: {
                            zoom: {
                                zoom: {
                                    wheel: {
                                        enabled: true
                                    },
                                    pinch: {
                                        enabled: true
                                    },
                                    mode: 'y',
                                }
                            }
                        }
                    }
                });
            }
        }
    }, [chartRef, monthNames, temperatureAverages, humidityAverages]);

    return (
        <div>
            <canvas ref={chartRef} width="800" height="400"></canvas>
        </div>
    );
}
