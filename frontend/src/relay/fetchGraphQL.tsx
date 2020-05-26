import { RequestParameters } from 'relay-runtime/lib/util/RelayConcreteNode';
import { Variables, Disposable } from 'relay-runtime/lib/util/RelayRuntimeTypes';
import { SubscriptionClient, Observer, OperationOptions } from 'subscriptions-transport-ws';

import config from '../config';
import { ExecutionResult } from 'graphql';
import { Observable, SubscribeFunction, Subscribable, GraphQLResponse } from 'relay-runtime';
import { RelayObservable } from 'relay-runtime/lib/network/RelayObservable';

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

  return Observable.from(client as Subscribable<ExecutionResult>) as RelayObservable<GraphQLResponse> | Disposable;

  let subscription: any;
  /* return {
    subscribe: (observer: any) => {
      if (!subscription) {
        console.log(observer);
        subscription = client.subscribe(observer);
        observer.start(subscription);
      }
    },
    dispose: () => {
      if (subscription) {
        subscriptionClient.unsubscribeAll();
        subscriptionClient.close();
        subscription.unsubscribe();
      }
    }
  }; */
}
  
  export { fetchGraphQL, setupSubscription };