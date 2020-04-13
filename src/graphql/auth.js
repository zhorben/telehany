import gql from 'graphql-tag'

export const SIGN_UP = gql`
  mutation ($email: String!, $password: String!, $displayName: String!) {
    signUp(input: { email: $email, password: $password, displayName: $displayName }) {
      displayName
    }
  }
`

export const CONFIRM = gql`
  mutation ($verificationToken: String!) {
    confirm(verificationToken: $verificationToken) {
      token
    }
  }
`

export const SIGN_IN = gql`
  mutation ($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
        email
        displayName
      }
    }
  }
`

export const SIGN_OUT = gql`
  mutation SignOutMutation {
    signOut
  }
`