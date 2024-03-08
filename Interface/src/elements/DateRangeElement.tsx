import { useEffect, useState } from 'react';
import { ChartElement } from "./ChartElement.tsx";
import CardElement from "./CardElement.tsx";

interface Data {
    temperature: number;
    humidity: number;
    timestamp: number;
}

export function DateRangeElement({ data }: { data: Data[] }) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [dateRange, setDateRange] = useState<string[]>([]);

    useEffect(() => {
        if (startDate && endDate) {
            generateDateRange();
        }
    }, [startDate, endDate, data]);

    function generateDateRange() {
        if (startDate && endDate) {
            const dates: string[] = [];
            const start = new Date(startDate);

            while (start <= endDate) {
                dates.push(start.toISOString().split('T')[0]);
                start.setDate(start.getDate() + 1);
            }
            setDateRange(dates);
        }
    }

    return (
        <>
            <div>
                <label>Date de début :</label>
                <input type="date" value={startDate ? startDate.toISOString().split('T')[0] : ''} onChange={e => setStartDate(new Date(e.target.value))} />
            </div>
            <div>
                <label>Date de fin :</label>
                <input type="date" value={endDate ? endDate.toISOString().split('T')[0] : ''} onChange={e => setEndDate(new Date(e.target.value))} />
            </div>
            {dateRange}
            <CardElement description="Moyenne mensuelle" theme="Chart" element={<ChartElement monthNames={dateRange} />} />
        </>
    );
}

export default DateRangeElement;
