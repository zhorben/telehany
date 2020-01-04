import register from './register'
import confirm from './confirm'
import login from './login'

import Designer from '../models/Designer'

export const resolvers = {
  Query: {
    designers: async () => Designer.find(),
    designer: async (_parent, { id }) => Designer.findById(id)
  },
  Mutation: {
    register,
    confirm,
    login
  },
}
