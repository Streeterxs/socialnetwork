import React, {Suspense, useState} from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import environment from './relay/environment';
import Routes from './routes';
import { Layout } from './Components';
import './App.css';
import { useHistory, withRouter } from 'react-router';



const App = () => {
  const [userIsLogged, setUserIsLogged] = useState(!!localStorage.getItem('authToken'));

  const history = useHistory();

  const handleLogoutLogin = () => {
    if (userIsLogged) {
      localStorage.removeItem('authToken');
      setUserIsLogged(false);
    }
}
  return (
    <div className="App">
      <Layout handleLogoutLogin={handleLogoutLogin} userIsLogged={userIsLogged}>
        <Routes userIsLogged={userIsLogged} setUserIsLogged={setUserIsLogged}/>
      </Layout>
    </div>
  );
}

const AppRoot = () => (
  <RelayEnvironmentProvider environment={environment}>
    <Suspense fallback={'Loading...'}>
      <App/>
    </Suspense>
  </RelayEnvironmentProvider>
)

export default AppRoot;
