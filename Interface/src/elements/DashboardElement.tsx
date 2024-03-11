import { useEffect, useState } from 'react';
import CircularElementData from "./CircularElementData.tsx";
import MonthlyAverageStore from "./MonthlyAverageStore.tsx";
import CardElement from "@/elements/CardElement.tsx";
import { ChartElement } from "@/elements/ChartElement.tsx";
import MonthAverageStore from "@/elements/MonthAverageStore.tsx";

export default function DashboardElement() {
    interface Data {
        timestamp: number;
        temperature: number;
        humidity: number;
    }

    const d = new Date();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [monthSelected, setMonthSelected] = useState<string>(monthNames[d.getMonth()]);

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [data, setData] = useState<Data[]>([]);
    const [dateRange, setDateRange] = useState<string[]>([]);
    const [humidityAverages, setHumidityAverages] = useState<number[]>([]);
    const [temperatureAverages, setTemperatureAverages] = useState<number[]>([]);

    useEffect(() => {
        fetchData();
        calculateDateRange();
    }, [startDate, endDate]);

    useEffect(() => {
        calculateAverages();
    }, [data, dateRange]);

    const fetchData = () => {
        let url = "http://192.168.1.66:3000/seed";
        if (startDate && endDate) {
            const startDateISO = startDate.toISOString().split('T')[0];
            const endDateISO = endDate.toISOString().split('T')[0];
            url += `?order=timestamp&and=(timestamp.gt.${startDateISO},timestamp.lt.${endDateISO})`
        }
        fetch(url)
            .then(response => response.json())
            .then(apiData => {
                setData(apiData);
                console.log(apiData);
            })
            .catch(error => console.error('Erreur lors de la récupération des données de l\'API :', error));
    };

    const calculateDateRange = () => {
        if (startDate && endDate) {
            const dates: string[] = [];
            const start = new Date(startDate);

            while (start <= endDate) {
                dates.push(start.toISOString().split('T')[0]);
                start.setDate(start.getDate() + 1);
            }
            setDateRange(dates);
        }
    }

    const calculateAverages = () => {
        if (data.length === 0 || dateRange.length === 0) return;

        const tempAverages: number[] = new Array(dateRange.length).fill(0);
        const humAverages: number[] = new Array(dateRange.length).fill(0);


        dateRange.forEach((date, index) => {
            const entriesForDay = data.filter(item => item.timestamp.includes(date));
            const totalTemperature = entriesForDay.reduce((number, data) => number + data.temperature, 0);
            const totalHumidity = entriesForDay.reduce((number, data) => number + data.humidity, 0);

            tempAverages[index] = totalTemperature / entriesForDay.length;
            humAverages[index] = totalHumidity / entriesForDay.length;
        });

        setTemperatureAverages(tempAverages);
        setHumidityAverages(humAverages);
    }


    const handleMonthClick = (month: string) => {
        setMonthSelected(month);
    };

    return (
        <>
            <div className="col-span-2">
                <nav className="fixed w-full top-0 start-0">
                    <div className="max-w-screen-xl mx-auto">
                        <div className="flex justify-center p-4">
                            <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 font-medium rounded-lg bg-blue-50">
                                {monthNames.map(month => (
                                    <li className="block py-2 px-3 text-black rounded"
                                        key={month}
                                        onClick={() => handleMonthClick(month)}>
                                        {month}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="flex justify-center text-center align-middle mt-12 gap-6">
                <div>
                    <input className="bg-white h-12 pl-10 pr-8 w-80 shadow-lg rounded-xl " type="date"
                           value={startDate ? startDate.toISOString().split('T')[0] : ''}
                           onChange={e => setStartDate(new Date(e.target.value))}/>
                </div>

                <div>
                    <input className="bg-white h-12 pl-10 pr-8 w-80 shadow-lg rounded-xl " type="date"
                           value={endDate ? endDate.toISOString().split('T')[0] : ''}
                           onChange={e => setEndDate(new Date(e.target.value))}/>
                </div>
            </div>

            <div>
                <CircularElementData dateRange={ `${startDate ? startDate.toDateString() : ''} to ${endDate ? endDate.toDateString() : ''}`} month={monthSelected} data={data}/>
                <CardElement
                    description={`${startDate ? startDate.toDateString() : ''} to ${endDate ? endDate.toDateString() : ''}`}
                    theme="Chart"
                    element={<ChartElement monthNames={dateRange.slice(0, -1)} humidityAverages={humidityAverages}
                                           temperatureAverages={temperatureAverages}/>}
                />
                <CardElement element={ <MonthAverageStore select={monthSelected}/>} theme={"monthly chart"} description={monthSelected}/>

                <CardElement element={<MonthlyAverageStore />} theme={"2024"} description={"Monthly chart"}/>




            </div>
        </>
    )
}
