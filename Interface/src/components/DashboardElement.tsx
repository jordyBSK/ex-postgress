
import AverageDataStore from "./AverageDataStore.tsx";
import MonthlyAverageStore from "./MonthlyAverageStore.tsx";
import MonthAverageStore from "./MonthAverageStore.tsx";



export default function dashboardElement1() {
    return (
        <>

            <MonthAverageStore/>
            <AverageDataStore/>
            <MonthlyAverageStore/>
        </>
    )
}


