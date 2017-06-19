let booksInfo = require('../public/books-info');

exports.seed = (knex, Promise) => {
  return knex('books').del()
    .then(() => {
      return knex('books').insert(booksInfo);
    })
    .then(() => knex.raw("SELECT setval('books_id_seq', (SELECT MAX(id) FROM books))"));
}
