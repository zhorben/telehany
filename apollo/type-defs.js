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
    login(email: String!, password: String!): LoginResponse!
  }

  type LoginResponse {
    token: String
    user: User
  }
`
