// AddBookForm.js
import React, { useState } from 'react';

const AddBookForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:8000/api/books/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author, genre }),
    })
      .then(response => response.json())
      .then(data => {
        onAdd(data);
        setTitle('');
        setAuthor('');
        setGenre('');
      })
      .catch(error => console.error('Error adding book:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      <label>Author:</label>
      <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
      <label>Genre:</label>
      <input type="text" value={genre} onChange={e => setGenre(e.target.value)} />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
