import gql from 'graphql-tag'

export const DESIGNERS = gql`
  query designers {
    designers {
      title
      fullTitle
      description
    }
  }
`