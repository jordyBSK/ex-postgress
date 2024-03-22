import {useEffect, useState} from 'react';
import CircularElementData from "./CircularElementData.tsx";
import MonthlyAverageStore, {AverageStore} from "./AverageStore.tsx";
import CardElement from "@/elements/CardElement.tsx";
import MonthAverageStore from "@/elements/MonthAverageStore.tsx";
import MonthElement from "@/elements/MonthElement.tsx";

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

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 60000);

        return () => clearInterval(interval);
    }, [startDate, endDate]);


    const fetchData = () => {
        fetch("http://192.168.1.66:3000/seed")
            .then(response => response.json())
            .then(apiData => {
                setData(apiData);
            })
            .catch(error => console.error('Erreur lors de la récupération des données de l\'API :', error));
    };


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

                    <div className="flex">
                        <div className="w-1/2">
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
                        <div className="w-1/2">
                            <MonthElement monthSelected={d.getMonth()}/>
                        </div>
                    </div>
                    <div className="flex gap-8 mb-12">
                        <div className="w-1/2">
                            {startDate && endDate ?
                                <CardElement
                                    theme={`${startDate ? startDate.toDateString() : ''} to ${endDate ? endDate.toDateString() : ''}`}
                                    element={<MonthlyAverageStore precision={'day'} beginning={startDate.toDateString()}
                                                                  end={endDate.toDateString()}/>}
                                /> : ""
                            }
                        </div>
                        <div className="w-1/2">
                            <CardElement element={<MonthAverageStore select={monthSelected}/>}
                                         theme={`${monthSelected} Chart`}/>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <AverageStore precision={'month'} beginning={'2024-01-01'} end={'2025-01-01'}/>
                </div>
            </div>
        </>
    )
}