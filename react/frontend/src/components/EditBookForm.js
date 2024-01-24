// EditBookForm.js
import React, { useState } from 'react';

const EditBookForm = ({ book, onEdit }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [genre, setGenre] = useState(book.genre);

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/books/${book.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author, genre }),
    })
      .then(response => response.json())
      .then(data => {
        onEdit(data);
      })
      .catch(error => console.error('Error updating book:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      <label>Author:</label>
      <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
      <label>Genre:</label>
      <input type="text" value={genre} onChange={e => setGenre(e.target.value)} />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditBookForm;
