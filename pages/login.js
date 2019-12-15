import { useContext } from 'react'
import { withApollo } from '../apollo/client'
import { LOGIN } from '../src/graphql/auth'
import { useMutation } from '@apollo/react-hooks'
import Router from 'next/router'
import { AuthContext } from '../src/contexts/AuthContext'
import { useFormik } from 'formik'

import Main from '../src/components/Main'
import Header from '../src/components/Header'
import Errors from '../src/components/Errors'

const Login = () => {
  const { setAuth } = useContext(AuthContext)

  const formik = useFormik({
    initialValues: {
      email: 'arthurzherko@gmail.com',
      password: '123456'
    },
    onSubmit: ({ email, password }) => login({ variables: { email, password }})
  })

  const [login, { loading, data, error }] = useMutation(LOGIN)

  if (data) {
    window.localStorage.setItem('token', data.login.token)
    setAuth(true)
    Router.push('/')
  }

  return (
    <Main>

      <Header />

      <div className="wrapper">
        <h1>Log in to Zhorben</h1>

        <form onSubmit={formik.handleSubmit}>
            <input
              name="email"
              type="email"
              className="input"
              onChange={formik.handleChange}
              value={formik.values.email}
            />

            <input
              name="password"
              type="password"
              className="input"
              onChange={formik.handleChange}
              value={formik.values.password}
            />

            <button type="submit">{loading ? 'Loading...' : 'Continue'}</button>
          </form>
      </div>

      <Errors error={error} />

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
      `}</style>

    </Main>
  )
}

export default withApollo(Login)