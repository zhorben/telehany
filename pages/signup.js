import React from 'react'
import { withApollo } from '../apollo/client'
import { useFormik } from 'formik'
import { SIGN_UP } from '../src/graphql/auth'
import { useMutation } from '@apollo/react-hooks'
import { useRouter } from 'next/router'

import Main from '../src/components/Main'
import Header from '../src/components/Header'
import Errors from '../src/components/Errors'

const SignUp = () => {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      password: ''
    },
    onSubmit: ({ displayName, password, email }) => signUp({ variables: { displayName, password, email }})
  })

  const [signUp, { loading, data, error }] = useMutation(SIGN_UP)

  if (data) {
    // router.push('/login')
  }

  return (
    <Main>
      <Header />

      <div className="wrapper signUp">
        <h1>Sign Up for Zhorben</h1>

        <form onSubmit={formik.handleSubmit}>
            <input
              required
              name="displayName"
              type="text"
              className="input"
              placeholder="First Name"
              onChange={formik.handleChange}
              value={formik.values.displayName}
            />

            <input
              required
              name="email"
              type="email"
              className="input"
              placeholder="you@domain.com"
              onChange={formik.handleChange}
              value={formik.values.email}
            />

            <input
              required
              name="password"
              type="password"
              className="input"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />

            <button type="submit">{loading ? 'Loading...' : 'Continue'}</button>

            <Errors error={error} />
          </form>
      </div>

      <style jsx>{`
        h1 {
          font-size: 3rem;
        }

        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 260px;
        }

        .input {
          display: block;
          width: 100%;
          margin-bottom: 10px;
        }

        .wrapper {
          min-height: calc(100vh - 80px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        button {
          background: #25292E;
          border: 1px solid #25292E;
          height: 40px;
          line-height: 38px;
          padding: 0 25px;
          font-size: 0.875rem;
          cursor: pointer;
          border-radius: 6px;
          color: #fff;
          width: 100%;
        }

        button:hover {
          color: #25292E;
          background: transparent;
          transition: all 0.2s ease;
        }

        :global(.errors) {
          margin-top: 15px;
        }
      `}</style>
    </Main>  
  )
}

export default withApollo(SignUp)