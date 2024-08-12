const { ApolloServer } = require('apollo-server');
const typeDefs=require('./src/schemas/typeDefs.js')
const resolvers=require('./src/schemas/resolvers.js')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
     const authHeader = req.headers.authorization || '';
    return { authHeader };
  },
});

server.listen(4500,console.log('server is running on port no 4500'))
