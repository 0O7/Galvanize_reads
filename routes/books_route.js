'use strict';

const express = require('express');
const router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile')[environment];
const knex = require('knex')(knexConfig);

// let authors = select books.id,books.title, books_authors.book_id, authors.id,authors.author_name, books_authors.author_id from books
//   inner join books_authors on books.id = books_authors.book_id
//   inner join authors on
//    authors.id = books_authors.author_id;


router.get('/index', (req, res) => {
  res.render('index');

});

// -----------for Books-------------
router.get('/books', (req, res) => {
  knex("books").select('*')
    .innerJoin('books_authors', 'books.id', 'books_authors.book_id')
    .innerJoin('authors', 'authors.id', 'books_authors.author_id')
    .then((data) => {
      // console.log(data);
      res.render('books', {
        data
      });
    });
});



router.get('/books/:id', (req, res) => {
  knex("books")
    .where('id', req.params.id)
    .orderBy('id', 'asc')
    .first()
    .then((data) => {
      res.render('books_profile', {
        data
      });
    });
});



// Redirects to add-books page'
router.get('/add-books', (req, res) => {
  knex('authors')
    .then((data) => {
      res.render('add-books', {
        data
      })
    })
});

// Redirects to edit-books page'
router.get('/edit-books/:id', (req, res) => {
  knex('books')
    .where('id', req.params.id)
    .first()
    .then((data) => {

      res.render('edit-books', {
        data
      })
    });
});
// adding a book
router.post('/books/add', (req, res) => {
  let authorID = req.body.author_id;
  knex('books')
    .insert({
      title: req.body.title,
      genre: req.body.genre,
      cover_url: req.body.url,
      description: req.body.description
    })
    .returning('id')
    .then((results) => {
      return knex('books_authors')
        .insert({
          book_id: results[0],
          author_id: authorID
        })
    })
    .then((results) => {
      res.redirect("/books");

    })
});

// Updating a book
router.patch('/books/:id', (req, res) => {
  knex('books')
    .where('id', req.params.id)
    .update({
      title: req.body.title,
      genre: req.body.genre,
      cover_url: req.body.url,
      description: req.body.description
    }, '*')
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log((err));
    })
});


//AJAX call to delete selected book
router.delete('/books/delete/:id', (req, res) => {
  const bookID= req.params.id;
  console.log(bookID);
  knex('books_authors')
  .del()
    .where('book_id',bookID)

    .then(() => {
      return knex("books")
        .first()
        .del()
        .where('id', bookID)
        .then(() => {
          res.sendStatus(200)
        })
        .catch((err) => {
          console.log(err);
        })

    })
});


module.exports = router;
