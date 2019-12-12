import { gql } from 'apollo-server';


export const typeDefs = gql`
  scalar DateTime
  
  type Chat {
    id: ID!
    from: String!
    message: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type User {
    id: ID!
    name: String!
    password: String!
    createdAt: DateTime!
    updatedAt: DateTime!
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
