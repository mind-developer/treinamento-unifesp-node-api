
exports.up = function(knex) {
    return knex.schema.createTable('produtos', (table) => {
        table.increments()
        table.string('nome', 255).notNullable()
        table.text('descricao').notNullable()
        table.float('valor').notNullable().defaultTo(0)
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('produtos')
};
