import signUp from './signup'
import signIn from './signin'
import signOut from './signout'
import confirm from './confirm'
import viewer from './viewer'

import Designer from '../models/Designer'

export const resolvers = {
  Query: {
    viewer,
    designers: async () => Designer.find(),
    designer: async (_parent, args) => Designer.findById(args.id)
  },
  Mutation: {
    signUp,
    signIn,
    signOut,
    confirm
  },
}
