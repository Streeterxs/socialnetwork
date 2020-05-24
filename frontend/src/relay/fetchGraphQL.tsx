import { RequestParameters } from 'relay-runtime/lib/util/RelayConcreteNode';
import { Variables } from 'relay-runtime/lib/util/RelayRuntimeTypes';
import { SubscriptionClient, Observer, OperationOptions } from 'subscriptions-transport-ws';

import config from '../config';
import { ExecutionResult } from 'graphql';
import { Observable, SubscribeFunction, Subscribable } from 'relay-runtime';

export function getToken(): string {
  const currentToken = localStorage.getItem('authToken');
  return currentToken ? currentToken : '';
}
// your-app-name/src/fetchGraphQL.js
async function fetchGraphQL(request: RequestParameters, variables: Variables) {
    const loggedUser = Promise.resolve().then(() => getToken());
  
    // Fetch data from GitHub's GraphQL API:
    const response = await fetch(config.GRAPHQL_URL as string, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: await loggedUser
      },
      body: JSON.stringify({
        query: request.text,
        variables,
      }),
    });
  
    // Get the response as JSON
    return await response.json();
  }


const setupSubscription: SubscribeFunction = (request, variables) => {


  const subscriptionClient = new SubscriptionClient(
    'ws://localhost:3333/subscriptions',
    {
      reconnect: true,
      connectionParams: {
        authorization: localStorage.getItem('authToken')
      },
      reconnectionAttempts: 0
    },
  );

  const query = request.text;
  const client = subscriptionClient.request({ query: query!, variables });

  let subscription: any;
  return {
    subscribe: (observer: any) => {
      if (!subscription) {
        subscription = client.subscribe(observer)
      }
    },
    dispose: () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  };
}
  
  export { fetchGraphQL, setupSubscription };