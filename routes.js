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

routes.get('/usuarios', authJWT, Usuarios.index)
routes.get('/usuarios/:id', Usuarios.show)
routes.post('/usuarios', Usuarios.create)
routes.put('/usuarios/:id', Usuarios.update)
routes.delete('/usuarios/:id', Usuarios.delete)

routes.post('/usuarios/login', Usuarios.login)

module.exports = routes
