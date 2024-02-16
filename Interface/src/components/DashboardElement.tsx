import CircularDataElement from "./CircularDataElement.tsx"
import CardElement from "./cardElement.tsx";
import ChartElement from "./chartElement.tsx";


export default function dashboardElement() {

    function averageData(
        list: {
            "device_id": number,
            "timestamp": number,
            "temperature": number,
            "humidity": number,
            "light": number
        }[],
        call: (data: {
            "device_id": number,
            "timestamp": number,
            "temperature": number,
            "humidity": number,
            "light": number
        }) => number) {
        let out = 0

        for (const listElement of list) {
            out += call(listElement)
        }
        return out / list.length
    }

    function getMonthAverage(
        list: {
            "device_id": number,
            "timestamp": number,
            "temperature": number,
            "humidity": number,
            "light": number
        }[],
    ): [
        string[],
        { "temperature": number[], "humidity": number[], "light": number[] }
    ] {


        const monthAverages =
            {
                "temperature": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "humidity": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "light": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            };
        const monthCounts: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (const data of list) {
            const month = new Date(data.timestamp).getMonth();
            monthAverages.humidity[month] += data.humidity;
            monthAverages.temperature[month] += data.temperature;
            monthAverages.light[month] += data.light;
            monthCounts[month]++;
        }

        const monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        for (let i = 0; i < 12; i++) {
            if (monthCounts[i] !== 0) {
                monthAverages.humidity[i] /= monthCounts[i];
                monthAverages.temperature[i] /= monthCounts[i];
                monthAverages.light[i] /= monthCounts[i];
            }
        }

        console.log("bbb", monthAverages)

        return [monthNames, monthAverages];
    }


    return (
        <>
            <div className="flex justify-evenly gap-12">
                <div className="flex flex-col gap-y-2">
                    <CardElement theme={"Temperature average"} element={<CircularDataElement color="text-blue-500"
                                                               call={(data) => averageData(data, (data) => data.temperature)}/>}/>
                    <CardElement theme={"Last temperature data"} element={<CircularDataElement color="text-blue-500"
                                                               call={(data) => data[data.length - 1].temperature}/>}/>
                </div>
                 <div className="flex flex-col gap-y-2">
                    <CardElement theme={"Humidity Average"} element={<CircularDataElement color="text-orange-400"
                                                               call={(data) => averageData(data, (data) => data.humidity)}/>}/>
                    <CardElement theme={"Last humidity data"} element={<CircularDataElement color="text-orange-400"
                                                               call={(data) => data[data.length - 1].humidity}/>}/>
                </div>
                 <div className="flex flex-col gap-y-2">
                    <CardElement theme={"Light Average"} element={<CircularDataElement color="text-green-400"
                                                               call={(data) => averageData(data, (data) => data.humidity)}/>}/>
                    <CardElement theme={"Last light data"} element={<CircularDataElement color="text-green-400"
                                                               call={(data) => data[data.length - 1].light}/>}/>
                </div>
            </div>
            <ChartElement call={(data) => getMonthAverage(data)}/>
        </>
    )
}


