import {useState, useEffect} from "react";
import CircularElement from "./CircularElement.tsx";
import CardElement from "./CardElement.tsx";

interface Data {
    timestamp: number;
    temperature: number;
    humidity: number;
}

export default function CircularElementData({month, data,darkTheme}: {
    month: string,
    data: Data[],
    dateRange: string,
    darkTheme:boolean
}) {
    const [averageTemperature, setAverageTemperature] = useState<string>("0.00");
    const [averageHumidity, setAverageHumidity] = useState<string>("0.00");
    const [lastTemperature, setLastTemperature] = useState<number>(0);
    const [lastHumidity, setLastHumidity] = useState<number>(0);

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        if (data.length > 0) {
            const monthData = data.filter(item => {
                const date = new Date(item.timestamp);
                return date.getMonth() === monthNames.indexOf(month);
            });

            if (monthData.length > 0) {
                const totalTemperature = monthData.reduce((number, data) => {
                    return number + data.temperature;
                }, 0);

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
    }, [month, data, monthNames]);


    return (
        <div className="flex gap-10 mb-6 mt-6">
            <div className="w-80">
                <CardElement darkTheme={darkTheme} element={<CircularElement darkTheme={darkTheme} color={"blue"} data={lastHumidity} unity={"%"}/>}
                             theme="Humidity"/>
            </div>

            <div className="w-80">
                <CardElement darkTheme={darkTheme} element={<CircularElement darkTheme={darkTheme} color={"red"} data={lastTemperature} unity={"°C"}/>}
                             theme="Temperature"/>
            </div>
        </div>
    );
}
