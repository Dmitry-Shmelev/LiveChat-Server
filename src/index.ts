import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

import { prisma } from './generated/prisma-client';


const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const getUserFromToken = token => {
  try {
    if (token) {
      return jwt.verify(token, process.env.SECRET_KEY);
    }
    console.log('token is null');
    return null;
  } catch (err) {
    console.log('token does not match ', err);
    return null;
  }
}

const PRISMA_ENDPOINT = process.env.PRISMA_ENDPOINT || 'http://localhost:4466';
const PORT = process.env.PORT || 4000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization;
    const token = tokenWithBearer.split(' ')[1];
    const user = getUserFromToken(token);

    return {
      user, 
      prisma,
    }
  },
  subscriptions: {
    onConnect: (connectParams, webSocket) => {
      // webSocket connect
    },
    onDisconnect: (webSocket, context) => {

    },
  }
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`- Server ready at ${url}`);
  console.log(`- Prisma ready at ${PRISMA_ENDPOINT}`);
  console.log(`- Prisma Admin ready at ${PRISMA_ENDPOINT}/_admin`);
});