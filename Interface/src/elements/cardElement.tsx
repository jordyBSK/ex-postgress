import {ReactNode} from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"



export default function CardElement({element, theme}: { element: ReactNode, theme: string }) {

    return (
        <>

            <div
                className="rounded-xl min-h-60 mt-4 min-w-72 bg-white shadow-lg">
                <div className="flex flex-col h-full justify-center items-center">
                    <div className="mt-6 mb-6">
                        {theme}
                    </div>
                    <image/>
                    {element}
                </div>


            </div>


        </>
    )
}