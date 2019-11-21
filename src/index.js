import { ApolloServer } from 'apollo-server';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';


const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
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