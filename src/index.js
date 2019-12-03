import { ApolloServer } from 'apollo-server';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

import { prisma } from '../generated/prisma-client';


const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (integrationContext) => ({
    prisma
  }),
  subscriptions: {
    onConnect: (connectParams, webSocket) => {
      // webSocket connect
    },
    onDisconnect: (webSocket, context) => {

    },
  }
});

server.listen({ port: PORT }).then(({ url, subscriptionUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionUrl}`);
});