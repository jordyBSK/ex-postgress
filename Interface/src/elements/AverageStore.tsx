import { ChartElement } from "./ChartElement.tsx";
import { useEffect, useState } from "react";

interface Data {
    avg_temperature: number;
    avg_humidity: number;
    date: string;
}

export function AverageStore({ precision, beginning, end }: { precision: string; beginning: string; end: string; }) {
    const [data, setData] = useState<Data[]>([]);

    useEffect(() => {
        const url = `http://192.168.1.66:3000/rpc/avg_date?delta=${precision}&and=(date.gte.${beginning},date.lt.${end})`;
        fetch(url)
            .then(response => response.json())
            .then((apiData: Data[]) => {
                setData(apiData);
            })
            .catch(e => {
                console.error('Une erreur s\'est produite:', e);
            });
    }, []);

    // Function to format date string from API
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
    };

    return (
        <>
            <ChartElement
                humidityAverages={data.map(d => d.avg_humidity)}
                temperatureAverages={data.map(d => d.avg_temperature)}
                monthNames={data.map(d => formatDate(d.date))} // Format date here
            />
        </>
    );
}

export default AverageStore;
