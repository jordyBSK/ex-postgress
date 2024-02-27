import {useState, useEffect} from 'react';
import {ChartElement} from "./ChartElement.tsx";

// import Chart from 'chart.js/auto';

export function MonthlyAverageStore() {
    interface Data {
        timestamp: number;
        temperature: number;
        humidity: number;
    }

    const [data, setData] = useState<Data[]>([]);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthlyData: { [key: string]: { temperature: number[]; humidity: number[] } } = {};
    const humidityAverages: number[] = []
    const temperatureAverages: number[] = []

    useEffect(() => {
        fetch('http://192.168.1.66:3000/data')
            .then(response => response.json())
            .then((apiData: Data[]) => {
                setData(apiData);
                console.log(apiData)
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    }, []);

    function initializeMonthlyData() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        for (let year = 2023; year <= currentYear; year++) {
            for (let month = 1; month <= 12; month++) {
                const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
                monthlyData[monthKey] = {temperature: [], humidity: []};
            }
        }

        data.forEach(entry => {
            const date = new Date(entry.timestamp);
            const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

            monthlyData[month].temperature.push(entry.temperature);
            monthlyData[month].humidity.push(entry.humidity);
        });
    }


    function calculateMonthlyAverages() {
        for (const month in monthlyData) {
            const [year, monthNum] = month.split('-');
            const monthName = monthNames[parseInt(monthNum, 10) - 1];

            const temperatureAvg = monthlyData[month].temperature.reduce((acc, val) => acc + val, 0) / monthlyData[month].temperature.length;
            const humidityAvg = monthlyData[month].humidity.reduce((acc, val) => acc + val, 0) / monthlyData[month].humidity.length;

            console.log(`Month: ${monthName} ${year}`);
            console.log('Temperature Average:', temperatureAvg);
            console.log('Humidity Average:', humidityAvg);
            humidityAverages.push(humidityAvg)
            temperatureAverages.push(temperatureAvg)
        }
    }

    useEffect(() => {
        initializeMonthlyData();
        calculateMonthlyAverages();
    }, [data]);


    return (
        <div>
            <ChartElement humidityAverages={humidityAverages} temperatureAverages={temperatureAverages} monthNames={monthNames}/>
            {temperatureAverages}
        </div>
    );
}

export default MonthlyAverageStore;