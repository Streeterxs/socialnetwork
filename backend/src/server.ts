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

server.listen('3333', () => {
    console.log('O servidor foi iniciado');
});

SubscriptionServer.create(
    {
      onConnect: async (connectionParams: ConnectionParams) => {
        const user = await getUser(connectionParams.authorization);
        return {user}
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