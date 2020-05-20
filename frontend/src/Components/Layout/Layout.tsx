import React, { useState } from 'react';

import {Header, Footer} from './';

const Layout = ({children, userIsLogged, handleLogoutLogin}: any) => {

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-between">
            <Header userIsLogged={userIsLogged} handleLogoutLogin={handleLogoutLogin}/>
            <div className="my-auto w-full p-6">
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default Layout