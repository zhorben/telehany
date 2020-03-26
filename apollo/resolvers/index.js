import signUp from './signup'
import signIn from './signin'
import signOut from './signout'
import confirm from './confirm'
import viewer from './viewer'
import cookie from 'cookie'

import Designer from '../models/Designer'
import User from '../models/User'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { jwtSecret } from '../../config/default'

export const resolvers = {
  Query: {
    async viewer(_parent, _args, context, _info) {
      const { token } = cookie.parse(context.req.headers.cookie ?? '')
      console.log(token, '--- token')
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
    },
    designers: async () => Designer.find(),
    designer: async (_parent, args) => Designer.findById(args.id)
  },
  Mutation: {
    signUp,
    async signIn(_parent, args, context, _info) {
      const user = await User.findOne({ email: args.input.email })

      if (!user) {
        throw new UserInputError('User not found')
      }

      const passwordIsValid = await bcrypt.compareSync(args.input.password, user.password)

      if (!passwordIsValid) {
        throw new AuthenticationError('Invalid email and password combination')
      }

      const token = jwt.sign(
        { email: user.email, id: user.id, time: new Date() },
        jwtSecret,
        {
          expiresIn: '6h',
        }
      )

      context.res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', token, {
          httpOnly: true,
          maxAge: 6 * 60 * 60,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        })
      )

      return { user }
    },
    async signOut(_parent, _args, context, _info) {
      context.res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', '', {
          httpOnly: true,
          maxAge: -1,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        })
      )

      return true
    },
    confirm
  },
}
