const express = require('express')
const routes = express.Router()

// Controllers
const Usuarios = require('./src/Controllers/Usuarios')

routes.get('/', (req, res) => {
  return res.json({
    hello: 'world'
  })
})

routes.get('/usuarios', Usuarios.index)
routes.get('/usuarios/:id', Usuarios.show)
routes.post('/usuarios', Usuarios.create)
routes.put('/usuarios/:id', Usuarios.update)
routes.delete('/usuarios/:id', Usuarios.delete)

module.exports = routes
