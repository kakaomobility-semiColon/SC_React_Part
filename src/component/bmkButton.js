import React, { useState } from 'react';
import './Bookmark.css';

export function BookmarkButton({ id }) {
  const [isBookmarked, setIsBookmarked] = useState(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    return bookmarks.includes(id);
  });

  const handleBookmarkClick = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    let updatedBookmarks;

    if (isBookmarked) {
      updatedBookmarks = bookmarks.filter(bookmark => bookmark !== id);
    } else {
      updatedBookmarks = [...bookmarks, id];
    }

    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <button 
      className={`bookmark-button ${isBookmarked ? 'active' : ''}`} 
      onClick={handleBookmarkClick}
    >
      <div className="bookmark-icon">
        <img src={isBookmarked ? 'bookmark_clicked.svg' : 'bookmark.svg'} alt="bookmark" />
      </div>
    </button>
  );
}
