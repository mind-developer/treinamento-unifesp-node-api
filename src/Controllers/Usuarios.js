const knex = require('../Database/dbconfig')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  async index (req, res, next) {
    try {
      const usuarios = await knex('usuarios').select('id', 'nome', 'email')

      return res.json({
        success: true,
        response: usuarios
      })
    } catch (error) {
      error.status = 400
      next(error)
    }
  },
  
  async show (req, res, next) {
    const { id } = req.params

    try {
      const usuario = await knex('usuarios').select('id', 'nome', 'email').where({
        id: id
      }).first()

      return res.json({
        success: true,
        response: usuario
      })
    } catch (error) {
      error.status = 400
      next(error)
    }
  },
  
  async create (req, res, next) {
    const { nome, email, senha } = req.body

    const senhaBcrypt = await bcrypt.hash(senha, 10)

    try {
      const usuario = await knex('usuarios').insert({
        nome: nome,
        email: email,
        senha: senhaBcrypt
      })

      return res.json({
        success: true,
        response: {
          id: usuario[0],
          nome: nome,
          email: email
        }
      })
    } catch (error) {
      // Valida email duplicado
      if(error.errno === 1062){
        error = new Error('E-mail já cadastrado')
      }
      error.status = 400
      next(error)
    }
  },

  async update (req, res, next) {
    const { id } = req.params
    const { nome, email } = req.body

    try {
      const usuario = await knex('usuarios').where({
        id: id
      }).update({
        nome: nome,
        email: email
      })

      return res.json({
        success: true,
        update: usuario[0],
        response: {
          id: id,
          nome: nome,
          email: email
        }
      })
    } catch (error) {
      console.log(error)
      error.status = 400
      next(error)
    }
  },

  async delete (req, res, next) {
    const { id } = req.params

    try {
      const usuario = await knex('usuarios').where({
        id: id
      }).delete()

      return res.json({
        success: true,
        response: usuario
      })
    } catch (error) {
      error.status = 400
      next(error)
    }
  },

  async login (req, res, next) {
    const { email, senha } = req.body

    // Check for e-mail
    const user = await knex('usuarios').where({ email: email }).first()
    if (!user) return res.status(400).json({ success: false, message: 'E-mail ou senha inválidos' })

    // Check for bcrypt pass
    const checkBcrypt = await bcrypt.compare(senha, user.senha)
    if (!checkBcrypt) return res.status(400).json({ success: false, message: 'E-mail ou senha inválidos' })

    // Generate jwt
    const token = jwt.sign({
      id: user.id
    }, process.env.JWT_TOKEN_SECRET)

    res.json({
      success: true,
      jwtToken: token
    })
  }
}