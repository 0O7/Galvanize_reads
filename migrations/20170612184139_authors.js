
exports.up = function(knex,Promise) {
  return knex.schema.createTable('authors',(table)=>{
    table.increments('id');
    table.string('author_name');
    table.text('author_biography');
    table.string('author_url');
    table.timestamps(true, true);
})
  };

  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('authors');
  };
