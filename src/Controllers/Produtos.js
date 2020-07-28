const knex = require('../Database/dbconfig')

module.exports = {
  async index (req, res, next) {
    try {
      const produtos = await knex('produtos')

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
      const produto = await knex('produtos').where({ id: id }).first()

      res.json({
        success: true,
        response: produto
      })
    } catch (error) {
      error.status = 400
      next(error)
    }
  },

  async create (req, res, next) {
    const { nome, descricao, valor } = req.body

    try {
      const produto = await knex('produtos').insert({
        nome: nome,
        descricao: descricao,
        valor: valor
      })

      res.json({
        success: true,
        response: {
          id: produto[0],
          nome: nome,
          descricao: descricao,
          valor: valor
        }
      })
    } catch (error) {
      error.status = 400
      next(error)
    }
  },

  async update (req, res, next) {
    const { id } = req.params
    const { nome, descricao, valor } = req.body

    try {
      const produto = await knex('produtos').where({ id: id }).update({
        nome: nome,
        descricao: descricao,
        valor: valor
      })

      res.json({
        success: true,
        response: {
          id: id,
          nome: nome,
          descricao: descricao,
          valor: valor
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
      const produto = await knex('produtos').where({ id: id }).delete()

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
  }
}
