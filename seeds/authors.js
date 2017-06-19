let authorsInfo = require('../public/authors-info');

exports.seed = (knex, Promise) =>{
  return knex('authors').del()
    .then(() => {
      return knex('authors').insert(authorsInfo);
    })
    .then(() => knex.raw("SELECT setval('authors_id_seq', (SELECT MAX(id) FROM authors))"));
}
