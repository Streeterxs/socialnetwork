import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import fetchGraphQL from './fetchGraphQL';


const network = Network.create(fetchGraphQL);
  
// Export a singleton instance of Relay Environment configured with our network function:
export default new Environment({
    network,
    store: new Store(new RecordSource()),
});