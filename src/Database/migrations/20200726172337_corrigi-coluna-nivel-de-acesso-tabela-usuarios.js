
exports.up = function(knex) {
  return knex.schema.alterTable('usuarios', (table) => {
      table.integer('nivel_acesso').notNullable().defaultTo(1).comment("0 - Desativado | 1 - Usuario comum | 999 - Administrador").alter()
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('usuarios', (table) => {
      table.integer('nivel_acesso').nullable().defaultTo(null).comment("").alter()
  })
};
