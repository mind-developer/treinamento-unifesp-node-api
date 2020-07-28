const jwt = require('jsonwebtoken')

function auth (req, res, next) {
  const token = req.header('auth-token')

  if (!token) {
    error = new Error('Acesso negado')
    error.status = 401
    next(error)
  }

  try {
    const jwt_payload = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
    req.jwt_payload = jwt_payload
    next()
  } catch (error) {
    error = new Error('Token inválido')
    error.status = 401
    next(error)
  }
}

module.exports = auth
