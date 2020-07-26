const jwt = require('jsonwebtoken')

function auth (req, res, next) {
  const token = req.header('auth-token')

  if (!token) return res.status(401).send('Access denied')

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
    req.user = verifiedToken
    next()
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Token invalido'
    })
  }
}

module.exports = auth
