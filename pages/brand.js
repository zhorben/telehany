import { useEffect } from 'react'
import { withApollo } from '../apollo/client'
import { CONFIRM } from '../src/graphql/auth'
import { DESIGNER } from '../src/graphql/designer'
import { useQuery } from '@apollo/react-hooks'
import Router from 'next/router'

import Main from '../src/components/Main'
import Header from '../src/components/Header'
import Errors from '../src/components/Errors'

const Brand = ({ id }) => {
  const { data: { designer } } = useQuery(DESIGNER, {
    variables: { id }
  })

  if (!designer) {
    return null
  }

  return (
    <Main>
      <Header />

      <div className="wrapper">
        <h1>{designer.title}</h1>
        <h2>{designer.fullTitle}</h2>
        <p>{designer.description}</p>
      </div>
      

      <style jsx>{`
        p {
          line-height: 26px;
          font-size: 16px;
        }
      `}</style>
    </Main>
  )
}

Brand.getInitialProps = async ({ query: { id } }) => ({ id })

export default withApollo(Brand)