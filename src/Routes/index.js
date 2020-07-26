const express = require('express')
const routes = express.Router()
// Middlewares
const authJWT = require('../Middlewares/auth')

// Routes
const PublicRoutes = require('./PublicRoutes')
const UsuariosRoutes = require('./Usuarios')
const ProdutosRoutes = require('./Produtos')

routes.get('/', (req, res) => {
  return res.json({
    hello: 'world'
  })
})

// Public routes
routes.use(PublicRoutes)

// Middleware for authentication
// routes.use(authJWT)

// Private routes
routes.use(UsuariosRoutes)
routes.use(ProdutosRoutes)

module.exports = routes