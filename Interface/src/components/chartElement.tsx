import {useEffect, useState, useRef} from "react";
import { Chart } from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);
export default function ChartElement({call}: {
    call: (data: {
        "device_id": number,
        "timestamp": number,
        "temperature": number,
        "humidity": number,
        "light": number
    }[]) => [string[], { "temperature": number[], "humidity": number[], "light": number[] }]
}) {

    const [dateNames, setDateNames] = useState<string[]>([]);
    const [monthlyAverages, setMonthlyAverages] = useState<{
        "temperature": number[],
        "humidity": number[],
        "light": number[]
    }>({"temperature": [], "humidity": [], "light": []});

    const chartContainer = useRef<HTMLCanvasElement>(null);
    const [chart, setChart] = useState<Chart<"line", number[], string>>();

    useEffect(() => {
        fetch('http://localhost:5175/index.php')
            .then(response => response.json())
            .then(data => {
                const [names, monthAverages] = call(data);
                setDateNames(names);
                setMonthlyAverages(monthAverages);

                if (chartContainer.current && names.length > 0) {
                    const ctx = chartContainer.current.getContext('2d');
                    if (ctx) {
                        const newChart = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: names,
                                datasets: [
                                    {
                                        label: 'Temperature',
                                        data: monthAverages.temperature,
                                        borderColor: 'rgb(255, 99, 132)',
                                        tension: 0.1
                                    },
                                    {
                                        label: 'Humidity',
                                        data: monthAverages.humidity,
                                        borderColor: 'rgb(54, 162, 235)',
                                        tension: 0.1
                                    },
                                    {
                                        label: 'Light',
                                        data: monthAverages.light,
                                        borderColor: 'rgb(255, 205, 86)',
                                        tension: 0.1
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
                                            }, pinch: {
                                                enabled: true
                                            },
                                            mode:'x',
                                        }
                                    }
                                }
                            }
                        });
                        setChart(newChart);
                    }
                }
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });

        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, [call, chartContainer, chart]);

    return (
        <canvas ref={chartContainer}></canvas>
    );
}
