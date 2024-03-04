import { useEffect, useState } from "react";
import CircularElement from "./CircularElement.tsx";
import CardElement from "./cardElement.tsx";
import {useLinkClickHandler} from "react-router-dom";

interface Data {
    device_id: number;
    timestamp: number;
    temperature: number;
    humidity: number;
    light: number;
}

export default function CircularElementData({select}:{select:string}) {

    const [data, setData] = useState<Data[]>([]);
    const [averageTemperature, setAverageTemperature] = useState<string>("0.00");
    const [averageHumidity, setAverageHumidity] = useState<string>("0.00");
    const [lastTemperature, setLastTemperature] = useState<number>(0)
    const [lastHumidity, setLastHumidity] = useState<number>(0)
    select = "March"
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        fetch('http://192.168.1.66:3000/data')
            .then(response => response.json())
            .then((apiData: Data[]) => {
                setData(apiData);

                const monthData = apiData.filter(item => {
                    const date = new Date(item.timestamp);
                    return date.getMonth() === monthNames.indexOf(select);
                });

                const totalTemperature = monthData.reduce((number, data) => number + data.temperature, 0);
                const avgTemp = (totalTemperature / monthData.length).toFixed(2);
                setAverageTemperature(avgTemp);

                const totalHumidity = monthData.reduce((number, data) => number + data.humidity, 0);
                const avgHumidity = (totalHumidity / monthData.length).toFixed(2);
                setAverageHumidity(avgHumidity);

                const lastDataTemperature = monthData[monthData.length - 1].temperature;
                setLastTemperature(lastDataTemperature);

                const lastDataHumidity = monthData[monthData.length - 1].humidity;
                setLastHumidity(lastDataHumidity);
            })
            .catch(error => {
                console.error('error ', error);
            });
    }, []);


    return (
        <div>
            <div className="flex gap-6">
                <CardElement element={<CircularElement color={"red"} data={averageTemperature} unity={"°C"} />}
                             theme={select + " " + "Temperature Average"} />
                <CardElement element={<CircularElement color={"blue"} data={averageHumidity} unity={"%"} />}
                             theme={select + " " + "January Humidity Average"} />
                <CardElement element={<CircularElement color={"blue"} data={lastHumidity} unity={"%"}/>}
                             theme={"Humidity"}/>
                <CardElement element={<CircularElement color={"red"} data={lastTemperature} unity={"°C"}/>}
                             theme={"Temperature"}/>
            </div>
        </div>
    );
}
