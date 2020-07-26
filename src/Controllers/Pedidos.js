const knex = require("../Database/dbconfig");

module.exports = {
    async index(req, res) {
        try {
            const produtos = await knex("pedidos")

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
            const produto = await knex("pedidos").where({
                id: id
            }).first()

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

    async create (req, res) {
        const {id_usuario, id_produto, quantidade} = req.body
        

        try {
            const produto = await knex('produtos').where({id: id_produto}).first()
            
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
                    valor_total: valor_total,
                }
            })
        } catch (error) {
            res.status(400).json({
                success: false, 
                message: 'Houve um erro ao conectar no banco de dados...'
            }) 

        }
    },

    async update (req, res) {
        const { id } = req.params
        const {id_usuario, id_produto, quantidade} = req.body

        try {
            const produto = await knex('produtos').where({id: id_produto}).first()
            
            const valor_total = quantidade * produto.valor

            const pedido = await knex('pedidos').where({id: id}).update({
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
                    valor_total: valor_total,
                }
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Houve um erro ao conectar no banco de dados...'
            })

        }
    },

    async delete (req, res) {
        const { id } = req.params

        try {
            const pedido = await knex('pedidos').where({id: id}).delete()

            res.json({
                success: true,
                response: {
                    id: id
                }
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Houve um erro ao conectar no banco de dados...'
            })

        }
    },

    async showByUsuario (req, res) {
        const { id_usuario } = req.params
        try {
            const produtos = await knex("pedidos").where({
                id_usuario: id_usuario
            })

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

    async showByProduto (req, res) {
        const { id_produto } = req.params
        try {
            const produtos = await knex("pedidos").where({
                id_produto: id_produto
            })

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

}