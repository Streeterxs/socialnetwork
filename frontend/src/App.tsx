import React, {Suspense} from 'react';
import './App.css';

import {
  RelayEnvironmentProvider,
  useLazyLoadQuery
} from 'react-relay/hooks';

import graphql from 'babel-plugin-relay/macro';

import environment from './relay/environment';

const loginMutation = graphql`
  mutation AppLoginMutation {
    Login(input: {email: "afonso@afonso1", password: "12345678", clientMutationId: "1"}) {
      user {
        name
        token
      }
    }
  }
`;

const App = () => {
  const test = useLazyLoadQuery(loginMutation, {}, {
    fetchPolicy: 'store-or-network'
  });
  console.log(test)
  return (
    <div className="App">
      Begin
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
