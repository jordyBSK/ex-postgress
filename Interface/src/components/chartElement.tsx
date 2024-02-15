import {useEffect} from "react";
import {Chart} from "frappe-charts";

export default function ChartElement() {
    useEffect(() => {
        const data = {
            labels: ["Mon", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            datasets: [
                {
                    title: "Some Data",
                    values: [12, 40, 30, 35, 8, 52, 17],
                },
            ],
        };

        const chart = new Chart("#chart", {
            data: data,
            type: "line",
            height: 250,
            colors: ["#7cd6fd"],
        });

        return () => {
            chart.destroy()
        };
    }, []);


    return (
        <div id="chart"></div>
    )
}