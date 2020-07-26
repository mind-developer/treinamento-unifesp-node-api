
exports.up = function(knex) {
  return knex.schema.createTable('pedidos', (table) => {
      table.increments()
      table.integer('id_produto').notNullable().unsigned().references('produtos.id')
      table.integer('id_usuario').notNullable().unsigned().references('usuarios.id')
      table.float('valor_total').notNullable()
      table.integer('quantidade').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('pedidos')
};
