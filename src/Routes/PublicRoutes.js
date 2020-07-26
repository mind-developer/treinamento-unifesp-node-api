const express = require('express');
const routes = express.Router()

// Controller
const Usuarios = require('../Controllers/Usuarios')

routes.post('/usuarios', Usuarios.create)
routes.post('/usuarios/login', Usuarios.login)

module.exports = routes