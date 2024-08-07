import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { uuid } from 'uuidv4';

const app = express();

app.use(bodyParser.json());
app.use(cors());

const userarray = [
  {
    id: '1',
    name: 'adarsh',
    email: 'adarsh@gmail.com',
  },
  {
    id: '2',
    name: 'adarsh2',
    email: 'adarsh2@gmail.com',
  },
  {
    id: '3',
    name: 'adarsh3',
    email: 'adarsh3@gmail.com',
  },
];

const posts = [
  {
    id: '73450b80-2bf9-48ad-b44c-a44d0a26eec5',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    author: '1',
  },
  {
    id: 'a1e98b27-f88c-4393-8291-d03b9a8d3b0a',
    title: 'GraphQL 201',
    body: 'This is an advanced GraphQL post...',
    author: '2',
  },
  {
    id: 'fa47e868-96f1-4997-b885-141778f9bdd7',
    title: 'Programming Music',
    body: 'David Cutter Music is my favorite artist to listen to while programming.',
    author: '3',
  },
];

const typeDefs = `
  type Query {
    greeting(name: String): String!
    me: user
    getUserData: [user]
    getPostData:[Post]
  }

  type Mutation{
    createUser(data:createUserInput):user!
  }

  input createUserInput {
  name:String,
  email:String
  }

  type Post{
   id:ID!
    title:String
    body:String
    author:user
  }

  type user {
    id: ID!
    name: String!
    email: String!
  }
`;

const resolvers = {
  Query: {
    me() {
      return {
        id: '1',
        name: 'Adarsh',
        email: 'adarsh@gmail.com',
      };
    },
    getUserData() {
      userarray.sort((a, b) => b.id - a.id);
      return userarray;
    },
    greeting(parent, args, ctx, info) {
      console.log('parent', parent);
      console.log('args', args);
      return 'Hello from Adarsh';
    },
    getPostData() {
      return posts;
    },
  },
  Mutation:{

    createUser(parent,args,ctx,info){
      
      const isEmailExist=userarray.some((user)=>user.email===args.data.email);
      
      if(isEmailExist) {
        throw new Error('Email has been taken')
      }
      
      const user={
        id:uuid(),
        name:args.data.name,
        email:args.data.email
      }
      
      userarray.push(user);
      
      return user;
    }

  },
  Post: {
    author(parent, args, ctx, info) {
      return userarray.find(user => {
        return user.id === parent.author;
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use('/graphql', expressMiddleware(server));

app.listen(4000, () => console.log('server started at 4000'));
