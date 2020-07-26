const knex = require('../Database/dbconfig')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  async index (req, res) {
    try {
      const usuarios = await knex('usuarios').select('id', 'nome', 'email')

      return res.json({
        success: true,
        response: usuarios
      })
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: 'Houve um erro ao conectar no banco de dados...'
      })
    }
  },
  async show (req, res) {
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
      return res.status(400).json({
        success: false,
        message: 'Houve um erro ao conectar no banco de dados...'
      })
    }
  },
  async create (req, res) {
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
      console.log(error)
      return res.status(400).json({
        success: false,
        message: 'Houve um erro ao conectar no banco de dados...'
      })
    }
  },
  async update (req, res) {
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
      return res.status(400).json({
        success: false,
        message: 'Houve um erro ao conectar no banco de dados...'
      })
    }
  },
  async delete (req, res) {
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
      return res.status(400).json({
        success: false,
        message: 'Houve um erro ao conectar no banco de dados...'
      })
    }
  },
  async login (req, res) {
    const { email, senha } = req.body

    // Check for e-mail
    const user = await knex('usuarios').where({ email: email }).first()
    if (!user) return res.status(400).json({ success: false, message: 'E-mail ou senha inválidos' })

    const checkBcrypt = await bcrypt.compare(senha, user.senha)
    console.log(checkBcrypt)
    if (!checkBcrypt) return res.status(400).json({ success: false, message: 'E-mail ou senha inválidos' })

    const token = jwt.sign({
      id: user.id
    }, process.env.TOKEN_SECRET)

    res.json({
      success: true,
      jwtToken: token
    })
  }
}
