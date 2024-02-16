import {useEffect, useState} from "react";
import {Chart} from "frappe-charts";

export default function ChartElement(
    {call} : {
        call:
            (data:{"device_id":number,"timestamp":number,"temperature":number,"humidity":number,"light":number}[])
                => [string[], { "temperature": number[], "humidity": number[], "light": number[] }]
    }) {

    const [dateNames, setDateNames] = useState<string[]>([]);
    const [monthlyAverages, setMonthlyAverages] = useState<{ "temperature": number[], "humidity": number[], "light": number[] }>({ "temperature": [], "humidity": [], "light": [] }); // État pour stocker les moyennes mensuelles

    useEffect(() => {
        fetch('http://localhost:5175/index.php')
            .then(response => response.json())
            .then(data => {
                const [names, monthAverages] = call(data);
                setDateNames(names);
                setMonthlyAverages(monthAverages);
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    }, []);

    console.log("pomme", monthlyAverages, dateNames)

    useEffect(() => {
        const data = {
            labels:  dateNames,
            datasets: [
                {
                    name: 'Average Temperature',
                    values: monthlyAverages.temperature,
                },
                {
                    name: 'Average Humidity',
                    values: monthlyAverages.humidity
                },
                {
                    name: 'Average Light',
                    values: monthlyAverages.light
                }
            ],
        };

        const chart = new Chart("#chart", {
            data: data,
            type: "line",
            height: 250,
            colors: ["#7cd6fd", "#ff9900", "#ffcc00"],
        });

        return () => {
            chart.destroy()
        };
    });

    return (
        <div id="chart"></div>
    )
}
