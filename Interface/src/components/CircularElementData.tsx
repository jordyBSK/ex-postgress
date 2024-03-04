import {useState, useEffect} from "react";
import CircularElement from "./CircularElement.tsx";
import CardElement from "./cardElement.tsx";

interface Data {
    device_id: number;
    timestamp: number;
    temperature: number;
    humidity: number;
    light: number;
}

export default function CircularElementData() {
    const [data, setData] = useState<Data[]>([]);
    const [averageTemperature, setAverageTemperature] = useState<string>("0.00");
    const [averageHumidity, setAverageHumidity] = useState<string>("0.00");
    const [lastTemperature, setLastTemperature] = useState<number>(0);
    const [lastHumidity, setLastHumidity] = useState<number>(0);
    const [monthSelected, setMonthSelected] = useState<string>("January");

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        const fetchData = () => {
            fetch('http://192.168.1.66:3000/data')
                .then(response => response.json())
                .then(apiData => setData(apiData))
                .catch(error => console.error('error ', error));
        };

        fetchData();


        const interval = setInterval(fetchData, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const monthData = data.filter(item => {
                const date = new Date(item.timestamp);
                return date.getMonth() === monthNames.indexOf(monthSelected);
            });

            if (monthData.length > 0) {
                const totalTemperature = monthData.reduce((number, data) => {
                    return number + data.temperature;}, 0);

                const dataSize = monthData.reduce((number, data) => {
                    return data.temperature == null ? number : number + 1;

                }, 0);
                const avgTemp = (totalTemperature / dataSize).toFixed(2);
                setAverageTemperature(avgTemp);

                const totalHumidity = monthData.reduce((number, data) => {
                    return number + data.humidity;
                }, 0);
                const avgHumidity = (totalHumidity / monthData.length).toFixed(2);
                setAverageHumidity(avgHumidity);

                const lastDataTemperature = data[data.length - 1].temperature;
                setLastTemperature(lastDataTemperature);

                const lastDataHumidity = data[data.length - 1].humidity;
                setLastHumidity(lastDataHumidity);
            }
        }
    }, [monthSelected, data, monthNames]);

    const handleMonthClick = (month: string) => {
        setMonthSelected(month);
    };

    return (
        <div>
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
            <div className="flex gap-6">

                <CardElement element={<CircularElement color={"red"} data={averageTemperature} unity={"°C"}/>}
                             theme={`${monthSelected} Temperature Average`}/>
                <CardElement element={<CircularElement color={"blue"} data={averageHumidity} unity={"%"}/>}
                             theme={`${monthSelected} Humidity Average`}/>
                <CardElement element={<CircularElement color={"blue"} data={lastHumidity} unity={"%"}/>}
                             theme="Humidity"/>
                <CardElement element={<CircularElement color={"red"} data={lastTemperature} unity={"°C"}/>}
                             theme="Temperature"/>
            </div>
        </div>
    );
}
