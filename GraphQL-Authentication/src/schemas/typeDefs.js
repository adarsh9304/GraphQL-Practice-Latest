const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    token: String
  }
  type Query {
    getUser: User
  }
  type Mutation{
    login(username: String!, password: String!): User!
    signup(username: String!, email: String!, password: String!): User!
  }
`;
module.exports=typeDefs