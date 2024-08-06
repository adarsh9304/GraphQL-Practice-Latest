import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors());

const userarray = [
  {
    id: "1",
    name: "adarsh",
    email: "adarsh@gmail.com"
  },
  {
    id: "2",
    name: "adarsh2",
    email: "adarsh2@gmail.com"
  },
  {
    id: "3",
    name: "adarsh3",
    email: "adarsh3@gmail.com"
  }
];

const typeDefs = `
  type Query {
    greeting(name: String): String!
    me: user
    getUserData: [user]
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
        id: "1",
        name: "Adarsh",
        email: "adarsh@gmail.com"
      };
    },
    getUserData() {
      userarray.sort((a,b)=>b.id-a.id)
      return userarray;
    },
    greeting(parent, args, ctx, info) {
      console.log("parent", parent);
      console.log("args", args);
      return "Hello from Adarsh";
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

await server.start();

app.use("/graphql", expressMiddleware(server));

app.listen(4000, () => console.log("server started at 4000"));
