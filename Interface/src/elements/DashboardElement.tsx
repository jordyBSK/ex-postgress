import React, { useEffect, useState } from 'react';
import CircularElementData from "./CircularElementData.tsx";
import MonthlyAverageStore from "./MonthlyAverageStore.tsx";
import DateRangeElement from "@/elements/DateRangeElement.tsx";

export default function DashboardElement() {
    const d = new Date();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [monthSelected, setMonthSelected] = useState<string>(monthNames[d.getMonth()]);

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [dateRange, setDateRange] = useState<string[]>([]);
    const [data, setData] = useState<Data[]>([]);

    useEffect(() => {
        const fetchData = () => {
            if (startDate && endDate) {
                const startDateISO = startDate.toISOString().split('T')[0];
                const endDateISO = endDate.toISOString().split('T')[0];

                fetch(`http://192.168.1.66:3000/data?order=timestamp&and=(timestamp.gt.${startDateISO},timestamp.lt.${endDateISO})`)
                    .then(response => response.json())
                    .then(apiData => {
                        console.log('Données de l\'API :', apiData);
                        setData(apiData);
                    })
                    .catch(error => console.error('Erreur lors de la récupération des données de l\'API :', error));
            }
            else {
                fetch(`http://192.168.1.66:3000/data`)
                .then(response => response.json())
                .then(apiData => {
                    console.log('Données de l\'API :', apiData);
                    setData(apiData);
                })
                .catch(error => console.error('Erreur lors de la récupération des données de l\'API :', error));

            }
        };

        fetchData();

    }, [startDate, endDate]);

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

            <div className="mt-96">
                <label>Date de début :</label>
                <input type="date" value={startDate ? startDate.toISOString().split('T')[0] : ''}
                       onChange={e => setStartDate(new Date(e.target.value))}/>
            </div>
            <div>
                <label>Date de fin :</label>
                <input type="date" value={endDate ? endDate.toISOString().split('T')[0] : ''}
                       onChange={e => setEndDate(new Date(e.target.value))}/>
            </div>

            <div>
                <CircularElementData month={monthSelected} data={data}/>
                <MonthlyAverageStore month={monthSelected} data={data}/>
            </div>
        </>
    )
}
