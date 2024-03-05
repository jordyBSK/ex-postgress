import { useState, useEffect } from 'react';
import { ChartElement } from "./ChartElement.tsx";

export function MonthAverageStore({select}:{select:string}) {
    interface Data {
        timestamp: string;
        temperature: number;
        humidity: number;
    }

    const [data, setData] = useState<Data[]>([]);
    const monthSelected = select;

    const [dailyAverages, setDailyAverages] = useState<{ temperature: number; humidity: number; }[]>([]);

    useEffect(() => {
        fetch('http://192.168.1.66:3000/data')
            .then(response => response.json())
            .then((apiData: Data[]) => {
                setData(apiData);
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    }, []);

    function getMonthIndex(month: string): number {
        const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months.indexOf(month);
    }

    function daysInMonth(month: number, year: number): number {
        return new Date(year, month + 1, 0).getDate();
    }



    useEffect(() => {
        if (data.length > 0) {
            const filteredData = data.filter(entry => {
                const entryDate = new Date(entry.timestamp);
                return entryDate.getMonth() === getMonthIndex(monthSelected);
            });

            const dailyAverages: { temperature: number; humidity: number; }[] = [];


            const monthIndex = getMonthIndex(monthSelected);
            const dayInMonth = daysInMonth(monthIndex, 2024)

            for (let i = 1; i <= dayInMonth; i++) {
                const entriesForDay = filteredData.filter(entry => {
                    const entryDate = new Date(entry.timestamp);
                    return entryDate.getDate() === i;
                });

                if (entriesForDay.length > 0) {
                    const totalTemperature = entriesForDay.reduce((number, data) => number + data.temperature, 0);
                    const totalHumidity = entriesForDay.reduce((number, data) => number + data.humidity, 0);
                    const averageTemperature = totalTemperature / entriesForDay.length;
                    const averageHumidity = totalHumidity / entriesForDay.length;

                    dailyAverages.push({ temperature: averageTemperature, humidity: averageHumidity });
                } else {
                    dailyAverages.push({ temperature: 0, humidity: 0 });
                }
            }

            setDailyAverages(dailyAverages);
        }
    }, [data, monthSelected]);


    return (
        <>
            <ChartElement monthNames={dailyAverages.map((_, index) => index + 1)}
                          temperatureAverages={dailyAverages.map(entry => entry.temperature)}
                          humidityAverages={dailyAverages.map(entry => entry.humidity)} />
        </>
    );
}

export default MonthAverageStore;
