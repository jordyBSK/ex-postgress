import {useEffect, useRef, useState} from "react";
import Chart from "chart.js/auto";
import zoomPlugin from 'chartjs-plugin-zoom';
Chart.register(zoomPlugin);

export function ChartElement({ monthNames, temperatureAverages, humidityAverages, monthSelect }: { monthNames: string[] | number[], temperatureAverages: number[] | number, humidityAverages: number[] | number, monthSelect: (month: string) => void }) {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart>();
    const [selectedMonth, setSelectedMonth] = useState<number[]>([]);

    useEffect(() => {
        if (chartRef && chartRef.current) {
            const ctx = chartRef.current.getContext("2d");
            if (ctx) {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                const labels = Array.isArray(monthNames) ? monthNames : [monthNames];
                chartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Temperature Averages',
                            data: temperatureAverages,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            tension: 0.1
                        }, {
                            label: 'Humidity Averages',
                            data: humidityAverages,
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
                        }, onClick: function (event, elements) {
                            if (elements.length > 0) {
                                const clickedElement = elements[0];
                                const index = clickedElement.index;
                                const monthClicked: string | number = labels[index];
                                setSelectedMonth(monthClicked);
                                monthSelect(monthClicked.toString());
                            }
                        }
                    }
                });
            }
        }

    }, [monthNames, temperatureAverages, humidityAverages]);

    return (
        <div>
            <canvas ref={chartRef} width="600" height="400"></canvas>
        </div>
    );
}
