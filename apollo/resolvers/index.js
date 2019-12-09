import register from './register'
import confirm from './confirm'
import login from './login'

export const resolvers = {
  Query: {
    viewer(_parent, _args, _context, _info) {
      return { id: 1, displayName: 'John Smith' }
    },
  },
  Mutation: {
    register,
    confirm,
    login
  },
}
