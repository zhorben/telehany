import App from 'next/app'
import Head from 'next/head'
import { AuthProvider } from '../src/contexts/AuthContext'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <AuthProvider>
        <Head>
            <title>Zhorben</title>
            <link rel="manifest" href="/static/manifest.json"/>
        </Head>
        <Component {...pageProps} />
      </AuthProvider>
    )
  }
}

export default MyApp
