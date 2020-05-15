import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { LoginPage, RegisterPage, FeedPage } from './Pages'

const routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={FeedPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/register" component={RegisterPage}/>
            {/* 
            <Route path="/profile" component={Profile}/>
            <Route path="/incidents/new" component={NewIncident}/> */}
        </Switch>
    </BrowserRouter>
)

export default routes;