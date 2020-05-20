import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({userIsLogged, handleLogoutLogin}: {
    userIsLogged: boolean,
    handleLogoutLogin: () => void
}) => {

    return (
        <nav className="flex items-center justify-between w-full flex-wrap bg-gray-100 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Link to="/">
                    <span className="font-semibold text-2xl cursor-pointer text-teal-500 tracking-tight">Social Network Example</span>
                </Link>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-500 border-teal-700 hover:text-white hover:border-white">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    {/* <a className="block mt-4 lg:inline-block cursor-pointer lg:mt-0 text-teal-500 hover:font-bold mr-4">
                        Docs
                    </a>
                    <a className="block mt-4 lg:inline-block cursor-pointer lg:mt-0 text-teal-500 hover:font-bold mr-4">
                        Examples
                    </a>
                    <a className="block mt-4 lg:inline-block cursor-pointer lg:mt-0 text-teal-500 hover:font-bold">
                        Blog
                    </a> */}
                </div>
                <div>
                    <Link to='/login' onClick={() => {
                        if (userIsLogged) {
                            handleLogoutLogin();
                        }
                    }} className="inline-block text-sm px-4 py-2 cursor-pointer leading-none rounded text-teal-500 border-white hover:border-transparent hover:text-teal-500 hover:font-bold mt-4 lg:mt-0">{userIsLogged ? 'Logout' : 'Login'}</Link>
                    {
                        !userIsLogged ? <Link to="/register" className="inline-block text-sm px-4 py-2 cursor-pointer leading-none rounded text-teal-500 border-white hover:border-transparent hover:text-teal-500 hover:font-bold mt-4 lg:mt-0">Register</Link> :
                        null
                    }
                </div>
            </div>
        </nav>
    )
};

export default Navbar;