import gql from 'graphql-tag'

export const VIEWER = gql`
  query {
    viewer {
      id
      email
      displayName
    }
  }
`