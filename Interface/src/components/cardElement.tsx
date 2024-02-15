import {ReactNode} from "react";

export default function CardElement({element} :{element : ReactNode} ) {

    return (
        <>
            <div
                className="transform  rounded-xl min-h-40 min-w-40  bg-white shadow-xl">
                <div className="flex h-full justify-center items-center">
                    {element}
                </div>
            </div>
        </>
    )
}