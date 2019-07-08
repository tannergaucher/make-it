const { verify } = require('jsonwebtoken')

class AuthError extends Error {
  constructor() {
    super(`You are not authorized`)
  }
}

function getUserId(context) {
  const Authorization = context.request.get('Authorization')

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, process.env.APP_SECRET)

    return {
      token,
      verifiedToken,
    }
  }
}

module.exports = {
  getUserId,
  AuthError,
}
