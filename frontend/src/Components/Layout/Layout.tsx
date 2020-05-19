import React, { useState } from 'react';

import {Header, Footer} from './';

const Layout = ({children, userIsLogged, handleLogoutLogin}: any) => {

    return (
        <React.Fragment>
            <Header userIsLogged={userIsLogged} handleLogoutLogin={handleLogoutLogin}/>
                {children}
            <Footer/>
        </React.Fragment>
    )
}

export default Layout