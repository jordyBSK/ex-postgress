import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import zoomPlugin from 'chartjs-plugin-zoom';
Chart.register(zoomPlugin);

export function ChartElement({ monthNames, temperatureAverages, humidityAverages}: { monthNames: string[] | number[], temperatureAverages: number[] | number, humidityAverages: number[] | number}) {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart>();

    useEffect(() => {
        if (chartRef && chartRef.current) {
            const ctx = chartRef.current.getContext("2d");
            if (ctx) {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                const labels = Array.isArray(monthNames) ? monthNames : [monthNames];
                const temperatures = Array.isArray(temperatureAverages) ? temperatureAverages : [temperatureAverages];
                const humidities = Array.isArray(humidityAverages) ? humidityAverages : [humidityAverages];

                chartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Temperature Averages',
                            data: temperatures,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            tension: 0.1
                        }, {
                            label: 'Humidity Averages',
                            data: humidities,
                            borderColor: 'rgb(54, 162, 235)',
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            tension: 0.1
                        }]
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
                                        enabled: true,
                                    },
                                    pinch: {
                                        enabled: true
                                    },
                                    mode: 'xy',
                                }
                            }
                        }
                    }
                });
            }
        }
    }, [monthNames, temperatureAverages, humidityAverages]);

    return (
        <div>
            <canvas ref={chartRef} className="h-64"></canvas>

        </div>
    );
}
