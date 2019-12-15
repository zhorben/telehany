import { withApollo } from '../apollo/client'
import { useState } from 'react'

import Register from '../src/components/Register'
import Login from '../src/components/Login'
import Main from '../src/components/Main'
import Header from '../src/components/Header'

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login')

  return (
    <Main>

      <Header />

      <h1>Log in to Zhorben</h1>

      {activeTab === 'login'
        ? <Login />
        : <Register />
      }

      <style jsx>{`
        button {
          margin-top: 30px;
          margin-right: 10px;
        }
      `}</style>
    </Main>
  )
}

export default withApollo(Auth)