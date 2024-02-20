import CircularDataElement from "./CircularDataElement.tsx"
import CardElement from "./cardElement.tsx";
import ChartElement1 from "./ChartElement1.tsx";
import SideBarElement from "./SideBarElement.tsx";
import {useState} from "react";


export default function dashboardElement1() {
    const monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

        for (let i = 0; i < 12; i++) {
            if (monthCounts[i] !== 0) {
                monthAverages.humidity[i] /= monthCounts[i];
                monthAverages.temperature[i] /= monthCounts[i];
                monthAverages.light[i] /= monthCounts[i];
            }
        }


        return [monthNames, monthAverages];
    }

    function getMonthDayAverage(
        list: { device_id: number; timestamp: number; temperature: number; humidity: number; light: number }[],
        month: number
    ): [number[], { temperature: number[]; humidity: number[]; light: number[] }] {
        const daysInMonth = new Date(new Date().getFullYear(), month, 0).getDate();


        const dayAverages = {
            "temperature": new Array<number>(daysInMonth).fill(0),
            "humidity": new Array<number>(daysInMonth).fill(0),
            "light": new Array<number>(daysInMonth).fill(0)
        };
        const dayCounts: number[] = new Array<number>(daysInMonth).fill(0);


        const filteredList = list.filter(data => {
            const date = new Date(data.timestamp);
            return date.getMonth() === month - 1;
        });

        for (const data of filteredList) {
            const date = new Date(data.timestamp);
            const dayOfMonth = date.getDate() - 1;
            dayAverages.temperature[dayOfMonth] += data.temperature;
            dayAverages.humidity[dayOfMonth] += data.humidity;
            dayAverages.light[dayOfMonth] += data.light;
            dayCounts[dayOfMonth]++;
        }

        for (let i = 0; i < daysInMonth; i++) {
            if (dayCounts[i] !== 0) {
                dayAverages.temperature[i] /= dayCounts[i];
                dayAverages.humidity[i] /= dayCounts[i];
                dayAverages.light[i] /= dayCounts[i];
            }
        }

        const dayNumbers: number[] = Array.from({length: daysInMonth}, (_, i) => i + 1);

        return [dayNumbers, dayAverages];
    }


    const [monthNumber, setMonthNumber] = useState<string>(2)

    return (
        <>

            <SideBarElement/>
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
            <ChartElement1 call={(data) => getMonthAverage(data)}
                           callable={month =>

                              setMonthNumber(4)

                          }/>
            <ChartElement1
                callable={number => {
                    console.log(number + "toto");
                    //setMonthNumber(monthNames.indexOf(number));
                }}
                call={(data) => getMonthDayAverage(data, monthNumber)}
            />


        </>
    )
}


