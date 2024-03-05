import CircularElementData from "./CircularElementData.tsx";
import MonthlyAverageStore from "./MonthlyAverageStore.tsx";
import {useState} from "react";


export default function dashboardElement() {
    const [monthSelected, setMonthSelected] = useState<string>("January");

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    const handleMonthClick = (month: string) => {
        setMonthSelected(month);
    };
    return (
        <>
            <div className="grid grid-cols-3 items-center gap-8 mb-12">
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
            </div>
            <CircularElementData month={monthSelected}/>
            <MonthlyAverageStore month={monthSelected}/>
        </>
    )
}


