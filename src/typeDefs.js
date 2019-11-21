import { gql } from 'apollo-server';


export const typeDefs = gql`
  type Chat {
    id: Int!
    from: String!
    message: String!
  }

  type Query {
    chats: [Chat]
  }

  type Mutation {
    sendMessage(from: String!, message: String!): Chat
    connect(from: String!): Chat
  }

  type Subscription {
    messageSent: Chat
  }
`;
