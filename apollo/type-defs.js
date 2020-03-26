import gql from 'graphql-tag'

export const typeDefs = gql`
  type User {
    id: ID!
    displayName: String!
    email: String!
  }

  type Token {
    token: String!
  }

  type Designer {
    id: ID!
    title: String!
    fullTitle: String
    description: String
  }

  input SignUpInput {
    email: String!
    password: String!
    displayName: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type SignUpPayload {
    user: User!
  }

  type SignInPayload {
    user: User!
  }

  type Query {
    user(id: ID!): User!
    users: [User]!
    viewer: User
    designers: [Designer]
    designer(id: ID!): Designer
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
    confirm(verificationToken: String!): Token!
  }
`
