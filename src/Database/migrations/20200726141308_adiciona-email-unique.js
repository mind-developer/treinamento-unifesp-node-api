
exports.up = function (knex) {
  return knex.schema.alterTable('usuarios', (table) => {
    table.unique('email')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('usuarios', (table) => {
    table.dropUnique('email')
  })
}
