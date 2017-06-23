
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books_authors',(table)=>{
    table.increments('id').primary();
    table.integer('book_id').unsigned().references('id').inTable('books').onDelete('CASCADE');
    table.integer('author_id').unsigned().references('id').inTable('authors').onDelete('CASCADE');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books_authors');
};
