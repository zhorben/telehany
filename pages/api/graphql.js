import { ApolloServer, AuthenticationError } from 'apollo-server-micro'
import jwt from 'jsonwebtoken'
import { schema } from '../../apollo/schema'
import { SECRET, JWT_SECRET } from '../../config/default'

const getMe = async (token) => {
  if (token) {
    try {
      const user = await jwt.verify(token, JWT_SECRET, {
        algorithm: ['HS256']
      })
      return user
    } catch (e) {
      console.log(e)
      return new AuthenticationError('Your Session expired. Sign in again.')
    }
  }
}

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    const user = await getMe(req.headers.authorization)
    return {
      me: user,
      secret: SECRET
    }
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
