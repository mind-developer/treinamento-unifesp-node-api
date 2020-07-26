const express = require('express');
const routes = express.Router()

// Controllers
const Usuarios = require('../Controllers/Usuarios')

routes.get('/usuarios', Usuarios.index)
routes.get('/usuarios/:id', Usuarios.show)
routes.put('/usuarios/:id', Usuarios.update)
routes.delete('/usuarios/:id', Usuarios.delete)

module.exports = routes