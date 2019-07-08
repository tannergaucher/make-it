const { hash, compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')

const Mutation = {
  signup: async (parent, { email, password }, context) => {
    const hashedPassword = await hash(password, 10)

    const user = await context.prisma.createUser({
      email,
      password: hashedPassword,
    })

    const token = sign({ userId: user.id }, process.env.APP_SECRET)

    return {
      user,
      token,
    }
  },
  login: async (parent, args, context) => {
    const user = await context.prisma.user({ email })
    if (!user) {
      throw new Error(`No user found for this email`)
    }

    const passwordValid = await compare(password, user.password)

    if (!passwordValid) {
      throw new Error(`Invalid Password`)
    }

    const token = sign({ userId: user.id }, process.env.APP_SECRET)

    return {
      user,
      token,
    }
  },
  logout: async (parent, args, context) => {
    return { message: 'Goodbye' }
  },
}

module.exports = {
  Mutation,
}
