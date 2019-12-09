import { withApollo } from '../apollo/client'
import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'

import Main from '../components/Main'

const VIEWER = gql`
  query ViewerQuery {
    viewer {
      id
      displayName
    }
  }
`

const Index = () => {
  const { data: { viewer } } = useQuery(VIEWER)
  const [token, setKey] = useState(undefined)

  useEffect(() => {
    setKey(localStorage.getItem('token'))
  }, [setKey])

  console.log(token, '--- token')

  if (viewer) {
    return (
      <Main>

        {token
          ? <button onClick={() => localStorage.clear()}>Logout</button>
          : <Link href="/auth">
              <a>authenticate</a>
            </Link>
        }

        
      </Main>
    )
  }

  return null
}

export default withApollo(Index)
