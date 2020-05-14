import { RequestParameters } from 'relay-runtime/lib/util/RelayConcreteNode';
import { Variables } from 'relay-runtime/lib/util/RelayRuntimeTypes';

import config from '../config';

// your-app-name/src/fetchGraphQL.js
async function fetchGraphQL(request: RequestParameters, variables: Variables) {
    console.log('Current config: ', config);
  
    // Fetch data from GitHub's GraphQL API:
    const response = await fetch(config.GRAPHQL_URL as string, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `${localStorage.getItem('authToken') ? 'Bearer ' + localStorage.getItem('authToken') : ''}`
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