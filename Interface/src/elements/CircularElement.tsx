export default function CircularElement({data, unity, color}: { data: number | string, unity: string, color: string}) {
    if (data === null || data === undefined) {
        return null;
    }

    const numericData = typeof data === 'string' ? parseFloat(data) : data;

    const normalizedTemperature = Math.min(Math.max(numericData, -100),100)

    const circumference = 2 * Math.PI * 45;

    let dashOffset: number;
    if (normalizedTemperature >= 0) {
        dashOffset = circumference - (circumference * normalizedTemperature) / 100;
    } else {
        dashOffset = circumference + (circumference * normalizedTemperature) / 100;
    }

    return (
        <div className="flex">
            <text className=" text-center font-bold text-xl mr-16 dark:text-white">
                {data} {unity}
            </text>
            <svg className="w-32 h-32 " viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={color}
                    strokeWidth="20"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                />
            </svg>
        </div>
    );
}
