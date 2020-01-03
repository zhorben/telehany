import register from './register'
import confirm from './confirm'
import login from './login'

import Designer from '../models/Designer'

export const resolvers = {
  Query: {
    designers: async () => Designer.find(),
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
