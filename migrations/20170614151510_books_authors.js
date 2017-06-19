
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books_authors',(table)=>{
    table.increments('id');
    table.integer('book_id');
    table.integer('author_id');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books_authors');
};
