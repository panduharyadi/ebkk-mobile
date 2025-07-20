import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://192.168.18.31:5000/graphql',
  cache: new InMemoryCache(),
});

export default client;