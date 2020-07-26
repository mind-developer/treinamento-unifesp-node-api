const { table } = require("../dbconfig");

exports.up = function(knex) {
  return knex.schema.alterTable('usuarios', (table) => {
      table.integer('nivel_acesso')
  })
};

exports.down = function(knex) {
   return knex.schema.alterTable('usuarios', (table) => {
       table.dropColumn('nivel_acesso')
   }) 
};
