import {ReactNode} from "react";

export default function yCardElement({element, theme}: { element: ReactNode, theme: string }) {

    return (
        <>
            <div
                className="rounded-xl min-h-60 min-w-72 bg-white shadow-lg">
                <div className="flex flex-col h-full justify-center items-center">
                    <div className="mt-6 mb-6">

                        {theme}
                    </div>
                    {element}
                </div>
            </div>
        </>
    )
}