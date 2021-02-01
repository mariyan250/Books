import express from 'express';
import booksRouter from '../routes/books.js';

export default (app) => {
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  app.use('/books', booksRouter);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};
