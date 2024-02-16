import {useEffect, useState} from "react";
import {Chart} from "frappe-charts";

export default function ChartElement(
    {call} : {
        call:
            (data:{"device_id":number,"timestamp":number,"temperature":number,"humidity":number,"light":number}[])
                => [string[], number[]]
    }) {

    const [dateNames, setDateNames] = useState<string[]>([]);
    const [displayDate, setDisplayDate] = useState<number[]>([]);



    useEffect(() => {
        fetch('http://localhost:5175/index.php')
            .then(response => response.json())
            .then(data => {
                setDateNames(call(data)[0])
                setDisplayDate(call(data)[1])
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    }, []);
    console.log(displayDate)

    useEffect(() => {
        const data = {
            labels: dateNames,
            datasets: [
                {
                    values: displayDate,
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