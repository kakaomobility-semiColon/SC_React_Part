import { useState, useEffect } from 'react';
import React from 'react';
import './Bookmark.css';

export function BookmarkButton({ onClick, active }) {
  return (
    <button className={`bookmark-button ${active ? 'active' : ''}`} onClick={onClick}>
      <div className="bookmark-icon">북마크</div>
    </button>
  );
}

export function BookmarkBlock({ active, onClose }) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(storedBookmarks);
  }, []);

  return (
    <div className={`bookmark-block ${active ? 'active' : ''}`}>
        <button className="bookmark-close" onClick={onClose}>북마크</button>
        <ul>
          {bookmarks.map((bookmark, index) => (
            <li key={index}>{bookmark}</li>
          ))}
        </ul>
      </div>
  );
}
