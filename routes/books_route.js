'use strict';


const express = require('express');
const router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile')[environment];
const knex = require('knex')(knexConfig);



// let authors = select authors.author_name,
//   books.title from authors
//   inner join books_authors on authors.id = books_authors.author_id
//   inner join books on
//    books.id = books_authors.book_id;

router.get('/index', (req, res) => {
  res.render('index');
  console.log("index page loaded!");
});
// knex("authors").select('*')
//   .innerJoin('books_authors', 'authors.id', 'books_authors.author_id')
//   .innerJoin('books', 'books.id', 'books_authors.book_id')
//   .then((data) => {
// -----------for Books-------------
router.get('/books', (req, res) => {
  knex("books").select('*').then((data) => {
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

router.get('/add-books', (req, res) => {
  res.render('add-books');
});

router.post('/addNewBooks', (req, res) => {
  knex('books')
    .insert({
      title: req.body.title,
      genre: req.body.genre,
      cover_url: req.body.url,
      description: req.body.description
    }, '*')
    .then((results) => {
      res.redirect('/books');

    })
});



router.delete('/delete/:id', (req, res) => {
         knex("books")
          .where('id', req.params.id)
          .first()
          .del()
          .then(()=>{
          res.sendStatus(200)
          })
  });


module.exports = router;
