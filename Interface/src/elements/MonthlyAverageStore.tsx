import { ChartElement } from "./ChartElement.tsx";

import {useEffect, useState} from "react";

interface Data {
    avg_temperature: number;
    avg_humidity: number;
    date: number;
}
export function MonthlyAverageStore({precision, beginning, end}:{precision: string, beginning: string, end: string}) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [data, setData] = useState<Data[]>([]);

    useEffect(() => {
        const url = `http://192.168.1.66:3000/rpc/daily_avg?prec=${precision}&and=(date.gte.${beginning},date.lt.${end})`;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then((apiData: Data[]) => {
                setData(apiData);
            })
            .catch(e => {
                console.error('Une erreur s\'est produite:', e);
            });
    }, []);

    return (
        <>
            <ChartElement humidityAverages={data.map(d => d.avg_humidity)} temperatureAverages={data.map(d => d.avg_temperature)} monthNames={monthNames}/>
        </>
    );
}

export default MonthlyAverageStore;
