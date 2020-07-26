const express = require('express');
const routes = express.Router()

// Controller
const Produtos = require('../Controllers/Produtos')

routes.get('/produtos', Produtos.index)
routes.get('/produtos/:id', Produtos.show)
routes.post('/produtos', Produtos.create)
routes.delete('/produtos/:id', Produtos.delete)
routes.put('/produtos/:id', Produtos.update)

module.exports = routes