import { PubSub } from 'apollo-server';


const pubsub = new PubSub();

const CHAT_CHANNEL = 'CHAT_CHANNEL';

// const chats = [];

export const resolvers = {
  Query: {
    chats: (parent, args, context, info) => {
      return context.prisma.chats();
    }
  },

  Mutation: {
    sendMessage: (parent, { from, message }, context) => {
      const chat = context.prisma.createChat({
        from, 
        message,
      });

      return pubsub.publish(CHAT_CHANNEL, { messageSent: chat });
    },
  },

  Subscription: {
    messageSent: {
      subscribe: (parent, args) => {
        return pubsub.asyncIterator([CHAT_CHANNEL]);
      }
    },
  }
}
