import React, {Suspense, useState} from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import environment from './relay/environment';
import Routes from './routes';
import { Layout } from './Components';
import './App.css';
import { BrowserRouter } from 'react-router-dom';



const App = () => {
  const [userIsLogged, setUserIsLogged] = useState(!!localStorage.getItem('authToken'));

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
          <Suspense fallback={'Loading...'}>
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
