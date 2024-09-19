import App from './app.js';
import getUser from './auth.js';
import { execute, subscribe } from 'graphql';

import { SubscriptionServer } from 'subscriptions-transport-ws';
import { createServer } from 'http';
import { Schema } from './schema/Schema';

type ConnectionParams = {
    authorization?: string;
  };

(async () => {
const server = createServer(App.callback());

server.listen(process.env.PORT ?? '3333', () => {
    console.log('O servidor foi iniciado');
});

const subscriptionServer = SubscriptionServer.create(
    {
      onConnect: async (connectionParams: ConnectionParams) => {
        const user = await getUser(connectionParams.authorization);
        return {
          req: {},
          user
        }
      },
      // eslint-disable-next-line
      onDisconnect: () => console.log('Client subscription disconnected!'),
      execute,
      subscribe,
      schema: Schema,
    },
    {
      server,
      path: '/subscriptions',
    },
  );
})();