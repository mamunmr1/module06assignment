const express = require('express');
const app = express();

// Serve static files from the public directory
app.use(express.static('public'));

// Enable JSON body parsing for POST requests
app.use(express.json());

// Initialize an empty array for storing books
const books = [];

// Route for getting the list of books
app.get('/books', (req, res) => {
  res.json(books);
});

// Route for adding a new book to the collection
app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;

  // Generate a unique ID for the book
  const id = Math.floor(Math.random() * 1000000);

  // Create a new book object and add it to the array
  const book = { id, title, author, publishedDate };
  books.push(book);

  // Send a response with the new book object
  res.json(book);
});

// Route for deleting a book from the collection
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Book not found' });
  } else {
    books.splice(index, 1);
    res.json({ message: 'Book successfully deleted' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
