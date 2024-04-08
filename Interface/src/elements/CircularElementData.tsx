import { useState, useEffect } from "react";
import CircularElement from "./CircularElement.tsx";
import CardElement from "./CardElement.tsx";

interface Data {
    date: number;
    avg_temperature: number;
    avg_humidity: number;
}

export default function CircularElementData({ month, data, dateRange }: {
    month: string,
    data: Data[],
    dateRange: string
}) {
    const [lastTemperature, setLastTemperature] = useState<number>(0);
    const [lastHumidity, setLastHumidity] = useState<number>(0);

    useEffect(() => {
        if (data.length > 0) {
            const lastData = data[data.length - 1];

            const roundedTemperature = lastData.avg_temperature.toFixed(2);
            const roundedHumidity = lastData.avg_humidity.toFixed(2);

            setLastTemperature(roundedTemperature);
            setLastHumidity(roundedHumidity);
        }
    }, [data]);

    return (
        <div className="flex gap-4 mb-6 mt-6">
            <div className="w-80">
                <CardElement
                    element={<CircularElement color={"orange"} data={lastTemperature} unity={"°C"} />}
                    theme="Temperature"
                />
            </div>

            <div className="w-80">
                <CardElement
                    element={<CircularElement color={"blue"} data={lastHumidity} unity={"%"} />}
                    theme="Humidity"
                />
            </div>
        </div>
    );
}
