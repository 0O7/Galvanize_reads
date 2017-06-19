
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books',(table)=>{
    table.increments('id');
    table.string('title');
    table.string('genre');
    table.text('description');
    table.text('cover_url');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
