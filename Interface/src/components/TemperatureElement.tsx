import {useEffect, useState} from "react";

export default function TemperatureElement() {
    const [temperature, setTemperature] = useState(0);

        const normalizedTemperature = Math.min(Math.max(temperature, 0), 50);
        const circumference = 2 * Math.PI * 45;
        const dashOffset = circumference - (circumference * normalizedTemperature) / -100;



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


    return (
        <svg className="w-24 h-24" viewBox="0 0 100 100">
            <circle
                className="text-blue-500"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap={"round"}
            />
            <text x="50" y="50" textAnchor="middle" dy="0.3em" fontSize="20px">
                {temperature}°C
            </text>
        </svg>
    )
}