import { PubSub } from 'apollo-server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { 
  Context, 
  UserFromToken,
} from './';
import {
  Prisma
} from './generated/prisma-client';

const pubsub = new PubSub();

const CHAT_CHANNEL = 'CHAT_CHANNEL';

// const chats = [];

export const resolvers = {
  Query: {
    chats: (parent: any, args: any, context: Context, info: any) => {
      return context.prisma.chats();
    }, 
    currentUser: (parent: any, args: any, { user, prisma }, info: any) => {
      if(!user) {
        throw new Error('Not Authenticated');
      }
      return prisma.user({ id: user.id });
    },
  },

  Mutation: {
    register: async (parent: any, { name, password }, { prisma }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.createUser({
        name, 
        password: hashedPassword,
      });
      return user;
    },

    login: async (parent, { name, password }, { prisma }) => {
      const user = await prisma.user({ name });

      if(!user) {
        throw new Error('Invalid Login: user not exists');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if(!passwordMatch) {
        throw new Error('Invalid Login: password does not match');
      }

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
        }, 
        process.env.SECRET_KEY || 'secret-key', 
        {
          expiresIn: '30d', // 30days
        },
      );
      return {
        token, 
        user,
      };
    },

    sendMessage: async (parent, { message }, { user, prisma }) => {
      if( !user ) {
        throw new Error('Not Authenticated')
      }

      const chat = await prisma.createChat({
        from: user.name, 
        message,
      });

      await pubsub.publish(CHAT_CHANNEL, { messageSent: chat });

      return chat;
    },
  },

  Subscription: {
    messageSent: {
      subscribe: () => {
        return pubsub.asyncIterator([CHAT_CHANNEL]);
      }
    },
  }
}
