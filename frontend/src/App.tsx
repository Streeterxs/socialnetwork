import React, {Suspense} from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import environment from './relay/environment';
import Routes from './routes';
import './App.css';



const App = () => {
  return (
    <div className="App">
      <Routes/>
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
