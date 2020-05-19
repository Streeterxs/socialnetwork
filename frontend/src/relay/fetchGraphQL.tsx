import { RequestParameters } from 'relay-runtime/lib/util/RelayConcreteNode';
import { Variables } from 'relay-runtime/lib/util/RelayRuntimeTypes';

import config from '../config';

export function getToken(): string {
  const currentToken = localStorage.getItem('authToken');
  console.log('current token: ', currentToken);
  return currentToken ? currentToken : '';
}
// your-app-name/src/fetchGraphQL.js
async function fetchGraphQL(request: RequestParameters, variables: Variables) {
    console.log('Current config: ', config);
    const loggedUser = Promise.resolve().then(() => getToken());
    console.log('fetchGraphQL loggedUser: ', loggedUser);
  
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
  
  export default fetchGraphQL;