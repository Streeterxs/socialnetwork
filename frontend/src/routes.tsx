import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { LoginPage, RegisterPage, FeedPage } from './Pages'

const routes = ({userIsLogged, setUserIsLogged}: {
    userIsLogged: boolean,
    setUserIsLogged: (userIsLogged: boolean) => void
}) => (
    <Switch>
        <Route path="/" exact render={(props) => <FeedPage {...props} userIsLogged={userIsLogged}/>}/>
        <Route path="/login" render={(props)=> <LoginPage {...props} setUserIsLogged={setUserIsLogged} />}/>
        <Route path="/register" component={RegisterPage}/>
        {/* 
        <Route path="/profile" component={Profile}/>
        <Route path="/incidents/new" component={NewIncident}/> */}
    </Switch>
)

export default routes;