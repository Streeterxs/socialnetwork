import React from 'react';

import {Header, Footer} from './';

const Layout = ({children}: any) => (
    <React.Fragment>
        <Header/>
            {children}
        <Footer/>
    </React.Fragment>
)

export default Layout