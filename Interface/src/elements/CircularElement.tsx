export default function CircularElement({ data, unity,color }: { data: number | string , unity: string, color: string}) {
    if (data === null || data === undefined) {
        return null;
    }


    const numericData = typeof data === 'string' ? parseFloat(data) : data;

    const normalizedTemperature = Math.min(Math.max(numericData, 0), 100);

    const circumference = 2 * Math.PI * 45;

    const dashOffset = circumference - (circumference * normalizedTemperature) / 100;
    return (
        <svg className="w-32 h-32 " viewBox="0 0 100 100">
            <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={color}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
            />
            <text x="50" y="50" textAnchor="middle" dy="0.2em" fontSize="18px">
                {data} {unity}
            </text>
        </svg>

    );
}
