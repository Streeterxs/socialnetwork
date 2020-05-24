import { Environment, Network, RecordSource, Store, SubscribeFunction } from 'relay-runtime';
import { fetchGraphQL, setupSubscription } from './fetchGraphQL';


const network = Network.create(
        fetchGraphQL,
        setupSubscription as SubscribeFunction
    );
// Export a singleton instance of Relay Environment configured with our network function:
export default new Environment({
    network,
    store: new Store(new RecordSource()),
});