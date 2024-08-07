import { ApolloServer } from '@apollo/server';
import { loadFilesSync } from '@graphql-tools/load-files';
import { startStandaloneServer } from '@apollo/server/standalone';
import Query from './resolver/Query.js';
import Mutation from './resolver/Mutation.js';
import Post from './resolver/Post.js';
import data from './data.js';

const typeDefs = loadFilesSync('./src/schema.graphql', { recursive: true });

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Post
  }
});

async function startServer() {

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: ({ req }) => ({
      data
    }),
  });

  console.log(`Server is running at ${url}`);
}

startServer().catch((error) => {
  console.error('Error starting the server:', error);
});
