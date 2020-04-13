import React from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { SIGN_OUT } from '../graphql/auth'
import { VIEWER } from '../graphql/user'

export default () => {
  const [signOut] = useMutation(SIGN_OUT)
  const client = useApolloClient()
  const router = useRouter()
  const { data } = useQuery(VIEWER)

  const handleClick = () => {
    signOut().then(() => {
      client.resetStore().then(() => {
        router.push('/signin')
      })
    })
  }

  if (data && data.viewer) {
    return (
      <button onClick={handleClick}>Logout</button>
    )
  }

  return null
}