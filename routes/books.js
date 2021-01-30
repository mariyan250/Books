import express from 'express';

import books from '../database.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(books);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const book = books.find((book) => book.id === id);

  if (!book) {
    res.status(404).send('Book not found!');
    return;
  }

  res.json(book);
});

export default router;
