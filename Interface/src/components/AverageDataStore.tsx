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
        fetch('http://localhost:5174/index.php')
            .then(response => response.json())
            .then((apiData: Data[]) => {
                console.log('Données reçues:', apiData);
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
        console.log("Moyenne de température :", averageTemperature);
    }, [averageTemperature]);

    useEffect(() => {
        console.log("Moyenne d'humidité :", averageHumidity);
    }, [averageHumidity]);

    useEffect(() => {
        console.log("Moyenne de lumière :", averageLight);
    }, [averageLight]);

    return (
        <div>
            <CircularElement data={averageTemperature}/>
            <CircularElement data={averageLight}/>
            <CircularElement data={averageHumidity}/>
        </div>
    );
}