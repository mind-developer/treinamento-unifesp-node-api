const express = require('express');
const routes = express.Router()

// Controller
const Pedidos = require('../Controllers/Pedidos')

routes.get('/pedidos', Pedidos.index)
routes.get('/pedidos/:id', Pedidos.show)
routes.post('/pedidos', Pedidos.create)
routes.delete('/pedidos/:id', Pedidos.delete)
routes.put('/pedidos/:id', Pedidos.update)

module.exports = routes