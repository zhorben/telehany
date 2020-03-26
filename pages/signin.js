import { withApollo } from '../apollo/client'
import { SIGN_IN } from '../src/graphql/auth'
import { useMutation, useApolloClient, useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'

import { VIEWER } from '../src/graphql/user'

import Main from '../src/components/Main'
import Header from '../src/components/Header'
import Errors from '../src/components/Errors'

const SignIn = () => {
  const client = useApolloClient()
  const router = useRouter()
  const [signIn, { loading, error }] = useMutation(SIGN_IN)
  const { data } = useQuery(VIEWER)

  console.log(data, '--- data signin')

  const formik = useFormik({
    initialValues: {
      email: process.env.NODE_ENV === 'development' ? 'arthurzherko@gmail.com' : '',
      password: process.env.NODE_ENV === 'development' ? '123456' : ''
    },
    onSubmit: async ({ email, password }) => {
      await client.resetStore()
      const { data } = await signIn({ variables: { email, password }})
      if (data.signIn.user) {
        router.push('/')
      }
    }
  })

  return (
    <Main>
      <Header />

      <div className="wrapper signIn">
        <h1>Log in to Zhorben</h1>

        <form onSubmit={formik.handleSubmit}>
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
              placeholder="password"
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

export default withApollo(SignIn)