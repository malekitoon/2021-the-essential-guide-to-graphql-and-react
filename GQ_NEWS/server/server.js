const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/schema');
const { Query } = require('./graphql/resolvers/query');
const { Mutation } = require('./graphql/resolvers/mutation');
const { User } = require('./graphql/resolvers/user');
const { Post } = require('./graphql/resolvers/post');
const { Category } = require('./graphql/resolvers/category');

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Category,
  },
  context: ({ req }) => {
    // req.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWRmNjNiYmIyMzkzYTNkYTRmNmFlNzciLCJlbWFpbCI6Im1pa2VAZ21haWwuY29tIiwiaWF0IjoxNjQyMDgyMzQ5LCJleHAiOjE2NDI2ODcxNDl9.2n0oQlkKAksuUVTpdn0UFfu8xdm-jJX8SmO-YNluUMU';
    // old below
    // req.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQyZDQ4NzVmY2Y3NjBhYTI5ZDU2MjMiLCJlbWFpbCI6ImFubmFfanVuaW9yQGdtYWlsLmNvbSIsImlhdCI6MTY0MTM4Mzk3MCwiZXhwIjoxNjQxOTg4NzcwfQ.g1J8YORnc1wbjATVNvP3sAcAauj3_fcAmnQAMwUfFvM';
    return { req };
  },
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 5000;

mongoose
  .connect(`mongodb+srv://gqnewsdbuser:testing123@gq-news-cluster.mfd1o.mongodb.net/gq-news-db?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}...`);
    });
  })
  .catch(err => {
    console.log(err);
  });
