import CircularElementData from "./CircularElementData.tsx";
import MonthlyAverageStore from "./MonthlyAverageStore.tsx";
import {useEffect, useState} from "react";


export default function DashboardElement() {
    const d = new Date();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [monthSelected, setMonthSelected] = useState<string>(monthNames[d.getMonth()]);

    interface Data {
        timestamp: number;
        temperature: number;
        humidity: number;
        id: string;
    }

    const [data, setData] = useState<Data[]>([]);

    useEffect(() => {
        fetch('http://192.168.1.66:3000/esp')
            .then(response => response.json())
            .then((apiData: Data[]) => {
                setData(apiData);
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    }, []);

    const handleMonthClick = (month: string) => {
        setMonthSelected(month);
    };
    return (
        <>
            <div className="col-span-2">
                <nav
                    className="fixed w-full top-0 start-0 ">
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

            <div>
                <CircularElementData month={monthSelected}/>
                <MonthlyAverageStore month={monthSelected} data={data}/>
            </div>

        </>
    )
}


