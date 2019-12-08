import bcrypt from 'bcryptjs'

export const resolvers = {
  Query: {
    viewer(_parent, _args, _context, _info) {
      console.log(_context, '--- context')
      return { id: 1, name: 'John Smith', status: 'cached' }
    },
  },
  // Mutation: {
    // register: async (parent, { username, password }, ctx, info) => {
    //   const hashedPassword = await bcrypt.hash(password, 10)
    //   const user = await ctx.prisma.createUser({
    //     username,
    //     password: hashedPassword,
    //   })
    //   return user
    // },
  // }
}
