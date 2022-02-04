const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const expressPlayground = require('graphql-playground-middleware-express').default;
const bodyParser = require('body-parser');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

const User = require('./models/user');

app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
      type RootQuery {
        user(id: ID!): User!
      }
      
      type RootMutation {
        addUser(userInput: UserInput!): User!
      }
      
      type User {
        _id: ID!
        email: String!
        password: String!
      }
      
      input UserInput {
        email: String!
        password: String!
      }
      
      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      user: async (args) => {
        try {
          const user = await User.findOne({ _id: args.id });
          return { ...user._doc };
        } catch (err) {
          throw err;
        }
      },
      addUser: async (args) => {
        try {
          const user = new User({
            email: args.userInput.email,
            password: args.userInput.password,
          });

          const result = await user.save();

          return { ...result._doc };
        } catch (err) {
          throw err;
        }
      },
    },
    graphiql: true, // playground
  }),
);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(
    'mongodb+srv://graphqluser:testing123@cluster0.u7az2.mongodb.net/gql_remn?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Running running on port ${PORT}...`);
    });
  })
  .catch(err => {
    console.log(err);
  });
