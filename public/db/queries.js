const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../../knexfile')[environment];
const knex = require('knex')(knexConfig);


function getBooks() {
  knex("books").select('*')
    .innerJoin('books_authors', 'books.id', 'books_authors.books_id')
    .innerJoin('authors', 'authors.id', 'books_authors.authors_id');
}
