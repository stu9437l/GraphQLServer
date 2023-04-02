import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    quotes:[Quote]
  }
  type User {
    _id: ID!
    name: String
    email: String
    password: String
    quote: [Quote]
  }
  type Quote {
    title: String
    by: ID
  }
  type Mutation {
    signupUser(input: userInput!): User
    signinUser(input: signinInput!): Token
    deleteUser(_id: ID!): String!
    updateUser(_id: ID!, input: userUpdatedInput!): User
    createQuote(input: quoteInput!): Quote
  }
  input quoteInput {
    title: String
  }
  type Token {
    token: String
  }
  input userInput {
    name: String!
    email: String!
    password: String!
  }
  input userUpdatedInput {
    name: String
    email: String
    password: String
  }
  input signinInput {
    email: String!
    password: String!
  }
`;

export default typeDefs;
