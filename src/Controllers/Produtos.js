const { index, create } = require("./Usuarios");
const knex = require("../Database/dbconfig");

module.exports = {
    async index(req, res) {
        try {
            const produtos = await knex("produtos")

            res.json({
                success: true,
                response: produtos
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Houve um erro ao conectar no banco de dados...'
            })
        }
    },

    async show(req, res) {

        const { id } = req.params

        try {
            const produto = await knex("produtos").where({id: id}).first()

            res.json({
                success: true,
                response: produto
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Houve um erro ao conectar no banco de dados...'
            })
        }
    },

    async create(req, res) {
        const {nome, descricao, valor} = req.body
        
        try {
            const produto = await knex("produtos").insert({
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
            res.status(400).json({
                success: false,
                message: error
            })
        }
    },
    
    async update(req, res) {
        const {id} = req.params
        const {nome, descricao, valor} = req.body
        
        try {
            const produto = await knex("produtos").where({id:id}).update({
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
            res.status(400).json({
                success: false,
                message: error
            })
        }
    },

    async delete(req, res) {
        const {id} = req.params
        
        try {
            const produto = await knex("produtos").where({id:id}).delete()

            res.json({
                success: true,
                response: {
                    id: id
                }
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error
            })
        }
    },
}