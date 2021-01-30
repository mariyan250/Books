import express from 'express';
import books from '../database.js';

const router = express.Router();

// Get all books
router.get('/', (req, res) => {
  res.json(books);
});

// Get book by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find((book) => book.id === id);

  if (!book) {
    res.status(404).send('Book not found!');
    return;
  }

  res.json(book);
});

// Create a book
router.post('/', (req, res) => {
  const { id, name, author, price } = req.body;

  const book = { id, name, author, price };
  const exists = books.find((book) => book.id == id);

  if (!id && !name && !author && !price) {
    res.status(404).send('Please enter all required data to publish book!');
    return;
  } else if (exists) {
    res
      .status(405)
      .send(
        'There is already book with that id! Please enter other id for the new book!'
      );
    return;
  }

  books.push(book);
});

export default router;
