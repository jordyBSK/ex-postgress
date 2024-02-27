import { useEffect, useState } from "react";
import CircularElement from "./CircularElement.tsx";
import CardElement from "./cardElement.tsx";

interface Data {
    device_id: number;
    timestamp: number;
    temperature: number;
    humidity: number;
    light: number;
}

export default function AverageDataStore() {
    const [data, setData] = useState<Data[]>([]);
    const [averageTemperature, setAverageTemperature] = useState<string>("0.00");
    const [averageHumidity, setAverageHumidity] = useState<string>("0.00");

    useEffect(() => {
        const fetchData = () => {
            fetch('http://192.168.1.66:3000/data')
                .then(response => response.json())
                .then((apiData: Data[]) => {
                    setData(apiData);
                    const totalTemperature = apiData.reduce((number, data) => number + data.temperature, 0);
                    const avgTemp = (totalTemperature / apiData.length).toFixed(2);
                    setAverageTemperature(avgTemp);
                    const totalHumidity = apiData.reduce((number, data) => number + data.humidity, 0);
                    const avgHumidity = (totalHumidity / apiData.length).toFixed(2);
                    setAverageHumidity(avgHumidity);
                })
                .catch(error => {
                    console.error('error ', error);
                });
        };

        fetchData();

        const interval = setInterval(fetchData, 30000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex gap-6">
            <CardElement element={<CircularElement color={"red"} data={averageTemperature} unity={"°C"} />} theme={"Temperature Average"}/>
            <CardElement element={<CircularElement color={"blue"} data={averageHumidity} unity={"%"} />} theme={"Humidity Average"}/>
        </div>
    );
}
