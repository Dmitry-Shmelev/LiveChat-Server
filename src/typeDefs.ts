import { gql } from 'apollo-server';


export const typeDefs = gql`
  type Chat {
    id: ID!
    from: String!
    message: String!
  }

  type User {
    id: ID!
    name: String!
    password: String!
  }

  type Query {
    chats: [Chat]
    currentUser: User
  }

  type Mutation {
    register(name: String!, password: String!): User!
    login(name: String!, password: String!): LoginResponse!
    sendMessage(message: String!): Chat
  }

  type LoginResponse {
    token: String
    user: User
  }

  type Subscription {
    messageSent: Chat
  }
`;
