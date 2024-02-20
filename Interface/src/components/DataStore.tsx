import CircularElement from "./CircularElement.tsx";
import {useEffect, useState} from "react";

export default function DataStore() {
    const [data, setData] = useState({ temperature: 0, humidity: 0, light: 0 });

    useEffect(() => {
        fetch('http://localhost:5174/index.php')
            .then(response => response.json())
            .then(apiData => {
                console.log('Données reçues:', apiData);
                setData({
                    temperature: apiData[1].temperature,
                    humidity: apiData[1].humidity,
                    light: apiData[1].light
                });
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    }, []);

    return (
        <div>
            <CircularElement data={data.temperature}/>
            <CircularElement data={data.humidity}/>
            <CircularElement data={data.light}/>
        </div>
    );
}
