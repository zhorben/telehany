import { useEffect } from 'react'
import { withApollo } from '../apollo/client'
import { CONFIRM } from '../src/graphql/auth'
import { useMutation } from '@apollo/react-hooks'
import Router from 'next/router'

import Errors from '../src/components/Errors'

const Confirm = ({ verificationToken }) => {
  const [confirm, { loading, data, error }] = useMutation(CONFIRM, {
    variables: { verificationToken }
  })

  useEffect(() => {
    confirm()
  }, [confirm])

  if (data) {
    localStorage.setItem('token', data.confirm.token)
    Router.push('/')
  }

  return (
    <div>
      Confirmation Page

      <Errors error={error} />
      
    </div>
  )
}

Confirm.getInitialProps = async ({ query: { verificationToken } }) => ({ verificationToken })

export default withApollo(Confirm)