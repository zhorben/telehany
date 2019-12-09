import { ApolloServer, AuthenticationError } from 'apollo-server-micro'
import jwt from 'jsonwebtoken'
import { schema } from '../../apollo/schema'
import { jwtSecret } from '../../config/default'

const getMe = async (token) => {
  if (token) {
    try {
      return await jwt.verify(token, jwtSecret, {
        algorithm: ['HS256']
      })
    } catch (e) {
      console.log(e)
      return new AuthenticationError('Your Session expired. Sign in again.')
    }
  }
}

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    const user = await getMe(req.headers.authorization.split(' ')[1] || '')

    return {
      me: user
    }
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
