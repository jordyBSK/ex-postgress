export default function HumidityElement({humidity}:{humidity : number}) {
    const normalizedTemperature = Math.min(Math.max(humidity, 0), 50);
    const circumference = 2 * Math.PI * 45;
    const dashOffset = circumference - (circumference * normalizedTemperature) / -100;

    return (
        <svg className="w-24 h-24" viewBox="0 0 100 100">
            <circle
                className="text-orange-400"
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
                {humidity} %
            </text>
        </svg>
    )
}
