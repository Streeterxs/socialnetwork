import React, {Suspense} from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import environment from './relay/environment';
import Routes from './routes';
import { Layout } from './Components';
import './App.css';



const App = () => {
  return (
    <div className="App">
      <Layout>
        <Routes/>
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
