import {FormEvent, useState} from "react";


export default function LoginElement() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5174/login.php?username=${username}&password=${password}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const content = await response.json();
        console.log(response)
        if (response.ok) {
            console.log(content);
        }
    };


    return (
        <>
            <section className="h-screen">
                <div className="flex h-full items-center justify-center">
                    <div className="md:w-8/12 lg:ml-6 lg:w-5/12 shadow-2xl p-12 bg-white rounded-xl">
                        <form method="post" onSubmit={submit} >
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="peer block min-h-[auto] w-full rounded border-0 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear motion-reduce:transition-none dark:text-black"
                                    placeholder="Username"
                                />
                            </div>
                            <div className="relative mb-6">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="peer block min-h-[auto] w-full rounded border-0 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear motion-reduce:transition-none dark:text-black"
                                    placeholder="Password"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-black inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}