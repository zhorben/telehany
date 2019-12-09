import bcrypt from 'bcryptjs'
import config from '../../config/default'
import User from '../../models/User'
import { sendMail } from '../../libs/sendMail'
import { UserInputError } from 'apollo-server-micro'
import uuid4 from 'uuid4'

export default async (_parent, { email, password, displayName }) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const checkIfExists = await User.findOne({ email }).then()

  if (checkIfExists) {
    throw new UserInputError('User with that email already exists')
  }

  const verificationToken = uuid4()

  const user = await User.create({
    email: email.toLowerCase(),
    displayName,
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