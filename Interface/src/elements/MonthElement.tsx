import { useEffect, useState } from 'react';

interface Data {
    avg_temperature: number;
    avg_humidity: number;
    date: string;
}
export default function MonthElement({ monthSelected }: MonthElementProps) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [data, setData] = useState<Data[]>([]);

    useEffect(() => {
        const url = `http://192.168.1.66:3000/rpc/avg_date?delta=month&date=eq.2024-0${monthSelected}-01`;
        fetch(url)
            .then(response => response.json())
            .then((apiData: Data[]) => {
                setData(apiData);
                console.log(apiData);
            })
            .catch(e => {
                console.error('Une erreur s\'est produite:', e);
            });
    }, [monthSelected]);

    return (
        <>
            {data.map(d => d.avg_humidity)}
            {data.map(d => d.avg_temperature)}

        </>
    );
}
