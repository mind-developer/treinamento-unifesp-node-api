const jwt = require('jsonwebtoken')

function auth (req, res, next) {
  const token = req.header('auth-token')

  if (!token) return res.status(401).json({
    success: false,
    message: "Acesso negado"
  })

  try {
    const jwt_payload = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
    req.jwt_payload = jwt_payload
    next()
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Token invalido'
    })
  }
}

module.exports = auth
