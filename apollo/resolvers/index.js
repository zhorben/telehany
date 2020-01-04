import register from './register'
import confirm from './confirm'
import login from './login'

import Designer from '../models/Designer'

export const resolvers = {
  Query: {
    designers: async () => Designer.find()
  },
  Mutation: {
    register,
    confirm,
    login
  },
}
