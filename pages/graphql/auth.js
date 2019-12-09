import gql from 'graphql-tag'

export const REGISTER = gql`
  mutation register($email: String!, $password: String!, $displayName: String!) {
    register(email: $email, password: $password, displayName: $displayName ) {
      displayName
    }
  }
`

export const CONFIRM = gql`
  mutation confirm($verificationToken: String!) {
    confirm(verificationToken: $verificationToken) {
      token
    }
  }
`