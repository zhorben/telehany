import { useContext } from 'react'
import Router from 'next/router'

import { AuthContext } from '../contexts/AuthContext'

const privatePage = (WrappedComponent) => (props) => {
  const { isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) {
    Router.replace('/auth')
  }

  return (
    <WrappedComponent {...props} />
  )
}

export default privatePage
