import { GraphQLServer } from 'graphql-yoga';
import { Query, Mutation, User, Post, Picture, AnimalUnion, IAnimal } from './graphql/resolvers';

const server = new GraphQLServer({
  typeDefs: './src/graphql/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Post,
    User,
    Picture,
    AnimalUnion,
    IAnimal,
  }
});

server.start(() => { console.log('And running running'); });
