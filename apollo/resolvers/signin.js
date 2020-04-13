import User from '../models/User'
import bcrypt from 'bcrypt'
import cookie from 'cookie'
import { createToken } from '../connectors/jwt'
import { UserInputError, AuthenticationError } from 'apollo-server-micro'
import { jwtSecret } from '../../config/default'

export default async (_parent, args, context) => {  
  
  const user = await User.findOne({ email: args.input.email })

  if (!user) {
    throw new UserInputError('User not found')
  }

  const passwordIsValid = await bcrypt.compareSync(args.input.password, user.password)

  if (!passwordIsValid) {
    throw new AuthenticationError('Invalid email and password combination')
  }

  const token = await createToken(user, jwtSecret)

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
}
