import { useState, useEffect } from 'react';
import { ChartElement } from "./ChartElement.tsx";

export function MonthAverageStore() {
    interface Data {
        timestamp: number;
        temperature: number;
        humidity: number;
    }

    const [data, setData] = useState<Data[]>([]);
    const [monthSelected, setMonthSelected] = useState<string>('January');
    let tempInMonth = [2, 3, 2, 5, 2, 4, 2, 2, 6, 7, 9];
    let humidInMonth = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

    const [dayInMonth, setDayInMonth] = useState<number[]>([]);

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

    useEffect(() => {
        const date = new Date();
        const year = date.getFullYear();
        const monthIndex = getMonthIndex(monthSelected);
        const days = daysInMonth(monthIndex, year);
        const daysArray = Array.from({ length: days }, (_, i) => i + 1);
        setDayInMonth(daysArray);
    }, [monthSelected]);

    function getMonthIndex(month: string): number {
        const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months.indexOf(month);
    }

    function daysInMonth(month: number, year: number): number {
        return new Date(year, month + 1, 0).getDate();
    }

    const monthSelect = (month: string) => {
        setMonthSelected(month);
    };

    return (
        <>
            <ChartElement monthNames={dayInMonth} temperatureAverages={tempInMonth}
                          humidityAverages={tempInMonth} monthSelect={monthSelect} />
        </>
    );
}

export default MonthAverageStore;
