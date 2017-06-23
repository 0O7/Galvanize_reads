'use strict';

const express = require('express');
const router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile')[environment];
const knex = require('knex')(knexConfig);


router.get('/index', (req, res) => {
  res.render('index');
  console.log("index page loaded!");
});
// -----------for Authors-------------
router.get('/authors', (req, res) => {
  knex("books").select('*')
    .innerJoin('books_authors', 'books.id', 'books_authors.book_id')
    .innerJoin('authors', 'authors.id', 'books_authors.author_id')
    .then((data) => {
      console.log(data);
      res.render('authors', {
        data
      });
    });
});

// Redirects to author-profile
router.get('/authors/:id', (req, res) => {
  knex("authors")
    .where('id', req.params.id)
    .orderBy('id', 'asc')
    .first()
    .then((data) => {
      res.render('author_profile', {
        data
      });
    });
});

router.get('/add-author', (req, res) => {
  knex('authors')
    .then((data) => {
      res.render('add-authors',{
        data
      });
    })
});

// Redirects to edit-books page'
router.get('/edit-authors/:id', (req, res) => {
  knex('authors')
    .where('id', req.params.id)
    .first()
    .then((data) => {
      res.render('edit-authors', {
        data
      })
    });
});

// adding new author data
router.post('/authors', (req, res) => {
  console.log(req.body);
  knex('authors')
    .insert({
      author_name: req.body.name,
      author_biography: req.body.biography,
      author_url: req.body.url
    }, '*')
    .then((results) => {
      res.sendStatus(200)
    })
});
// Updating a book
router.patch('/authors/:id', (req, res) => {
  knex('authors')
    .where('id', req.params.id)
    .update({
      author_name: req.body.title,
      author_url: req.body.url,
      author_biography: req.body.biography
    }, '*')
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log((err));
    })
});


//AJAX call to delete selected author
router.delete('/authors/delete/:id', (req, res) => {
  console.log('it is about to be deleted');
  knex('authors')
    .where('id', req.params.id)
    .first()
    .del()
    .then(() => {
      console.log('deleted');
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log(err);
    })
});

module.exports = router;
