import { ApolloServer } from '@apollo/server';
import { loadFilesSync } from '@graphql-tools/load-files';
import { startStandaloneServer } from '@apollo/server/standalone';
import Query from './resolver/Query.js';
import Mutation from './resolver/Mutation.js';
import Post from './resolver/Post.js';
import data from './data.js';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { useServer } from 'graphql-ws/lib/use/ws';
import Subscription from './resolver/Subscription.js';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const typeDefs = loadFilesSync('./src/schema.graphql', { recursive: true });

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Post,
    Subscription,
  },
});

async function startServer() {
  const httpServer = createServer();

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: ({ req }) => ({
      data,
      pubsub,
      count: 0,
    }),
  });

  console.log(`Server is running at ${url}`);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  // Use the WebSocket server with graphql-ws
  useServer({ schema: server.schema, context: () => ({ pubsub }) }, wsServer);

  httpServer.listen(4001, () => {
    console.log(`WebSocket Server is running at ws://localhost:4001/graphql`);
  });
}

startServer().catch((error) => {
  console.error('Error starting the server:', error);
});
