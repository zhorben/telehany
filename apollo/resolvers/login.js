import User from '../models/User'
import bcrypt from 'bcryptjs'
import { createToken } from '../connectors/jwt'
import { UserInputError, AuthenticationError } from 'apollo-server-micro'
import { jwtSecret } from '../../config/default'

export default async (_parent, { email, password }) => {
  const user = await User.findOne({ email }).then(async user => {
    if (!user) {
      throw new UserInputError('User not found')
    }

    const passwordIsValid = await bcrypt.compare(password, user.password)

    if (!passwordIsValid) {
      throw new AuthenticationError('Invalid login/password!')
    }

    return user
  })
  
  const token = await createToken(user, jwtSecret)

  return { token }
}
