const express = require('express')
const routes = express.Router()

// Middlewares
const authJWT = require('../Middlewares/authJWT')
const handleError = require('../Middlewares/handleError')

// Routes
const PublicRoutes = require('./PublicRoutes')
const UsuariosRoutes = require('./Usuarios')
const ProdutosRoutes = require('./Produtos')
const PedidosRoutes = require('./Pedidos')

routes.get('/', (req, res) => {
  return res.json({
    hello: 'world'
  })
})

// Public routes
routes.use(PublicRoutes)

// Middleware for authentication
routes.use(authJWT)

// Private routes
routes.use(UsuariosRoutes)
routes.use(ProdutosRoutes)
routes.use(PedidosRoutes)

routes.use((req, res, next) => {
  const error = new Error('Request not found')
  error.status = 404
  next(error)
})

routes.use(handleError)

module.exports = routes
