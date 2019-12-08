import { useState } from 'react'
import { withApollo } from '../apollo/client'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { REGISTER } from './graphql/auth'

const VIEWER = gql`
  query ViewerQuery {
    viewer {
      id
      displayName
    }
  }
`

const Index = () => {
  const {
    data: { viewer },
  } = useQuery(VIEWER)

  const [displayName, updateName] = useState('Mr. Arthur')
  const [password, updatePassword] = useState('123456')
  const [email, updateEmail] = useState('arthurzherko@gmail.com')

  const [register, { data }] = useMutation(REGISTER, {
    variables: { displayName, password, email }
  })

  const submitForm = (event) => {
    register(email, password, displayName)
  }

  if (data) {
    console.log(data)
  }

  if (viewer) {
    return (
      <div>
        You're signed in as {viewer.displayName} and you're goto{' '}
        <Link href="/about">
          <a>static</a>
        </Link>{' '}
        page.

        <br/>

        <div>
          <input value={displayName} onChange={(evt) => updateName(evt.target.value)} type="text"/>
          <input value={password} onChange={(evt) => updatePassword(evt.target.value)} type="text"/>
          <input value={email} onChange={(evt) => updateEmail(evt.target.value)} type="text"/>

          <button onClick={submitForm}>Submit</button>
        </div>

        <style jsx>
        {`
          input {
            display: block;
          }

          button {
            margin-top: 15px;
          }
        `}
        </style>
      </div>
    )
  }

  return null
}

export default withApollo(Index)
