import gql from 'graphql-tag'

export const DESIGNERS = gql`
  query {
    designers {
      id
      title
      fullTitle
      description
    }
  }
`

export const DESIGNER = gql`
  query ($id: ID!) {
    designer(id: $id) {
      id
      title
      fullTitle
      description
    }
  }
`