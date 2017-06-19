exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('books_authors').del()
    .then(() => {
      // Inserts seed entries
      return knex('books_authors').insert([{
          book_id: 1,
          author_id: 1
        },
        {
          book_id: 1,
          author_id: 2
        },
        {
          book_id: 1,
          author_id: 3
        },
        {
          book_id: 2,
          author_id: 4
        },
        {
          book_id: 3,
          author_id: 5
        },
        {
          book_id: 4,
          author_id: 6
        },
        {
          book_id: 5,
          author_id: 6
        },
        {
          book_id: 6,
          author_id: 6
        }
      ]);
    })
      .then(() => knex.raw("SELECT setval('books_id_seq', (SELECT MAX(id) FROM books))"));
};
