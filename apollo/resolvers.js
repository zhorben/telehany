import bcrypt from 'bcryptjs'
import User from '../models/User'
import { UserInputError } from 'apollo-server-micro'

export const resolvers = {
  Query: {
    viewer(_parent, _args, _context, _info) {
      return { id: 1, displayName: 'John Smith' }
    },
  },
  Mutation: {
    register: async (_parent, { email, password, displayName }) => {
      const hashedPassword = await bcrypt.hash(password, 10)
      const checkIfExists = await User.findOne({ email }).then()

      console.log(checkIfExists, '--- checkIfExists')

      if (checkIfExists) {
        console.log('--- yes')
        errors.email = 'User with that email already exists'
        throw new UserInputError('Sign up failed!', { errors })
      } else {
        const user = await User.create({
          email,
          displayName,
          password: hashedPassword
        })
        
        return user
      }
    }
  },
}
