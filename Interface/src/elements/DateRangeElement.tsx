import { useEffect, useState } from 'react';

interface Data {
    temperature: number;
    humidity: number;
    timestamp: number;
}

export function DateRangeElement({ data }: { data: Data[] }) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);


    useEffect(() => {

    }, [startDate, endDate, data]);


    return (
        <>
            <div>
                <label>Start Date:</label>
                <input type="date" value={startDate ? startDate.toISOString().split('T')[0] : ''} onChange={e => setStartDate(new Date(e.target.value))} />
            </div>
            <div>
                <label>End Date:</label>
                <input type="date" value={endDate ? endDate.toISOString().split('T')[0] : ''} onChange={e => setEndDate(new Date(e.target.value))} />
            </div>
        </>
    );
}

export default DateRangeElement;
