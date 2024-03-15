import {ReactNode} from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"




export default function CardElement({element, theme}: { element: ReactNode, theme: string}) {

    return (
        <>
            <Card className="min-w-80 bg-white flex flex-col">
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


        </>
)
}