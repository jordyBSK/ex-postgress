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

        const interval = setInterval(() => {
            fetchData();
            calculateDateRange();
        }, 60000);

        return () => clearInterval(interval);
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
            const entriesForDay = data.filter(item => {
                const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
                return itemDate === date;
            });

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

    useEffect(() => {
        setStartDate(null);
        setEndDate(null)
    }, [monthSelected]);


    return (
        <>
            <div className={`w-3/4 justify-center align-middle justify-items-center `}>
                <div className="col-span-2">
                    <nav className="fixed w-full top-0 start-0">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="flex justify-center p-4">
                                <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 font-medium rounded-lg bg-white dark:bg-slate-800">
                                    {monthNames.map(month => (
                                        <li className="block py-2 px-3 text-black dark:text-white rounded"
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

                <div>
                    <div className="flex text-center align-middle mt-12 gap-4">
                        <div>
                            <input
                                className="bg-white font-bold h-12 pl-10 pr-8 w-80 shadow-lg rounded-xl dark:bg-slate-800 dark:text-white"

                                type="date"
                                value={startDate ? startDate.toISOString().split('T')[0] : ''}
                                onChange={e => setStartDate(new Date(e.target.value))}/>
                        </div>

                        <div>
                            <input
                                className="bg-white font-bold h-12 pl-10 pr-8 w-80 shadow-lg rounded-xl dark:bg-slate-800 dark:text-white"
                                type="date"
                                value={endDate ? endDate.toISOString().split('T')[0] : ''}
                                onChange={e => setEndDate(new Date(e.target.value))}/>
                        </div>
                    </div>

                    <div className="">
                        {startDate && endDate ? (
                            <CircularElementData
                                                 dateRange={`${startDate.toDateString()} to ${endDate.toDateString()}`}
                                                 month={monthSelected}
                                                 data={data}
                            />
                        ) : (
                            <CircularElementData
                                dateRange={monthSelected}
                                month={monthSelected}
                                data={data}
                            />
                        )}
                    </div>
                    <div className="flex gap-8 mb-12">
                        <div className="w-1/2">
                            <CardElement
                                theme={`${startDate ? startDate.toDateString() : ''} to ${endDate ? endDate.toDateString() : ''}`}
                                element={<ChartElement monthNames={dateRange.slice(0, -1)}
                                                       humidityAverages={humidityAverages}
                                                       temperatureAverages={temperatureAverages}/>}
                            />
                        </div>
                        <div className="w-1/2">
                            <CardElement element={<MonthAverageStore select={monthSelected}/>}
                                         theme={`${monthSelected} Chart`}/>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <MonthlyAverageStore precision={'month'} beginning={'2024-01-01'} end={'2025-01-01'}/>
                </div>
            </div>
        </>
    )
}