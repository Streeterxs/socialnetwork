import React, {unstable_useTransition as useTransition} from 'react';

const RegisterForm = ({emailChange, passwordChange, nameChange, formSubmit}: 
    {
        emailChange: (email: string) => void,
        passwordChange: (password: string) => void,
        nameChange: (name: string) => void,
        formSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    }
    ) => {

        const [startTransition, isPending] = useTransition({
            timeoutMs: 10000
        });

        const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            startTransition(() => {
                formSubmit(event);
            })
        };

        return (
        <div className="flex items-center h-full justify-center">
            {isPending ? 'Loading...' : null}
            <form onSubmit={handleFormSubmit} className="w-full max-w-lg">
                <h1 className="text-3xl text-teal-500 mb-3">Register</h1>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-name">
                            Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" onChange={(event) => nameChange(event.target.value)} type="text" placeholder="Jane Doe" />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Password
                        </label>
                        <input onChange={(event) => passwordChange(event.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                            Email
                        </label>
                        <input onChange={(event) => emailChange(event.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="jane.doe@gmail.com" />
                    </div>
                </div>
                <div className="md:flex md:items-end">
                    <button className="shadow bg-teal-700 ml-auto hover:bg-teal-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    )
};

export default RegisterForm;