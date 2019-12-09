import { LOGIN } from '../pages/graphql/auth'
import { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useRouter }  from 'next/router'
import Errors from './Errors'

export default function Register() {
  const router = useRouter()
  const [password, updatePassword] = useState('123456')
  const [email, updateEmail] = useState('arthurzherko@gmail.com')
  
  const [login, { loading, data, error }] = useMutation(LOGIN, {
    variables: { password, email }
  })

  if (data) {
    localStorage.setItem('token', data.login.token)
    router.push('/')
  }
  
  return (
    <React.Fragment>
      <div className="register">
        <input value={email} onChange={(evt) => updateEmail(evt.target.value)} type="text"/>
        <input value={password} onChange={(evt) => updatePassword(evt.target.value)} type="password"/>

        <button onClick={() => login(email, password)}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
        
        {/* {data && (
          <div>User {data.register.displayName} was successfully registered!</div>
        )} */}
      </div>

      <Errors error={error} />

      <style jsx>{`
        input {
          display: block;
          width: 300px;
          padding: 5px 10px;
          margin-bottom: 10px;
        }

        .register,
        button {
          margin: 15px 0;
        }
      `}</style>
    </React.Fragment>
  )
}