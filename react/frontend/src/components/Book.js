// Book.js
import React from 'react';

const Book = ({ title, author, genre, onEdit, onDelete }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>Author: {author}</p>
      <p>Genre: {genre}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Book;
