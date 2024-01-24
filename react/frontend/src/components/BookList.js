// BookList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from './Book';
import AddBookForm from './AddBookForm';
import EditBookForm from './EditBookForm';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredGenre, setFilteredGenre] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    // Fetch books from the Django API when the component mounts
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/books/');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleFilterChange = genre => {
    setFilteredGenre(genre);
  };

  const handleSearchChange = term => {
    setSearchTerm(term);
  };

  const handleAddBook = async newBook => {
    try {
      await axios.post('http://localhost:8000/api/books/', newBook);
      // Update the book list after successfully adding a new book
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleEditBook = async updatedBook => {
    try {
      await axios.put(`http://localhost:8000/api/books/${updatedBook.id}/`, updatedBook);
      // Update the book list after successfully editing a book
      fetchBooks();
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
      await axios.delete(`http://localhost:8000/api/books/${bookId}/`);
      // Update the book list after successfully deleting a book
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

return (
    <div>
      <div>
        <label>Filter by Genre:</label>
        <select onChange={e => handleFilterChange(e.target.value)}>
          <option value="">All Genres</option>
          {[...new Set(books.map(book => book.genre))].map(genre => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Search:</label>
        <input type="text" value={searchTerm} onChange={e => handleSearchChange(e.target.value)} />
      </div>
      {editingBook !== null ? (
        <EditBookForm book={editingBook} onEdit={handleEditBook} />
      ) : (
        <AddBookForm onAdd={handleAddBook} />
      )}
      {books
        .filter(book => !filteredGenre || book.genre === filteredGenre)
        .filter(
          book =>
            !searchTerm ||
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(book => (
          <Book
            key={book.id}
            title={book.title}
            author={book.author}
            genre={book.genre}
            onEdit={() => handleEdit(book.id)}
            onDelete={() => handleDelete(book.id)}
          />
        ))}
    </div>
  );
};

export default BookList;
