import {Card, CardHeader, CardTitle} from '@/components/ui/card';
import {useEffect, useState} from 'react';

interface Data {
    avg_temperature: number;
    avg_humidity: number;
    date: string;
}

export default function MonthElement({month, year}: { year: number, month: number }) {
    const [data, setData] = useState<Data[]>([]);

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[month]
    useEffect(() => {
        const url = `http://192.168.1.66:3000/rpc/avg_date?delta=month&date=eq.${year}-0${month}-01`;
        fetch(url)
            .then(response => response.json())
            .then((apiData: Data[]) => {
                setData(apiData);
                console.log(url);
            })
            .catch(e => {
                console.error('Une erreur s\'est produite:', e);
            });
    }, [month]);

    return (
        <Card className="bg-white p-4 dark:bg-slate-800 w-full">
            <div className="flex">
                <CardHeader>
                    <CardTitle className="text-gray-500 dark:text-white">{monthName} average</CardTitle>
                </CardHeader>
                <div className="mt-12 text-center flex">
                    <div>
                        <text className="font-bold text-2xl mr-16 dark:text-white">
                            {data.length > 0 && data.map(d => d.avg_humidity.toFixed(2))}°C
                        </text>
                    </div>
                    <div>
                        <text className="font-bold text-2xl mr-16 dark:text-white">
                            {data.length > 0 && data.map(d => d.avg_temperature.toFixed(2))}%
                        </text>
                    </div>
                </div>
            </div>
        </Card>
    );
}
