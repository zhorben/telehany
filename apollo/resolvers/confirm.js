import User from '../models/User'
import { createToken } from '../connectors/jwt'
import { AuthenticationError } from 'apollo-server-micro'
import { jwtSecret } from '../../config/default'

export default async (_parent, { verificationToken }) => {
  const user = await User.findOne({ verificationToken })

  if (!user) {
    throw new AuthenticationError('Ссылка подтверждения недействительна или устарела')
  }

  if (!user.verifiedEmail) {
    user.verifiedEmail = true
  }

  user.verificationToken = undefined

  await user.save()

  const token = await createToken(user, jwtSecret)

  return { token }
}