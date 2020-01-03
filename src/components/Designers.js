import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const DESIGNERS = gql`
  query designers {
    designers {
      title
      fullTitle
      description
    }
  }
`

export default () => {
  const { data } = useQuery(DESIGNERS)

  data && console.log(data, '--- data')

  return (
    <div className="designers">

    <style jsx>{`
      .designers {
        margin: 40px 0;
      }
    `}</style>
    </div>
  )
}