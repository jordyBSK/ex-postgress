import TemperatureElement from "./TemperatureElement.tsx";
import HumidityElement from "./HumidityElement.tsx"
import CardElement from "./cardElement.tsx";
import ChartElement from "./chartElement.tsx";
export default function dashboardElement() {

    return (
        <>
            <div className="space-x-4 flex">
                <CardElement element={<TemperatureElement call={(data) => averageData(data, (data) => data.temperature)}/>}/>
                <CardElement element={<TemperatureElement call={(data) => data[data.length - 1].temperature}/>}/>
                <CardElement element={<HumidityElement call={(data) => averageData(data, (data) => data.humidity)}/>}/>
                <CardElement element={<HumidityElement call={(data) => data[data.length - 1].humidity}/>}/>

            </div>

            <ChartElement theme={"temperature"}/>
            <ChartElement theme={"humidity"}/>

        </>
    )
}

function averageData(
    list: {"device_id":number,"timestamp":number,"temperature":number,"humidity":number,"light":number}[],
    call: (data: {"device_id":number,"timestamp":number,"temperature":number,"humidity":number,"light":number})
        => number) {
    let out = 0
    for (const listElement of list) {
        out += call(listElement)
    }
    return out/list.length
}