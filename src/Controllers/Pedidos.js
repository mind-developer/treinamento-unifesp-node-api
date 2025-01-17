const knex = require('../Database/dbconfig')

module.exports = {
  async index (req, res, next) {
    try {
      const produtos = await knex('pedidos')

      res.json({
        success: true,
        response: produtos
      })
    } catch (error) {
      error.status = 400
      next(error)
    }
  },

  async show (req, res, next) {
    const { id } = req.params
    try {
      const pedido = await knex('pedidos').where({
        id: id
      }).first()

      res.json({
        success: true,
        response: pedido
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Houve um erro ao conectar no banco de dados...'
      })
    }
  },

  async create (req, res, next) {
    const { id_usuario, id_produto, quantidade } = req.body

    try {
      const produto = await knex('produtos').where({ id: id_produto }).first()

      const valor_total = quantidade * produto.valor

      const pedido = await knex('pedidos').insert({
        id_produto: id_produto,
        id_usuario: id_usuario,
        quantidade: quantidade,
        valor_total: valor_total
      })

      res.json({
        success: true,
        response: {
          id: pedido[0],
          id_usuario: id_usuario,
          id_produto: id_produto,
          quantidade: quantidade,
          valor_total: valor_total
        }
      })
    } catch (error) {
      error.status = 400
      next(error)
    }
  },

  async update (req, res, next) {
    const { id } = req.params
    const { id_usuario, id_produto, quantidade } = req.body

    try {
      const produto = await knex('produtos').where({ id: id_produto }).first()

      const valor_total = quantidade * produto.valor

      const pedido = await knex('pedidos').where({ id: id }).update({
        id_produto: id_produto,
        id_usuario: id_usuario,
        quantidade: quantidade,
        valor_total: valor_total
      })

      res.json({
        success: true,
        response: {
          id: id,
          id_usuario: id_usuario,
          id_produto: id_produto,
          quantidade: quantidade,
          valor_total: valor_total
        }
      })
    } catch (error) {
      error.status = 400
      next(error)
    }
  },

  async delete (req, res, next) {
    const { id } = req.params

    try {
      const pedido = await knex('pedidos').where({ id: id }).delete()

      res.json({
        success: true,
        response: {
          id: id
        }
      })
    } catch (error) {
      error.status = 400
      next(error)
    }
  },

  async showByUsuario (req, res, next) {
    const { id_usuario } = req.params
    try {
      const pedido = await knex('pedidos').where({
        id_usuario: id_usuario
      })

      res.json({
        success: true,
        response: pedido
      })
    } catch (error) {
      error.status = 400
      next(error)
    }
  },

  async showByProduto (req, res, next) {
    const { id_produto } = req.params
    try {
      const pedido = await knex('pedidos').where({
        id_produto: id_produto
      })

      res.json({
        success: true,
        response: pedido
      })
    } catch (error) {
      error.status = 400
      next(error)
    }
  }

}
