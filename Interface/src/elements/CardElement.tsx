import {ReactNode} from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"




export default function CardElement({element, theme, description}: { element: ReactNode, theme: string, description:string }) {

    return (
        <>
            <Card className="min-w-64 bg-white flex flex-col justify-center items-center">
                <CardHeader>
                    <CardTitle>{theme}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    {element}
                </CardContent>
            </Card>


        </>
    )
}