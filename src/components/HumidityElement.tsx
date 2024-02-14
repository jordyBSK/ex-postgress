export default function HumidityElement({ humidity }: {humidity:number}) {


    const normalizedTemperature = Math.min(Math.max(humidity, 0), 100);
    const circumference = 2 * Math.PI * 50;
    const dashOffset = circumference - (circumference * normalizedTemperature) / 100;


    return (
        <>
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
                />
                <text x="50" y="50" textAnchor="middle" dy="0.3em" fontSize="20px">
                    {humidity} %
                </text>
            </svg>
        </>

    )
}