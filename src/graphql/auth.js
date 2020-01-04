import gql from 'graphql-tag'

export const REGISTER = gql`
  mutation ($email: String!, $password: String!, $displayName: String!) {
    register(email: $email, password: $password, displayName: $displayName ) {
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

export const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`