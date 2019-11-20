import { PubSub } from 'apollo-server';


const pubsub = new PubSub();
const CHAT_CHANNEL = 'CHAT_CHANNEL';
const chats = [];

export const resolvers = {
  Query: {
    chats(parent, args, context, info) {
      return chats;
    }
  },

  Mutation: {
    sendMessage(parent, { from, message }) {
      const chat = { id: chats.length + 1, from, message };

      chats.push(chat);
      pubsub.publish(CHAT_CHANNEL, { messageSent: chat });

      return chat;
    }
  },

  Subscription: {
    messageSent: {
      subscribe: (parent, args) => {
        return pubsub.asyncIterator([CHAT_CHANNEL]);
      }
    }
  }
}
