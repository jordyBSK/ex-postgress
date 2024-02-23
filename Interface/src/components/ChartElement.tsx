import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const ChartElement = () => {
    interface Data {
        device_id: number;
        timestamp: number;
        temperature: number;
        humidity: number;
        light: number;
    }

    const [data, setData] = useState<Data[]>([]);
    const [temperatures, setTemperatures] = useState<number[]>([])
    const [lights, setLights] = useState<number[]>([])
    const [humidities, setHumiditys] = useState<number[]>([])
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthlyData: { [key: string]: { temperature: number[]; humidity: number[]; light: number[] } } = {};


    useEffect(() => {
        fetch('http://localhost:5174/index.php')
            .then(response => response.json())
            .then((apiData: Data[]) => {
                setData(apiData);


            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    }, []);
    function initializeMonthlyData() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        for (let year = 2024; year <= currentYear; year++) {
            for (let month = 1; month <= 12; month++) {
                const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
                monthlyData[monthKey] = { temperature: [], humidity: [], light: [] };
            }
        }

        data.forEach(entry => {
            const date = new Date(entry.timestamp);
            const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

            monthlyData[month].temperature.push(entry.temperature);
            monthlyData[month].humidity.push(entry.humidity);
            monthlyData[month].light.push(entry.light);
        });
    }

    function calculateMonthlyAverages() {
        for (const month in monthlyData) {
            const [year, monthNum] = month.split('-');
            const monthName = monthNames[parseInt(monthNum, 10) - 1];

            const temperatureAvg = monthlyData[month].temperature.reduce((acc, val) => acc + val, 0) / monthlyData[month].temperature.length;
            const humidityAvg = monthlyData[month].humidity.reduce((acc, val) => acc + val, 0) / monthlyData[month].humidity.length;
            const lightAvg = monthlyData[month].light.reduce((acc, val) => acc + val, 0) / monthlyData[month].light.length;

            console.log(`Month: ${monthName} ${year}`);
            console.log('Temperature Average:', temperatureAvg);
            console.log('Humidity Average:', humidityAvg);
            console.log('Light Average:', lightAvg);

        }
    }

    initializeMonthlyData();
    calculateMonthlyAverages();



    // useEffect(() => {
    //     if (data.length > 0) {
    //         const months = [
    //             'January', 'February', 'March', 'April', 'May', 'June',
    //             'July', 'August', 'September', 'October', 'November', 'December'
    //         ];
    //
    //
    //         const ctx = chartRef.current.getContext('2d');
    //         const myChart = new Chart(ctx, {
    //             type: 'line',
    //             data: {
    //                 labels: months,
    //                 datasets: [
    //                     {
    //                         label: 'Temperature',
    //                         data: temperatures,
    //                         borderColor: 'red',
    //                         backgroundColor: 'rgba(255, 0, 0, 0.1)'
    //                     },
    //                     {
    //                         label: 'Humidity',
    //                         data: humidities,
    //                         borderColor: 'blue',
    //                         backgroundColor: 'rgba(0, 0, 255, 0.1)'
    //                     },
    //                     {
    //                         label: 'Light',
    //                         data: lights,
    //                         borderColor: 'green',
    //                         backgroundColor: 'rgba(0, 255, 0, 0.1)'
    //                     }
    //                 ]
    //             },
    //             options: {
    //                 scales: {
    //                     x: {
    //                         type: 'linear',
    //                         ticks: {
    //                             stepSize: 1
    //                         }
    //                     },
    //                     y: {
    //                         beginAtZero: true
    //                     }
    //                 }
    //             }
    //         });
    //
    //         return () => {
    //             myChart.destroy();
    //         };
    //     }
    // }, [data, humidities, lights, temperatures]);

    return (
        <div>
           {/*<canvas ref={chartRef} width="800" height="400"></canvas>*/}
        </div>
    );
};

export default ChartElement;
