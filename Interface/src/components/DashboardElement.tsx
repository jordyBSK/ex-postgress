import CircularDataElement from "./CircularDataElement.tsx"
import CardElement from "./cardElement.tsx";
import ChartElement from "./chartElement.tsx";


export default function dashboardElement() {


    return (
        <>
            <div className="flex flex-row flex-wrap justify-evenly">
                <CardElement element={<CircularDataElement color="blue-500"
                                                           call={(data) => averageData(data, (data) => data.temperature)}/>}/>
                <CardElement element={<CircularDataElement color="blue-500"
                                                           call={(data) => data[data.length - 1].temperature}/>}/>
                <CardElement element={<CircularDataElement color="orange-400"
                                                           call={(data) => averageData(data, (data) => data.humidity)}/>}/>
                <CardElement element={<CircularDataElement color="orange-400"
                                                           call={(data) => data[data.length - 1].humidity}/>}/>
            </div>
            <ChartElement call={(data) => getAllDate(data)}/>
        </>
    )
}

function averageData(
    list: { "device_id": number, "timestamp": number, "temperature": number, "humidity": number, "light": number }[],
    call: (data: {
        "device_id": number,
        "timestamp": number,
        "temperature": number,
        "humidity": number,
        "light": number
    })
        => number) {
    let out = 0

    for (const listElement of list) {
        out += call(listElement)
    }
    return out / list.length
}

function getAllDate(
    list: { "device_id": number, "timestamp": number, "temperature": number, "humidity": number, "light": number }[],
): [string[], number[]] {
    const month_names: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month_map: number[] = [0,0,0,0,0,0,0,0,0,0,0,0]

    for (const date of list){
        const month = new Date(date.timestamp).getMonth()
        month_map[month]++
    }

    return [month_names,month_map]
}

