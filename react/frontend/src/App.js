// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from './components/BookList';
import EditBookForm from './components/EditBookForm';
import './App.css';
import './components/styles/BookList.css'; // Import the BookList component styles
import './components/styles/Book.css'; // Import the Book component styles
import './components/styles/AddBookForm.css';// Import the AddBookForm component styles
import './components/styles/EditBookForm.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []); // Fetch books on component mount

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://your-django-api-url/books/');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddBook = async newBook => {
    try {
      await axios.post('http://your-django-api-url/books/', newBook);
      fetchBooks(); // Refresh the book list after adding a new book
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleEditBook = async updatedBook => {
    try {
      await axios.put(`http://your-django-api-url/books/${updatedBook.id}/`, updatedBook);
      fetchBooks(); // Refresh the book list after editing a book
      setEditingBook(null);
    } catch (error) {
      console.error('Error editing book:', error);
    }
  };

  const handleEdit = bookId => {
    const bookToEdit = books.find(book => book.id === bookId);
    setEditingBook(bookToEdit);
  };

  const handleDelete = async bookId => {
    try {
      await axios.delete(`http://your-django-api-url/books/${bookId}/`);
      fetchBooks(); // Refresh the book list after deleting a book
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      <h1>Book Catalogue</h1>
      {editingBook ? (
        <EditBookForm book={editingBook} onEdit={handleEditBook} />
      ) : null}
      <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
