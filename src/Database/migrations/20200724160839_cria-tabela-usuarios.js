
exports.up = function (knex) {
  return knex.schema.createTable('usuarios', (table) => {
    table.increments()
    table.string('nome', 100).notNullable()
    table.string('email', 255).notNullable()
    table.string('senha', 60).notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('usuarios')
}
