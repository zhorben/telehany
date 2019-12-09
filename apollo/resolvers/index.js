import register from './register'
import confirm from './confirm'

export const resolvers = {
  Query: {
    viewer(_parent, _args, _context, _info) {
      return { id: 1, displayName: 'John Smith' }
    },
  },
  Mutation: {
    register,
    confirm
  },
}
