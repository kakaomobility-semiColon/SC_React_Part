import { useState, useEffect } from 'react';
import React from 'react';
import './Bookmark.css'; // 북마크 스타일시트

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

  const handleRemoveBookmark = (id) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark !== id);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  return (
    <div className={`bookmark-block ${active ? 'active' : ''}`}>
      <div className="bookmark-content">
        <button className="bookmark-close" onClick={onClose}>북마크 닫기</button>
        <ul>
          {bookmarks.map((bookmark, index) => (
            <li key={index}>
              {bookmark} <button onClick={() => handleRemoveBookmark(bookmark)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
