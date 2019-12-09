import { useContext } from 'react'
import { withApollo } from '../apollo/client'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'

import Main from '../src/components/Main'

import { AuthContext } from '../src/contexts/AuthContext'

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
  const { isAuthenticated, setAuth } = useContext(AuthContext)

  const logout = () => {
    localStorage.clear()
    setAuth(false)
  }

  if (viewer) {
    return (
      <Main>

        {isAuthenticated
          ? <button onClick={logout}>Logout</button>
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
