import TemperatureElement from "./TemperatureElement.tsx";
import HumidityElement from "./HumidityElement.tsx"
import CardElement from "./cardElement.tsx";
import ChartElement from "./chartElement.tsx";
export default function dashboardElement() {

    return (
        <>
            <div className="space-x-4 flex">
                <CardElement  element={<TemperatureElement temperature={50}/>}/>
                <CardElement element={<HumidityElement humidity={50} />}/>

            </div>

            {/*<CardElement element={<ChartElement/>}/>*/}
            <ChartElement/>

        </>
    )
}