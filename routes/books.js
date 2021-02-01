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
    res.status(404).json({ error: 'Book not found!' });
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
    res
      .status(404)
      .json({ error: 'Please enter all required data to publish book!' });
    return;
  }

  if (exists) {
    res.status(405).json({ error: 'There is already book with that id!' });
    return;
  }

  books.push(book);
});

// Update a book
router.put('/:id', (req, res) => {
  const { name, price, author } = req.body;
  const book = books.find((book) => book.id === req.params.id);

  if (book) {
    book.name = name || book.name;
    book.price = price || book.price;
    book.author = author || book.author;

    res.json(book);
    return;
  }

  res.status(404).json({ error: 'There is not a book with that id!' });
});

// Delete a book
router.delete('/:id', (req, res) => {
  const book = books.find((book) => book.id === req.params.id);
  const index = books.findIndex((book) => book.id === req.params.id);

  if (book) {
    books.splice(index, 1);
    res.status(200).json({ success: 'Sucessfully deleted book!' });
    return;
  }

  res.status(404).json({ error: 'There is not a book with that id!' });
});

export default router;
