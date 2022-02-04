const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        user(id:ID!): User!
        users:[User]!
        lastPost:Post
    }

    type Mutation {
        addPost(data:PostInput!):Post!
    }

    type User {
        id: ID!,
        name: String!
        lastname: String
        email:String
        posts:[Post!]!
    }

    input PostInput {
        title:String!
        body:String!
        author:ID!
    }

   type Post {
       id:ID!
       title:String
       body:String
       author:[User!]!
   }
`;

module.exports = typeDefs;