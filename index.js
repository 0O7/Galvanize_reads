'use strict'
// const methodOverride = require('method-override')
const express = require('express');
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const path = require('path');
const books = require('./routes/books_route');
const authors = require('./routes/authors_route');

// app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'html'));
app.set('view engine', 'ejs');

app.disable('x-powered-by');

app.use(morgan("short"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(books);
app.use(authors);

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, ()=> {
  console.log("Listening on port",port);
});

module.exports = app;
