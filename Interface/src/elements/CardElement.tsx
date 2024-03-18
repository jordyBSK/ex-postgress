import { ReactNode } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function CardElement({ element, theme, darkTheme }: { element: ReactNode, theme: string, darkTheme: boolean }) {
    return (
        <Card className="min-w-80 flex flex-col" style={{ backgroundColor: darkTheme ? '#1D232C' : '#FFF' }}>
            <div className="flex justify-start">
                <CardHeader>
                    <CardTitle className="text-gray-500">{theme}</CardTitle>
                </CardHeader>
            </div>
            <div className="flex-grow flex justify-center items-center">
                <CardContent>
                    {element}
                </CardContent>
            </div>
        </Card>
    );
}
