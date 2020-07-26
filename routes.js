const express = require('express')
const routes = express.Router()

// Middlewares
const authJWT = require('./src/Middlewares/auth')

// Controllers
const Usuarios = require('./src/Controllers/Usuarios')

routes.get('/', (req, res) => {
  return res.json({
    hello: 'world'
  })
})

// Rotas abertas
routes.post('/usuarios', Usuarios.create)
routes.post('/usuarios/login', Usuarios.login)

// auth middleware
routes.use(authJWT)

// Rotas privadas
routes.get('/usuarios', Usuarios.index)
routes.get('/usuarios/:id', Usuarios.show)
routes.put('/usuarios/:id', Usuarios.update)
routes.delete('/usuarios/:id', Usuarios.delete)


module.exports = routes
