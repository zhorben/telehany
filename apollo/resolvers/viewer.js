import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-micro'
import { jwtSecret } from '../../config/default'

import User from '../models/User'

export default async (_parent, _args, context, _info) => {
  const { token } = cookie.parse(context.req.headers.cookie ?? '')
  if (token) {
    try {
      const { id } = jwt.verify(token, jwtSecret)

      return User.findById(id)
    } catch {
      throw new AuthenticationError(
        'Authentication token is invalid, please log in'
      )
    }
  }
}