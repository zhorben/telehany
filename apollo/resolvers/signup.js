import bcrypt from 'bcrypt'
import config from '../../config/default'
import User from '../models/User'
import { sendMail } from '../libs/sendMail'
import { UserInputError } from 'apollo-server-micro'
import v4 from 'uuid/v4'

export default async (_parent, args) => {
  const salt = bcrypt.genSaltSync()
  const hashedPassword = await bcrypt.hashSync(args.input.password, salt)
  const checkIfExists = await User.findOne({ email: args.input.email })

  if (checkIfExists) {
    throw new UserInputError('User with that email already exists')
  }

  const verificationToken = v4()

  const user = await User.create({
    email: args.input.email.toLowerCase(),
    displayName: args.input.displayName,
    verificationToken,
    verifiedEmail: false,
    password: hashedPassword
  })

  await sendMail({
    to: user.email,
    subject: 'Подтвердите почту',
    template: 'confirmation',
    locals: {
      link: config.server.siteHost + '/confirm/' + verificationToken
    },
  })
  
  return user
}