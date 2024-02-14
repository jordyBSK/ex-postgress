import {useEffect} from "react";

import { Chart } from "frappe-charts"

export default function HumidityElement() {
    useEffect(() => {
        const data = {
            labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            datasets: [
                {
                    title: "Some Data",
                    values: [18, 40, 30, 35, 8, 52, 17],
                },
            ],
        };

        const chart = new Chart("#chart", {
            data: data,
            type: "bar",
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
