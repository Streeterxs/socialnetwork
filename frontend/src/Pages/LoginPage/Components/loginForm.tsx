import React from 'react';

const loginForm = ({emailChange, passwordChange, formSubmit}: 
    {
        emailChange: (email: string) => void,
        passwordChange: (password: string) => void,
        formSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    }
    ) => {
    return (
        <form className="w-full max-w-sm" onSubmit={(event) => formSubmit(event)}>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                        Email
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" onChange={(event) => emailChange(event.target.value)} id="inline-full-name" type="text" value="Jane Doe"/>
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-username">
                        Password
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-username"  onChange={(event) => passwordChange(event.target.value)} type="password" placeholder="******************"/>
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3"></div>
                <label className="md:w-2/3 block text-gray-500 font-bold">
                    <input className="mr-2 leading-tight" type="checkbox"/>
                    <span className="text-sm">
                        Send me your newsletter!
                    </span>
                </label>
            </div>
            <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                    <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                        Sign Up
                    </button>
                </div>
            </div>
        </form>
    )
};

export default loginForm