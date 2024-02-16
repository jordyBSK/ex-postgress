import {ReactNode} from "react";

export default function CardElement({element} :{element : ReactNode} ) {

    return (
        <>
            <div
                className="rounded-xl h-40 w-64 bg-white shadow-lg">
                <div className="flex h-full justify-center items-center">
                    {element}
                </div>
            </div>
        </>
    )
}