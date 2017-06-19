'use strict';

const express = require('express');
const router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile')[environment];
const knex = require('knex')(knexConfig);


// -----------for Authors-------------
router.get('/authors', (req, res) => {
  knex("authors").then((data) => {
    console.log('reaaaadding authors');
    res.render('authors', {
      data
    });
  });
});

router.get('/authors/:id', (req, res) => {
  knex("authors")
    .where('id', req.params.id)
    .first()
    .then((data) => {
      console.log('author id works!');
      res.render('author_profile', {
        data
      });
    });
});

router.get('/add-author', (req, res) => {
  res.render('add-authors');
});


router.post('/addNewAuthor', (req, res) => {
  knex('authors').insert({
    author_name: req.body.name,
    author_biography: req.body.biography,
    author_url: req.body.url
    }, '*')
    .then((results) => {
      res.send(results[0]);
      console.log(req.body);
    })
  });

  // router.delete('/delete/:id', (req, res) => {
  //   knex('authors')
  //   .where(id,req.params.id)
  //   // .del()
  //   .then((results)=>{
  //     console.log(results);
  //     res.send(results[0]);
  //   })
  // })

module.exports = router;
