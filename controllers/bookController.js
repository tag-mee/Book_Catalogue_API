// controllers/bookController.js
const Book = require('../models/Book');

// GET /api/books->get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/books/:id->get book by id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid book id' });
  }
};

// POST /api/books (protected)->create new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, price, inStock } = req.body;
    if (!title || !author || price === undefined) {
      return res.status(400).json({ message: 'title, author and price are required' });
    }
    const book = await Book.create({ title, author, genre, price, inStock });
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/books/:id (protected)->update book details
exports.updateBook = async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Book not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid data or id' });
  }
};

// DELETE /api/books/:id ->delete a book
exports.deleteBook = async (req, res) => {
  try {
    const removed = await Book.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book removed' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid id' });
  }
};
