import { ApolloServer } from 'apollo-server';

import typeDefs from './schemas';
import resolvers from './resolvers';

import baseContext from './context/baseContext';

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: await typeDefs,
    resolvers,
    context: baseContext,
    cors: {
      // origin: ["http://localhost:3000", "https://localhost:3000", "http://beaconnet.online:3000", "https://studio.apollographql.com"],
      origin: true,
      optionsSuccessStatus: 200,
      credentials: true,
    },
  });

  const { url } = await server.listen();

  console.log(`? Server ready at ${url}`);
};

startServer();
