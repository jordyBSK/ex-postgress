import TemperatureElement from "./TemperatureElement.tsx";
import HumidityElement from "./HumidityElement.tsx"
export default function dashboardElement() {

    return (
        <>
            <TemperatureElement temperature={2}/>
            <HumidityElement humidity={2}/>

        </>
    )
}