import { useEffect, useRef, useState } from "react";
import { Chart } from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);

export default function ChartElement({ call }: {
    call: (data: {
        "device_id": number,
        "timestamp": number,
        "temperature": number,
        "humidity": number,
        "light": number
    }[]) => [string[] | number[], { "temperature": number[], "humidity": number[], "light": number[] }]
}) {

    const [dateNames, setDateNames] = useState<string[]>([]);
    const [monthlyAverages, setMonthlyAverages] = useState<{
        "temperature": number[],
        "humidity": number[],
        "light": number[]
    }>({ "temperature": [], "humidity": [], "light": [] });

    const [selectedMonth, setSelectedMonth] = useState<string>('');

    const chartContainer = useRef<HTMLCanvasElement>(null);
    const [chart, setChart] = useState<Chart<"line", number[], string>>();

    useEffect(() => {
        fetch('http://localhost:5174/index.php')
            .then(response => response.json())
            .then(data => {
                const [names, monthAverages] = call(data);
                setDateNames(names);
                setMonthlyAverages(monthAverages);
                setSelectedMonth(names[0]);

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
                                            mode: 'y',
                                        }
                                    }
                                },
                                onClick: function (event, elements) {
                                    if (elements.length > 0) {
                                        const clickedElement = elements[0];
                                        const index = clickedElement.index;
                                        const monthClicked = names[index];
                                        setSelectedMonth(monthClicked); // Mise à jour du mois sélectionné
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

    useEffect(() => {
        if (chart && monthlyAverages.temperature.length > 0 && selectedMonth !== '') {
            chart.data = {
                labels: dateNames,
                datasets: [
                    {
                        label: 'Temperature',
                        data: monthlyAverages.temperature,
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.1
                    },
                    {
                        label: 'Humidity',
                        data: monthlyAverages.humidity,
                        borderColor: 'rgb(54, 162, 235)',
                        tension: 0.1
                    },
                    {
                        label: 'Light',
                        data: monthlyAverages.light,
                        borderColor: 'rgb(255, 205, 86)',
                        tension: 0.1
                    }
                ]
            };
            chart.update();
        }
    }, [selectedMonth, monthlyAverages, dateNames, chart]);

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    return (
        <div>
            <canvas ref={chartContainer}></canvas>
            <div>
                <label>
                    <select value={selectedMonth} onChange={handleMonthChange}>
                        <option value="default">default</option>
                        {dateNames.map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );
}
