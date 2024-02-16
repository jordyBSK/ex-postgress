import {useEffect, useState} from "react";
import {Chart} from "frappe-charts";

export default function ChartElement(
    {call} : {
        call:
            (data:{"device_id":number,"timestamp":number,"temperature":number,"humidity":number,"light":number}[])
                => number
    }) {

    const [displayDate, setDisplayDate] = useState(0);



    useEffect(() => {
        fetch('http://localhost:5175/index.php')
            .then(response => response.json())
            .then(data => {
                setDisplayDate(call(data))
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    }, []);




    useEffect(() => {
        const data = {
            labels: [],
            datasets: [
                {
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