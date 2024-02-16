import {useEffect, useState} from "react";
import {Chart} from "frappe-charts";

export default function ChartElement({theme}:{theme:string}) {

    const [temperature, setTemperature] = useState(0);
    const [humidity, setHumidity] = useState(0);



    useEffect(() => {
        fetch('http://localhost:5000/main.py')
            .then(response => response.json())
            .then(data => {
                setTemperature(data.temperature);
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    }, []);




    useEffect(() => {
        const data = {
            labels: ["Mon", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            datasets: [
                {
                    title: {theme},
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