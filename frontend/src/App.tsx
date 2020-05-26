import React, {Suspense, useState, useEffect} from 'react';
import { RelayEnvironmentProvider, useRelayEnvironment } from 'react-relay/hooks';

import environment from './relay/environment';
import Routes from './routes';
import { Layout } from './Components';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import SubscriptionModule from './Services/Subscriptions';



const App = () => {
  const [userIsLogged, setUserIsLogged] = useState(!!localStorage.getItem('authToken'));
  const [environment, setEnvironment] = useState(useRelayEnvironment());

  useEffect(() => {
    const subscriptionModule = SubscriptionModule(environment);
    subscriptionModule.disposeAll();
    subscriptionModule.subscribeAll();
  }, [environment]);


  const handleLogoutLogin = () => {
    if (userIsLogged) {
      localStorage.removeItem('authToken');
      setUserIsLogged(false);
    }
}
  return (
    <div className="App">
      <BrowserRouter>
        <Layout handleLogoutLogin={handleLogoutLogin} userIsLogged={userIsLogged}>
          <Suspense fallback="loading...">
            <Routes userIsLogged={userIsLogged} setUserIsLogged={setUserIsLogged}/>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

const AppRoot = () => (
  <RelayEnvironmentProvider environment={environment}>
    <App/>
  </RelayEnvironmentProvider>
)

export default AppRoot;
