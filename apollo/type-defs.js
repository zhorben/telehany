import gql from 'graphql-tag'

export const typeDefs = gql`
  type User {
    id: ID!
    displayName: String!
    password: String!
    email: String!
  }

  type Query {
    viewer: User
    currentUser: User!
  }

  type Mutation {
    register(email: String!, password: String!, displayName: String!): User!
    confirm(verificationToken: String!): Token!
    login(email: String!, password: String!): Token!
  }

  type Token {
    token: String!
  }

  type LoginResponse {
    token: String
    user: User
  }
`