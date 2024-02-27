import {useState, useEffect} from 'react';
import {ChartElement} from "./ChartElement.tsx";

export function MonthAverageStore() {
    interface Data {
        timestamp: number;
        temperature: number;
        humidity: number;
    }

    const [data, setData] = useState<Data[]>([]);
    const [monthSelected, setMonthSelected] = useState<string>('January');
    let temperatureAverage = 0;
    let humidityAverage = 0

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

    function getAverageOfMonthSelected() {
        if (!monthSelected) {
            console.error("Month not selected.");
            return;
        }

        const selectedMonthData = data.filter(entry => {
            const numberMonth = new Date(entry.timestamp).toLocaleString('en-US', {month: 'long'});
            return numberMonth === monthSelected;
        });

        const temperatureSum = selectedMonthData.reduce((acc, entry) => acc + entry.temperature, 0);
        const humiditySum = selectedMonthData.reduce((acc, entry) => acc + entry.humidity, 0);
        temperatureAverage = temperatureSum / selectedMonthData.length;
        humidityAverage = humiditySum / selectedMonthData.length;

        console.log(`Average Temperature for ${monthSelected}: ${temperatureAverage}`);
        console.log(`Average Humidity for ${monthSelected}: ${humidityAverage}`);
    }

    useEffect(() => {
        getAverageOfMonthSelected();
    }, [data, monthSelected]);

    const monthSelect = (month: string) => {
        setMonthSelected(month);
        console.log(monthSelected);
    };

    return (
        <>
            <ChartElement
                monthNames={monthSelected}
                temperatureAverages={temperatureAverage}
                humidityAverages={humidityAverage}
                monthSelect={monthSelect}
            />
        </>
    );
}

export default MonthAverageStore;
