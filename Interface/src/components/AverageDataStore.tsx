import {useEffect, useState} from "react";
import CircularElement from "./CircularElement.tsx";

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
    const [averageLight, setAverageLight] = useState<string>("0.00");

    useEffect(() => {
        fetch('http://192.168.1.66:3000/data')
            .then(response => response.json())
            .then((apiData: Data[]) => {
                setData(apiData);


                const totalTemperature = apiData.reduce((acc, data) => acc + data.temperature, 0);
                const avgTemp = (totalTemperature / apiData.length).toFixed(2);
                setAverageTemperature(avgTemp);

                const totalHumidity = apiData.reduce((acc, data) => acc + data.humidity, 0);
                const avgHumidity = (totalHumidity / apiData.length).toFixed(2);
                setAverageHumidity(avgHumidity);

                const totalLight = apiData.reduce((acc, data) => acc + data.light, 0);
                const avgLight = (totalLight / apiData.length).toFixed(2);
                setAverageLight(avgLight);
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    }, []);

    useEffect(() => {
    }, [averageTemperature]);

    useEffect(() => {
    }, [averageHumidity]);

    useEffect(() => {
    }, [averageLight]);

    return (
        <div>
            <CircularElement data={averageTemperature}/>
            <CircularElement data={averageLight}/>
            <CircularElement data={averageHumidity}/>
        </div>
    );
}
