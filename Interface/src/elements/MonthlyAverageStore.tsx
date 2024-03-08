import { useEffect } from 'react';
import { ChartElement } from "./ChartElement.tsx";
import MonthAverageStore from "./MonthAverageStore.tsx";
import CardElement from "./CardElement.tsx";

interface Data {
    temperature: number;
    humidity: number;
    timestamp: number;
}
export function MonthlyAverageStore({month, data}:{month:string, data: Data[]}) {

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthlyData: { [key: string]: { temperature: number[]; humidity: number[] } } = {};
    const humidityAverages: number[] = [];
    const temperatureAverages: number[] = [];

    useEffect(() => {
        initializeMonthlyData();
        calculateMonthlyAverages();
    }, [data]);


    function initializeMonthlyData() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        for (let year = 2024; year <= currentYear; year++) {
            for (let month = 1; month <= 12; month++) {
                const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
                monthlyData[monthKey] = { temperature: [], humidity: [] };
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
            const temperatureAvg = monthlyData[month].temperature.reduce((acc, val) => acc + val, 0) / monthlyData[month].temperature.length;
            const humidityAvg = monthlyData[month].humidity.reduce((acc, val) => acc + val, 0) / monthlyData[month].humidity.length;
            humidityAverages.push(humidityAvg);
            temperatureAverages.push(temperatureAvg);
        }
    }

    return (
        <>
            <CardElement description={month} theme={"Chart"} element={<MonthAverageStore select={month}/>}/>
            <CardElement  description="2024" theme="yearly chart" element={<ChartElement humidityAverages={humidityAverages} temperatureAverages={temperatureAverages} monthNames={monthNames}/> }/>
        </>
    );
}

export default MonthlyAverageStore;
