import { REGISTER } from '../../pages/graphql/auth'
import { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import Errors from './Errors'

export default function Register() {
  const [displayName, updateName] = useState('Mr. Arthur')
  const [password, updatePassword] = useState('123456')
  const [email, updateEmail] = useState('arthurzherko@gmail.com')

  const [register, { loading, data, error }] = useMutation(REGISTER, {
    variables: { displayName, password, email }
  })
  
  return (
    <React.Fragment>
      <div className="register">
        <input value={displayName} onChange={(evt) => updateName(evt.target.value)} type="text"/>
        <input value={password} onChange={(evt) => updatePassword(evt.target.value)} type="password"/>
        <input value={email} onChange={(evt) => updateEmail(evt.target.value)} type="text"/>

        <button onClick={() => register(email, password, displayName)}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
        
        {data && (
          <div>User {data.register.displayName} was successfully registered!</div>
        )}
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