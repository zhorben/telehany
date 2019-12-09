import { useEffect } from 'react'
import { withApollo } from '../apollo/client'
import { CONFIRM } from './graphql/auth'
import { useMutation } from '@apollo/react-hooks'
import { useRouter }  from 'next/router'

import Errors from '../components/Errors'

const Confirm = ({ verificationToken }) => {
  const router = useRouter()
  const [confirm, { loading, data, error }] = useMutation(CONFIRM, {
    variables: { verificationToken }
  })

  useEffect(() => {
    confirm()
  }, [confirm])

  if (data) {
    localStorage.setItem('token', data.confirm.token)
    router.push('/')
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