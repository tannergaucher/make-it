const { getUserId, AuthError } = require('../utils/get-user-id')

const Query = {
  me: async (parent, args, context) => {
    const userId = getUserId(context)
    if (!userId) {
      return null
    }
    return context.prisma.user({ id: userId })
  },
}

module.exports = {
  Query,
}
